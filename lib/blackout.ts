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
