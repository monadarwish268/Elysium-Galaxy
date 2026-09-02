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
    const { psychologistId, scheduledAt, status } = body;

    // Fallback/Ensure User exists
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: { email: `user_${Date.now()}@example.com`, name: 'Demo User' },
      });
    }

    // Fallback/Ensure Psychologist exists
    let psychologist = psychologistId
      ? await prisma.psychologist.findUnique({ where: { id: psychologistId } })
      : await prisma.psychologist.findFirst();

    if (!psychologist) {
      psychologist = await prisma.psychologist.create({
        data: {
          id: psychologistId || undefined,
          name: 'Dr. Sarah Chen',
          title: 'Clinical Psychologist',
          specialties: ['Anxiety'],
          hourlyRate: 45,
          bio: 'Specialist',
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
      include: {
        psychologist: true,
        user: true,
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}