import prisma from "./prisma";
import { Prisma } from "./generated/prisma/client";

export interface BlackoutDateFilters {
  dateFrom?: string;
  dateTo?: string;
  year?: number;
  month?: number;
}

export interface BlackoutDateSortOptions {
  field: "date" | "id";
  direction: "asc" | "desc";
}

export interface PaginatedBlackoutDates {
  blackoutDates: Array<{
    id: number;
    date: Date;
  }>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getBlackoutDates(): Promise<Date[]> {
  try {
    const blackoutDates = await prisma.blackoutdate.findMany({
      select: { date: true },
    });

    return blackoutDates.map((bd) => new Date(bd.date));
  } catch (error) {
    console.error("Error fetching blackout dates:", error);
    return [];
  }
}

export async function createBlackoutDate(date: string): Promise<boolean> {
  try {
    const existingBlackout = await prisma.blackoutdate.findFirst({
      where: {
        date: new Date(date),
      },
    });

    if (existingBlackout) {
      console.log(`Blackout date already exists for ${date}`);
      return true;
    }

    await prisma.blackoutdate.create({
      data: {
        date: new Date(date),
      },
    });

    console.log(`Created blackout date for ${date}`);
    return true;
  } catch (error) {
    console.error("Error creating blackout date:", error);
    throw error;
  }
}

export async function getBlackoutDatesPaginated(
  page: number = 1,
  pageSize: number = 25,
  filters?: BlackoutDateFilters,
  sort?: BlackoutDateSortOptions
): Promise<PaginatedBlackoutDates> {
  try {
    // Build the where clause based on filters
    const where: Prisma.BlackoutdateWhereInput = {};

    if (filters?.dateFrom || filters?.dateTo || filters?.year || filters?.month) {
      where.date = {};
      
      if (filters.dateFrom) {
        where.date.gte = new Date(filters.dateFrom);
      }
      
      if (filters.dateTo) {
        where.date.lte = new Date(filters.dateTo);
      }
      
      // If year and/or month filters are provided
      if (filters.year) {
        const startDate = new Date(filters.year, filters.month ? filters.month - 1 : 0, 1);
        const endDate = filters.month 
          ? new Date(filters.year, filters.month, 0) // Last day of the month
          : new Date(filters.year, 11, 31); // Last day of the year
        
        where.date.gte = startDate;
        where.date.lte = endDate;
      }
    }

    // Build the orderBy clause
    const orderBy: Prisma.BlackoutdateOrderByWithRelationInput = {};
    if (sort) {
      orderBy[sort.field] = sort.direction;
    } else {
      orderBy.date = "asc";
    }

    // Get total count for pagination
    const total = await prisma.blackoutdate.count({ where });

    // Calculate skip and take
    const skip = (page - 1) * pageSize;

    // Fetch paginated data
    const blackoutDates = await prisma.blackoutdate.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
    });

    return {
      blackoutDates,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated blackout dates:", error);
    return {
      blackoutDates: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    };
  }
}

export async function deleteBlackoutDate(id: number): Promise<boolean> {
  try {
    await prisma.blackoutdate.delete({
      where: { id },
    });
    console.log(`Deleted blackout date with id ${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting blackout date:", error);
    throw error;
  }
}
