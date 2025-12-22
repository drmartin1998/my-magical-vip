import { NextRequest, NextResponse } from 'next/server';
import {
  getAppointmentsPaginated,
  getUniqueParksList,
  getUniqueTypesList,
  type AppointmentFilters,
  type AppointmentSortOptions,
} from '@/lib/appointments';
import { auth0 } from '@/lib/auth0';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth0.getSession(request);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    
    // Get metadata if requested
    if (searchParams.get('metadata') === 'true') {
      const [parks, types] = await Promise.all([
        getUniqueParksList(),
        getUniqueTypesList(),
      ]);
      
      return NextResponse.json({
        parks,
        types,
      });
    }

    // Parse pagination params
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');

    // Parse filter params
    const filters: AppointmentFilters = {};
    
    const park = searchParams.get('park');
    if (park) filters.park = park;
    
    const type = searchParams.get('type');
    if (type) filters.type = type;
    
    const dateFrom = searchParams.get('dateFrom');
    if (dateFrom) filters.dateFrom = dateFrom;
    
    const dateTo = searchParams.get('dateTo');
    if (dateTo) filters.dateTo = dateTo;
    
    const search = searchParams.get('search');
    if (search) filters.search = search;

    // Parse sort params
    let sort: AppointmentSortOptions | undefined;
    const sortField = searchParams.get('sortField') as 'date' | 'park' | 'type' | 'id' | null;
    const sortDirection = searchParams.get('sortDirection') as 'asc' | 'desc' | null;
    
    if (sortField && sortDirection) {
      sort = { field: sortField, direction: sortDirection };
    }

    // Fetch paginated data
    const result = await getAppointmentsPaginated(page, pageSize, filters, sort);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in appointments API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}
