import { getBlackoutDates } from "@/lib/blackout";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest): Promise<Response> {
  try {
    const blackoutDates = await getBlackoutDates();
    const dateStrings = blackoutDates.map((date) =>
      date.toISOString().split("T")[0]
    );

    return Response.json({ blackoutDates: dateStrings });
  } catch (error) {
    console.error("Error fetching blackout dates:", error);
    return Response.json(
      { error: "Failed to fetch blackout dates" },
      { status: 500 }
    );
  }
}
