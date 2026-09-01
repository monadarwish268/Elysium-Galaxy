import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// READ: Get all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        psychologist: true,
        planet: true,
      },
    });
    return NextResponse.json(bookings);
  }catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}

// CREATE: New booking (Post setup inspired by standard Prisma insert pattern)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, psychologistId, planetId, scheduledAt, status } = body;

    const newBooking = await prisma.booking.create({
      data: {
        userId,
        psychologistId,
        planetId: planetId || null,
        scheduledAt: new Date(scheduledAt),
        status: status || 'PENDING',
      },
      include: {
        psychologist: true,
        user: true,
      },
    });
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}