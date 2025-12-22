import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { auth0 } from '@/lib/auth0';

interface DayPark {
  date: string;
  park: string;
}

interface WaitingListRequest {
  name: string;
  email: string;
  days: DayPark[];
  recaptchaToken: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET;
  
  if (!secretKey) {
    console.error("GOOGLE_RECAPTCHA_SECRET not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json() as { success: boolean; score?: number };
    return data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
async function sendWaitingListEmail(
  name: string,
  email: string,
  days: DayPark[]
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return;
  }

  const resend = new Resend(apiKey);

  // Format the days/parks for the email
  const daysFormatted = days
    .map((dayPark) => {
      const date = new Date(dayPark.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `${formattedDate} - ${dayPark.park
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}`;
    })
    .join("\n");

  try {
    await resend.emails.send({
      from: "david@mymagicalvip.com",
      to: "drmartin1998@gmail.com",
      subject: "My Magical VIP Waiting List Request",
      text: `New Waiting List Entry

Name: ${name}
Email: ${email}

Requested Days & Parks:
${daysFormatted}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">New Waiting List Entry</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
        </div>
        
        <h3 style="color: #1e40af;">Requested Days & Parks:</h3>
        <ul style="list-style: none; padding: 0;">
          ${days
            .map((dayPark) => {
              const date = new Date(dayPark.date);
              const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const parkName = dayPark.park
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return `<li style="background-color: #dbeafe; padding: 10px; margin: 5px 0; border-radius: 4px;">
                <strong>${formattedDate}</strong> - ${parkName}
              </li>`;
            })
            .join("")}
        </ul>
      </div>
    `,
    });
    console.log("Waiting list email sent successfully");
  } catch (error) {
    console.error("Error sending waiting list email:", error);
    // Don't throw error - we don't want email failure to prevent entry creation
  }
}


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as WaitingListRequest;
    const { name, email, days, recaptchaToken } = body;

    // Validation
    if (!name || !email || !days || days.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Create waiting list entries for each day/park combination
    const entries = days.map((dayPark) => ({
      name,
      email,
      date: new Date(dayPark.date),
      park: dayPark.park,
    }));

    await prisma.waitingListEntry.createMany({
      data: entries,
    });

    // Send email notification
    await sendWaitingListEmail(name, email, days);

    return NextResponse.json(
      { success: true, message: "Added to waiting list successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding to waiting list:", error);
    return NextResponse.json(
      { error: "Failed to add to waiting list" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Check authentication
  const session = await auth0.getSession(request);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const entries = await prisma.waitingListEntry.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({ entries }, { status: 200 });
  } catch (error) {
    console.error("Error fetching waiting list:", error);
    return NextResponse.json(
      { error: "Failed to fetch waiting list" },
      { status: 500 }
    );
  }
}
