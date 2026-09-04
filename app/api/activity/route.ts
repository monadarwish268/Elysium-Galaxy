import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const activities = await prisma.activity.findMany();
        return NextResponse.json({ status: 200, message: 'Activities retrieved', data: activities });
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newActivity = await prisma.activity.create({ data: body });
        return NextResponse.json({ status: 201, message: 'Activity created', data: newActivity }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: 400, message: 'Failed to create activity' }, { status: 400 });
    }
}