import { NextResponse } from 'next/server';
// import { PrismaClient } from '@/app/generated/prisma/client';
import { prisma } from '@/lib/prisma';


export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({
            status: 200,
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error: any) {
        console.error('DATABASE ERROR DETAILS:', error);
        return NextResponse.json(
            { status: 500, message: error.message || 'Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newUser = await prisma.user.create({
            data: body,
        });

        return NextResponse.json(
            {
                status: 201,
                message: 'User created successfully',
                data: newUser,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { status: 400, message: 'Failed to create user' },
            { status: 400 }
        );
    }
}