import prisma from "./prisma";

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
