import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { LoginUserDTO } from '@/interfaces/UserInterface';
import bcrypt from 'bcryptjs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: LoginUserDTO = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !email.trim()) {
      return NextResponse.json(
        { status: 400, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!password || !password.trim()) {
      return NextResponse.json(
        { status: 400, message: 'Password is required' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { status: 400, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // البحث عن المستخدم
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { status: 401, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 🔒 مطابقة كلمة المرور مع المشفّرة
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 401, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // إرجاع البيانات بدون كلمة المرور
    return NextResponse.json(
      {
        status: 200,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json(
      { status: 400, message: errorMessage },
      { status: 400 }
    );
  }
}