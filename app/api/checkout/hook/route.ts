import { NextRequest } from "next/server";
import { createAppointment } from "@/lib/appointments";
import { createBlackoutDate } from "@/lib/blackout";
import prisma from "@/lib/prisma";
import crypto from "crypto";

interface ShopifyLineItemProperty {
  name: string;
  value: string;
}

interface ShopifyLineItem {
  properties: ShopifyLineItemProperty[];
}

interface ShopifyWebhookPayload {
  id: number;
  line_items: ShopifyLineItem[];
}

function verifyShopifyWebhook(body: string, hmacHeader: string | null): boolean {
  const secret = process.env.SHOPIFY_HOOK_HMAC;
  
  if (!secret) {
    console.error("SHOPIFY_HOOK_HMAC environment variable not set");
    return false;
  }

  if (!hmacHeader) {
    console.error("No HMAC signature in request headers");
    return false;
  }

  const hash = crypto
    .createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("base64");

console.log("Computed hash:", hash);
console.log("Received HMAC header:", hmacHeader);


  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(hmacHeader)
  );
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Get the raw body for HMAC verification
    const body = await request.text();
    const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");

    //Verify webhook signature
    if (!verifyShopifyWebhook(body, hmacHeader)) {
      console.error("Invalid webhook signature");
      return Response.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload: ShopifyWebhookPayload = JSON.parse(body);
    
    console.log("Received Shopify webhook:", JSON.stringify(payload, null, 2));

    // Get the first line item's properties
    const properties = payload.line_items[0]?.properties;
    
    if (!properties) {
      console.error("No properties found in line items");
      return Response.json({ error: "No properties found" }, { status: 400 });
    }

    const shopifyOrderId = payload.id.toString();

    // Extract booking information from properties
    const bookingDatesProperty = properties.find((item) => item.name === "bookingDates");
    const lineItemProperty = properties.find((item) => item.name === "lineItemID");
    const productTypeProperty = properties.find((item) => item.name === "productType");

    if (!bookingDatesProperty || !lineItemProperty) {
      console.error("Missing required properties");
      return Response.json(
        { error: "Missing required booking properties" },
        { status: 400 }
      );
    }

    const lineItemId = lineItemProperty.value;
    const productType = productTypeProperty?.value || "";
    
    // Split bookings: format is "date,park1,park2|date,park1,park2"
    const bookings = bookingDatesProperty.value.split("|");

    console.log(`Processing ${bookings.length} bookings for order ${shopifyOrderId}`);

    for (const booking of bookings) {
      const parts = booking.split(",");
      const parkDate = parts[0];
      const parkNames = parts.slice(1).join(",");

      try {
        // Create appointment
        await createAppointment(
          shopifyOrderId,
          lineItemId,
          parkDate,
          parkNames,
          productType
        );

        console.log(`Created appointment for ${parkDate} at ${parkNames}`);

        // Check if we should create a blackout date (not for Multi-Pass products)
        if (productType !== "Multi-Pass") {
          const appointmentsByDay = await prisma.appointment.findMany({
            where: {
              date: {
                equals: new Date(parkDate),
              },
            },
          });

          // If there are 3 or more appointments for this day, create a blackout date
          if (appointmentsByDay.length >= 3) {
            try {
              console.log(`Creating blackout date for ${parkDate}`);
              await createBlackoutDate(parkDate);
            } catch (error) {
              console.error(`Error creating blackout date for ${parkDate}:`, error);
            }
          }
        }
      } catch (error) {
        console.error(`Error processing booking for ${parkDate}:`, error);
      }
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return Response.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
