import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
    IActivity,
    UpdateActivityDTO,
    ApiResponse,
} from '@/interfaces/ActivityInterface';

// GET BY ID: جلب نشاط محدد
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<IActivity | null>>> {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { status: 400, message: 'Activity ID is required' },
                { status: 400 }
            );
        }

        const activity = await prisma.activity.findUnique({
            where: { id },
        });

        if (!activity) {
            return NextResponse.json(
                { status: 404, message: 'Activity not found' },
                { status: 404 }
            );
        }

        const formattedResult: IActivity = {
            ...activity,
            createdAt: activity.createdAt ? activity.createdAt.toISOString() : undefined,
        };

        return NextResponse.json(
            { status: 200, message: 'Activity retrieved successfully', data: formattedResult },
            { status: 200 }
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Server Error';
        return NextResponse.json(
            { status: 500, message: errorMessage },
            { status: 500 }
        );
    }
}

// PUT: تعديل بيانات نشاط
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<IActivity | null>>> {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { status: 400, message: 'Activity ID is required' },
                { status: 400 }
            );
        }

        const body = (await request.json()) as UpdateActivityDTO;

        const updatedActivity = await prisma.activity.update({
            where: { id },
            data: {
                ...(body.title && { title: body.title }),
                ...(body.description && { description: body.description }),
                ...(body.type && { type: body.type }),
                ...(body.duration !== undefined && { durationMin: body.duration }),
            },
        });

        const formattedResult: IActivity = {
            ...updatedActivity,
            createdAt: updatedActivity.createdAt ? updatedActivity.createdAt.toISOString() : undefined,
        };

        return NextResponse.json(
            { status: 200, message: 'Activity updated successfully', data: formattedResult },
            { status: 200 }
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update activity';
        return NextResponse.json(
            { status: 400, message: errorMessage },
            { status: 400 }
        );
    }
}

// DELETE: حذف نشاط
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { status: 400, message: 'Activity ID is required' },
                { status: 400 }
            );
        }

        await prisma.activity.delete({
            where: { id },
        });

        return NextResponse.json(
            { status: 200, message: 'Activity deleted successfully', data: null },
            { status: 200 }
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete activity';
        return NextResponse.json(
            { status: 400, message: errorMessage },
            { status: 400 }
        );
    }
}