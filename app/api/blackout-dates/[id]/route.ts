import { deleteBlackoutDate } from "@/lib/blackout";
import type { NextRequest } from "next/server";
import { auth0 } from '@/lib/auth0';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    // Check authentication
    const session = await auth0.getSession(request);
    
    if (!session) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const blackoutDateId = parseInt(id);

    if (isNaN(blackoutDateId)) {
      return Response.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    await deleteBlackoutDate(blackoutDateId);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting blackout date:", error);
    
    if (error instanceof Error && error.message.includes('not found')) {
      return Response.json(
        { error: 'Blackout date not found' },
        { status: 404 }
      );
    }
    
    return Response.json(
      { error: "Failed to delete blackout date" },
      { status: 500 }
    );
  }
}
