import { getBlackoutDates, getBlackoutDatesPaginated, type BlackoutDateFilters, type BlackoutDateSortOptions } from "@/lib/blackout";
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
