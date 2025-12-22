import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth0 } from '@/lib/auth0';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth0.getSession(request);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    await prisma.waitingListEntry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting waiting list entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete waiting list entry' },
      { status: 500 }
    );
  }
}
