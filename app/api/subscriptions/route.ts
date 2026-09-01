import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// READ: Fetch subscriptions
export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: { user: true },
    });
    return NextResponse.json(subscriptions);
  } catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}

// CREATE: Push new subscription directly to Supabase via Prisma
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, planType, endDate } = body;

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planType,
        endDate: endDate ? new Date(endDate) : null,
      },
    });
    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}