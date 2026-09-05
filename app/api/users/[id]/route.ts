import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateUserDTO, ApiResponse, IUser } from '@/interfaces/UserInterface';
import bcrypt from 'bcryptjs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 1. تعديل بيانات المستخدم (PUT)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<IUser | null>>> {
  try {
    // 👈 قراءة الـ params بـ await لضمان وصول الـ id
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: 400, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const body = (await request.json()) as UpdateUserDTO;
    const updateData: Partial<UpdateUserDTO> = {};

    if (body.name && body.name.trim()) {
      const existingName = await prisma.user.findFirst({
        where: { name: body.name.trim(), NOT: { id } },
      });

      if (existingName) {
        return NextResponse.json(
          { status: 400, message: 'Username is already taken' },
          { status: 400 }
        );
      }
      updateData.name = body.name.trim();
    }

    if (body.email && body.email.trim()) {
      if (!EMAIL_REGEX.test(body.email.trim())) {
        return NextResponse.json(
          { status: 400, message: 'Invalid email format' },
          { status: 400 }
        );
      }

      const existingEmail = await prisma.user.findFirst({
        where: { email: body.email.trim().toLowerCase(), NOT: { id } },
      });

      if (existingEmail) {
        return NextResponse.json(
          { status: 400, message: 'Email is already registered' },
          { status: 400 }
        );
      }
      updateData.email = body.email.trim().toLowerCase();
    }

    if (body.password && body.password.trim()) {
      if (body.password.trim().length < 6) {
        return NextResponse.json(
          { status: 400, message: 'Password must be at least 6 characters' },
          { status: 400 }
        );
      }
      updateData.password = await bcrypt.hash(body.password.trim(), 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: 'Profile updated successfully',
        data: { ...updatedUser, name: updatedUser.name ?? '' },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
    return NextResponse.json(
      { status: 400, message: errorMessage },
      { status: 400 }
    );
  }
}

// 2. حذف حساب المستخدم (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    // 👈 قراءة الـ params بـ await هنا لضمان الحصول على الـ id وعدم إرسال undefined
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: 400, message: 'User ID is required' },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { status: 200, message: 'User account deleted successfully', data: null },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
    return NextResponse.json(
      { status: 400, message: errorMessage },
      { status: 400 }
    );
  }
}