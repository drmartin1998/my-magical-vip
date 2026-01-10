import { getBlackoutDates, getBlackoutDatesPaginated, createBlackoutDate, type BlackoutDateFilters, type BlackoutDateSortOptions } from "@/lib/blackout";
import type { NextRequest } from "next/server";
import { auth0 } from '@/lib/auth0';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Support legacy format (public) if no pagination params
    if (!searchParams.has('page') && !searchParams.has('pageSize')) {
      const blackoutDates = await getBlackoutDates();
      const dateStrings = blackoutDates.map((date) =>
        date.toISOString().split("T")[0]
      );
      return Response.json({ blackoutDates: dateStrings });
    }

    // For paginated requests (admin), check authentication
    const session = await auth0.getSession(request);
    
    if (!session) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse pagination params
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');

    // Parse filter params
    const filters: BlackoutDateFilters = {};
    
    const dateFrom = searchParams.get('dateFrom');
    if (dateFrom) filters.dateFrom = dateFrom;
    
    const dateTo = searchParams.get('dateTo');
    if (dateTo) filters.dateTo = dateTo;
    
    const year = searchParams.get('year');
    if (year) filters.year = parseInt(year);
    
    const month = searchParams.get('month');
    if (month) filters.month = parseInt(month);

    // Parse sort params
    let sort: BlackoutDateSortOptions | undefined;
    const sortField = searchParams.get('sortField') as 'date' | 'id' | null;
    const sortDirection = searchParams.get('sortDirection') as 'asc' | 'desc' | null;
    
    if (sortField && sortDirection) {
      sort = { field: sortField, direction: sortDirection };
    }

    // Fetch paginated data
    const result = await getBlackoutDatesPaginated(page, pageSize, filters, sort);

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching blackout dates:", error);
    return Response.json(
      { error: "Failed to fetch blackout dates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Check authentication
    const session = await auth0.getSession(request);
    
    if (!session) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { date } = body;

    if (!date) {
      return Response.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return Response.json(
        { error: 'Invalid date format. Expected YYYY-MM-DD' },
        { status: 400 }
      );
    }

    const blackoutDate = await createBlackoutDate(date);

    return Response.json({ blackoutDate }, { status: 201 });
  } catch (error) {
    console.error("Error creating blackout date:", error);
    
    // Check for duplicate date error
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return Response.json(
        { error: 'This date is already a blackout date' },
        { status: 409 }
      );
    }
    
    return Response.json(
      { error: "Failed to create blackout date" },
      { status: 500 }
    );
  }
}
