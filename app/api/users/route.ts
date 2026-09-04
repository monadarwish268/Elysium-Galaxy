// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';


// export async function GET() {
//     try {
//         const users = await prisma.user.findMany();
//         return NextResponse.json({
//             status: 200,
//             message: 'Users retrieved successfully',
//             data: users,
//         });
//     } catch (error: any) {
//         console.error('DATABASE ERROR DETAILS:', error);
//         return NextResponse.json(
//             { status: 500, message: error.message || 'Server Error' },
//             { status: 500 }
//         );
//     }
// }

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const newUser = await prisma.user.create({
//             data: body,
//         });

//         return NextResponse.json(
//             {
//                 status: 201,
//                 message: 'User created successfully',
//                 data: newUser,
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { status: 400, message: 'Failed to create user' },
//             { status: 400 }
//         );
//     }
// }


import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateUserDTO } from '@/interfaces/UserInterface';
import bcrypt from 'bcryptjs';

// REGEX la et2akkadd mn eenu l email mazbut
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 1. jib kl users mn l database
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { status: 200, message: 'Users retrieved successfully', data: users },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// 2. aemel user jdid maa validation
export async function POST(request: Request) {
  try {
    const body: CreateUserDTO = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { status: 400, message: 'Name is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { status: 400, message: 'Email is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (!password || !password.trim()) {
      return NextResponse.json(
        { status: 400, message: 'Password is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { status: 400, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // التحقق من تكرار اسم المستخدم
    const existingName = await prisma.user.findFirst({
      where: { name: name.trim() },
    });

    if (existingName) {
      return NextResponse.json(
        { status: 400, message: 'Username is already taken' },
        { status: 400 }
      );
    }

    // التحقق من تكرار الإيميل
    const existingEmail = await prisma.user.findUnique({
      where: { email: email.trim() },
    });

    if (existingEmail) {
      return NextResponse.json(
        { status: 400, message: 'Email is already registered' },
        { status: 400 }
      );
    }

    // 🔒 تشفير كلمة المرور قبل الحفظ
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { status: 201, message: 'User created successfully', data: newUser },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
    return NextResponse.json(
      { status: 400, message: errorMessage },
      { status: 400 }
    );
  }
}