import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  IActivity,
  CreateActivityDTO,
  ApiResponse,
} from '@/interfaces/ActivityInterface';

// GET: جلب الأنشطة
export async function GET(): Promise<NextResponse<ApiResponse<IActivity[]>>> {   //hon bass aataha type kermel ma tkun any
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const formattedActivities: IActivity[] = activities.map((act) => ({
      ...act,
      createdAt: act.createdAt ? act.createdAt.toISOString() : undefined,
    }));

    return NextResponse.json(
      { status: 200, message: 'Activities retrieved', data: formattedActivities },
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

// POST: إنشاء نشاط جديد
export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse<IActivity | null>>> {
  try {
    const body = (await request.json()) as CreateActivityDTO;

    // Validation بسيطة لتأكيد البيانات الأساسية
    if (!body.planetId || !body.title || !body.description) {
      return NextResponse.json(
        { status: 400, message: 'Missing required fields: planetId, title, or description' },
        { status: 400 }
      );
    }

    const newActivity = await prisma.activity.create({
      data: {
        planetId: body.planetId,
        title: body.title,
        description: body.description,
        type: body.type || 'GENERAL',
        duration: body.duration ?? '',
      },
    });

    const formattedResult: IActivity = {
      ...newActivity,
      createdAt: newActivity.createdAt ? newActivity.createdAt.toISOString() : undefined,
    };

    return NextResponse.json(
      { status: 201, message: 'Activity created', data: formattedResult },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create activity';
    return NextResponse.json(
      { status: 400, message: errorMessage },
      { status: 400 }
    );
  }
}