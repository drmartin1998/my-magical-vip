import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface DayPark {
  date: string;
  park: string;
}

interface WaitingListRequest {
  name: string;
  email: string;
  days: DayPark[];
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as WaitingListRequest;
    const { name, email, days } = body;

    // Validation
    if (!name || !email || !days || days.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

export async function GET(): Promise<NextResponse> {
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
