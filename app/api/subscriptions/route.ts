import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({ include: { user: true } });
    return NextResponse.json({ data: subscriptions, status: 200 });
  } catch (error) {
    console.error('GET Subscriptions error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, planType, endDate } = body;

    let user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: { email: `sub_${Date.now()}@elysium.com`, name: 'Sub User' },
      });
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        planType: planType || 'PREMIUM_ORBIT',
        isActive: true,
        endDate: endDate ? new Date(endDate) : null,
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
    const { id, planType, isActive } = await request.json();
    const updated = await prisma.subscription.update({
      where: { id },
      data: { planType, isActive },
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
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.subscription.delete({ where: { id } });
    return NextResponse.json({ status: 200, message: 'Subscription deleted' });
  } catch (error) {
    console.error('DELETE Subscription error:', error);
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 });
  }
}