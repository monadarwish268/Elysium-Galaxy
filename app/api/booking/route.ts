import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// READ: GET /api/booking
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true, psychologist: true },
    });
    return NextResponse.json({ data: bookings, status: 200, message: 'Success' });
  } catch (error) {
    console.error('GET Booking error:', error); // Fixes unused variable
    return NextResponse.json({ error: 'Failed to fetch bookings', status: 500 }, { status: 500 });
  }
}

// CREATE: POST /api/booking
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId, psychologistId, scheduledAt, status } = body;

    let user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: { email: `demo_${Date.now()}@elysium.com`, name: 'Demo User' },
      });
    }

    let psychologist = psychologistId
      ? await prisma.psychologist.findUnique({ where: { id: psychologistId } })
      : await prisma.psychologist.findFirst();

    if (!psychologist) {
      psychologist = await prisma.psychologist.create({
        data: {
          name: 'Dr. Sarah Chen',
          title: 'Clinical Psychologist',
          specialties: ['Stress', 'Burnout'], 
          hourlyRate: 45,
          bio: 'Clinical specialist.',
        },
      });
    }

    const newBooking = await prisma.booking.create({
      data: {
        userId: user.id,
        psychologistId: psychologist.id,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : new Date(),
        status: status || 'PENDING',
      },
      include: { psychologist: true, user: true },
    });

    return NextResponse.json({ data: newBooking, status: 201, message: 'Booking created' }, { status: 201 });
  } catch (error: unknown) { // Replaced 'any' with 'unknown' for clean ESLint
    console.error('POST Booking error:', error); // Fixes unused variable
    const msg = error instanceof Error ? error.message : 'Failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// UPDATE: PUT /api/booking
export async function PUT(request: Request) {
  try {
    const { id, status, scheduledAt } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(scheduledAt && { scheduledAt: new Date(scheduledAt) }),
      },
    });
    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error('PUT Booking error:', error); // Fixes unused variable
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

// DELETE: DELETE /api/booking
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ status: 200, message: 'Booking deleted' });
  } catch (error) {
    console.error('DELETE Booking error:', error); // Fixes unused variable
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}