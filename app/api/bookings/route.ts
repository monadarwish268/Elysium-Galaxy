import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const bookingIdSchema = z.string().trim().min(1, 'Booking id is required');

const createBookingSchema = z.object({
  userId: z.string().trim().min(1, 'User id is required').optional(),
  psychologistId: z.string().trim().min(1, 'Psychologist id is required'),
  scheduledAt: z.coerce.date({ error: 'A valid booking date and time is required' }),
  sessionType: z.enum(['video', 'chat']).default('video'),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).default('PENDING'),
});

const updateBookingSchema = z.object({
  id: bookingIdSchema,
  scheduledAt: z.coerce.date({ error: 'A valid booking date and time is required' }).optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
}).refine(
  ({ scheduledAt, status }) => scheduledAt !== undefined || status !== undefined,
  { message: 'Provide a status or scheduledAt value to update' },
);

function validationError(error: z.ZodError) {
  return NextResponse.json(
    { error: 'Validation failed', details: error.flatten().fieldErrors },
    { status: 400 },
  );
}

// READ: GET /api/bookings
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const psychologistId = searchParams.get('psychologistId');
    const date = searchParams.get('date');

    if (psychologistId || date) {
      const parsed = z.object({
        psychologistId: z.string().trim().min(1, 'Psychologist id is required'),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must use YYYY-MM-DD'),
      }).safeParse({ psychologistId, date });
      if (!parsed.success) return validationError(parsed.error);

      const start = new Date(`${parsed.data.date}T00:00:00.000Z`);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);
      const bookings = await prisma.booking.findMany({
        where: {
          psychologistId: parsed.data.psychologistId,
          scheduledAt: { gte: start, lt: end },
          status: { not: 'CANCELLED' },
        },
        select: { scheduledAt: true },
        orderBy: { scheduledAt: 'asc' },
      });
      return NextResponse.json({ data: bookings, status: 200, message: 'Booked slots retrieved' });
    }

    const bookings = await prisma.booking.findMany({
      orderBy: { scheduledAt: 'asc' },
      include: { psychologist: true },
    });
    return NextResponse.json({ data: bookings, status: 200, message: 'Success' });
  } catch (error) {
    console.error('GET Booking error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings', status: 500 }, { status: 500 });
  }
}

// CREATE: POST /api/bookings
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = createBookingSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { userId, psychologistId, scheduledAt, status } = parsed.data;
    let user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: `demo_${Date.now()}@elysium.com`,
          name: 'Demo User',
          password: `demo_${Date.now()}`,
        },
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
          startTime: '09:00',
          endTime: '17:00',
          bio: 'Clinical specialist.',
        },
      });
    }

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        psychologistId: psychologist.id,
        scheduledAt,
        status: { not: 'CANCELLED' },
      },
    });
    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked', code: 'SLOT_BOOKED' },
        { status: 409 },
      );
    }

    const newBooking = await prisma.booking.create({
      data: {
        userId: user.id,
        psychologistId: psychologist.id,
        scheduledAt,
        status,
      },
      include: { psychologist: true },
    });

    return NextResponse.json({ data: newBooking, status: 201, message: 'Booking created' }, { status: 201 });
  } catch (error: unknown) {
    console.error('POST Booking error:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This time slot is already booked', code: 'SLOT_BOOKED' },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: 'Failed to create booking', details: error instanceof Error ? error.message : 'Unknown database error' },
      { status: 500 },
    );
  }
}

// UPDATE: PUT /api/bookings
export async function PUT(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = updateBookingSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { id, status, scheduledAt } = parsed.data;
    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

    if (scheduledAt) {
      const conflict = await prisma.booking.findFirst({
        where: {
          id: { not: id },
          psychologistId: existing.psychologistId,
          scheduledAt,
          status: { not: 'CANCELLED' },
        },
      });
      if (conflict) {
        return NextResponse.json(
          { error: 'This time slot is already booked', code: 'SLOT_BOOKED' },
          { status: 409 },
        );
      }
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(scheduledAt && { scheduledAt }),
      },
      include: { psychologist: true },
    });
    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error('PUT Booking error:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

// DELETE: DELETE /api/bookings?id=...
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = bookingIdSchema.safeParse(searchParams.get('id'));
    if (!parsed.success) return validationError(parsed.error);

    const existing = await prisma.booking.findUnique({ where: { id: parsed.data } });
    if (!existing) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

    await prisma.booking.delete({ where: { id: parsed.data } });
    return NextResponse.json({ status: 200, message: 'Booking deleted' });
  } catch (error) {
    console.error('DELETE Booking error:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}