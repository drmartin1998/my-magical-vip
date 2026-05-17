import type { NextRequest } from "next/server";
import { getAppointmentCountsByDateRange } from "@/lib/appointments";
import {
  MAX_DAILY_BOOKINGS,
  NEAR_FULL_THRESHOLD,
  getBookingWindowEndDate,
} from "@/lib/dates";

export interface DateCapacityEntry {
  count: number;
  capacity: number;
  percentage: number;
  nearFull: boolean;
}

export interface DateCapacityResponse {
  /** Dates (YYYY-MM-DD) that have crossed the near-full threshold */
  nearFullDates: string[];
  /** Per-date capacity details for every date that has at least one booking */
  capacityData: Record<string, DateCapacityEntry>;
}

/**
 * Public GET /api/date-capacity
 *
 * Returns near-full dates within the booking window so the calendar can
 * display a FOMO indicator to users browsing available dates.
 *
 * Query params (both optional):
 *   from  – start of the range (YYYY-MM-DD, defaults to today)
 *   to    – end of the range (YYYY-MM-DD, defaults to booking-window end)
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = request.nextUrl.searchParams;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    const from = fromParam ? new Date(fromParam) : today;
    const to = toParam ? new Date(toParam) : getBookingWindowEndDate(today);

    // Validate parsed dates
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return Response.json(
        { error: "Invalid date format. Expected YYYY-MM-DD." },
        { status: 400 }
      );
    }

    const counts = await getAppointmentCountsByDateRange(from, to);

    const capacityData: Record<string, DateCapacityEntry> = {};
    const nearFullDates: string[] = [];

    for (const [dateKey, count] of Object.entries(counts)) {
      const percentage = count / MAX_DAILY_BOOKINGS;
      const nearFull = percentage >= NEAR_FULL_THRESHOLD;
      capacityData[dateKey] = {
        count,
        capacity: MAX_DAILY_BOOKINGS,
        percentage,
        nearFull,
      };
      if (nearFull) {
        nearFullDates.push(dateKey);
      }
    }

    const body: DateCapacityResponse = { nearFullDates, capacityData };
    return Response.json(body);
  } catch (error) {
    console.error("Error fetching date capacity:", error);
    return Response.json(
      { error: "Failed to fetch date capacity" },
      { status: 500 }
    );
  }
}
