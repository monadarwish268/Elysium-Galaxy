import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assumes prisma instance is created

// READ: Get all psychologists
export async function GET() {
  try {
    const psychologists = await prisma.psychologist.findMany({
      include: { bookings: true },
    });
    return NextResponse.json(psychologists);
  } catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}

// CREATE: Post new psychologist
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, hourlyRate, bio, specialties, avatarUrl } = body;

    const newPsychologist = await prisma.psychologist.create({
      data: {
        name,
        title,
        hourlyRate: parseFloat(hourlyRate),
        bio,
        specialties,
        avatarUrl,
      },
    });
    return NextResponse.json(newPsychologist, { status: 201 });
  }catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}