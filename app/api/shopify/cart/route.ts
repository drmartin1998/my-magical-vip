import { createCart } from "@/lib/shopify";
import type { NextRequest, NextResponse } from "next";

interface CartRequestBody {
  lineItems: Array<{
    merchandiseId: string;
    quantity: number;
  }>;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CartRequestBody = await request.json();

    if (!body.lineItems || !Array.isArray(body.lineItems)) {
      return Response.json(
        { error: "Invalid lineItems provided" },
        { status: 400 }
      );
    }

    const cart = await createCart(body.lineItems);
    return Response.json(cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    return Response.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}
