import prisma from "./prisma";
import { Prisma } from "./generated/prisma";

export interface AppointmentFilters {
  park?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface AppointmentSortOptions {
  field: "date" | "park" | "type" | "id";
  direction: "asc" | "desc";
}

export interface PaginatedAppointments {
  appointments: Array<{
    id: number;
    shopifyOrderId: string;
    lineItemId: string;
    date: Date;
    park: string;
    attraction: string | null;
    type: string | null;
  }>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function createAppointment(
  shopifyOrderId: string,
  lineItemId: string,
  date: string,
  park: string,
  productType: string
): Promise<boolean> {
  try {
    await prisma.appointment.create({
      data: {
        shopifyOrderId: shopifyOrderId.toString(),
        lineItemId: lineItemId,
        date: new Date(date),
        park: park,
        type: productType,
      },
    });

    console.log(`Created appointment for ${date} at ${park}`);
    return true;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
}

export async function getAllAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        date: "asc",
      },
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function getAppointmentsByDate(date: Date) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          equals: date,
        },
      },
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments by date:", error);
    return [];
  }
}

export async function getAppointmentsPaginated(
  page: number = 1,
  pageSize: number = 25,
  filters?: AppointmentFilters,
  sort?: AppointmentSortOptions
): Promise<PaginatedAppointments> {
  try {
    // Build the where clause based on filters
    const where: Prisma.AppointmentWhereInput = {};

    if (filters?.park) {
      where.park = { equals: filters.park, mode: "insensitive" };
    }

    if (filters?.type) {
      where.type = { equals: filters.type, mode: "insensitive" };
    }

    if (filters?.dateFrom || filters?.dateTo) {
      where.date = {};
      if (filters.dateFrom) {
        where.date.gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        where.date.lte = new Date(filters.dateTo);
      }
    }

    if (filters?.search) {
      where.OR = [
        { shopifyOrderId: { contains: filters.search, mode: "insensitive" } },
        { lineItemId: { contains: filters.search, mode: "insensitive" } },
        { park: { contains: filters.search, mode: "insensitive" } },
        { attraction: { contains: filters.search, mode: "insensitive" } },
        { type: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    // Build the orderBy clause
    const orderBy: Prisma.AppointmentOrderByWithRelationInput = {};
    if (sort) {
      orderBy[sort.field] = sort.direction;
    } else {
      orderBy.date = "desc";
    }

    // Get total count for pagination
    const total = await prisma.appointment.count({ where });

    // Calculate skip and take
    const skip = (page - 1) * pageSize;

    // Fetch paginated data
    const appointments = await prisma.appointment.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
    });

    return {
      appointments,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching paginated appointments:", error);
    return {
      appointments: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    };
  }
}

export async function getUniqueParksList(): Promise<string[]> {
  try {
    const parks = await prisma.appointment.findMany({
      select: { park: true },
      distinct: ["park"],
      orderBy: { park: "asc" },
    });
    return parks.map((p) => p.park).filter((p): p is string => !!p);
  } catch (error) {
    console.error("Error fetching unique parks:", error);
    return [];
  }
}

export async function getUniqueTypesList(): Promise<string[]> {
  try {
    const types = await prisma.appointment.findMany({
      where: { type: { not: null } },
      select: { type: true },
      distinct: ["type"],
      orderBy: { type: "asc" },
    });
    return types.map((t) => t.type).filter((t): t is string => !!t);
  } catch (error) {
    console.error("Error fetching unique types:", error);
    return [];
  }
}
