import prisma from "./prisma";

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
