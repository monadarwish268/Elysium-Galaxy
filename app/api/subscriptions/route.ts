import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const idSchema = z.string().trim().min(1, 'Subscription id is required');
const dateSchema = z.coerce.date({ error: 'End date must be a valid date' });

const createSubscriptionSchema = z.object({
  userId: z.string().trim().min(1, 'User id is required').optional(),
  planType: z.string().trim().min(1, 'Plan type is required').default('UPLIFT_BEAM'),
  message: z.string().trim().min(1, 'Message is required').max(250, 'Message cannot exceed 250 characters'),
  amount: z.literal(1).default(1),
  endDate: dateSchema.nullable().optional(),
});

const updateSubscriptionSchema = z.object({
  id: idSchema,
  planType: z.string().trim().min(1, 'Plan type is required').optional(),
  message: z.string().trim().min(1, 'Message is required').max(250, 'Message cannot exceed 250 characters').optional(),
  isActive: z.boolean().optional(),
  endDate: dateSchema.nullable().optional(),
}).refine(
  ({ planType, message, isActive, endDate }) =>
    planType !== undefined || message !== undefined || isActive !== undefined || endDate !== undefined,
  { message: 'Provide at least one field to update' },
);

function validationError(error: z.ZodError) {
  return NextResponse.json(
    { status: 400, message: 'Validation failed', errors: error.flatten().fieldErrors },
    { status: 400 },
  );
}

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({ orderBy: { startDate: 'desc' } });
    return NextResponse.json({ data: subscriptions, status: 200, message: 'Subscriptions retrieved' });
  } catch (error) {
    console.error('GET Subscriptions error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = createSubscriptionSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { userId, planType, message, endDate } = parsed.data;

    let user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: `sub_${Date.now()}@elysium.com`,
          name: 'Sub User',
          password: `sub_${Date.now()}`,
        },
      });
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        planType,
        message,
        amount: 1,
        paymentStatus: 'PAID',
        paidAt: new Date(),
        isActive: true,
        endDate: endDate ?? null,
      },
    });
    return NextResponse.json({ data: subscription, status: 201 });
  } catch (error) {
    console.error('POST Subscription error:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = updateSubscriptionSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { id, planType, message, isActive, endDate } = parsed.data;
    const existing = await prisma.subscription.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ status: 404, message: 'Subscription not found' }, { status: 404 });

    const updated = await prisma.subscription.update({
      where: { id },
      data: {
        ...(planType !== undefined && { planType }),
        ...(message !== undefined && { message }),
        ...(isActive !== undefined && { isActive }),
        ...(endDate !== undefined && { endDate }),
      },
    });
    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error('PUT Subscription error:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = idSchema.safeParse(searchParams.get('id'));
    if (!parsed.success) return validationError(parsed.error);

    const existing = await prisma.subscription.findUnique({ where: { id: parsed.data } });
    if (!existing) return NextResponse.json({ status: 404, message: 'Subscription not found' }, { status: 404 });

    await prisma.subscription.delete({ where: { id: parsed.data } });
    return NextResponse.json({ status: 200, message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('DELETE Subscription error:', error);
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 });
  }
}