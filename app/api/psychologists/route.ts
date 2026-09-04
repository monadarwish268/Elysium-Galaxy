import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const psychologists = await prisma.psychologist.findMany();
    return NextResponse.json({ data: psychologists, status: 200 });
  } catch (error) {
    console.error('GET Psychologists error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, hourlyRate, bio, specialties, avatarUrl } = body;

    const newPsychologist = await prisma.psychologist.create({
      data: {
        name: name || 'Dr. New Expert',
        title: title || 'Psychologist',
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : 50,
        bio: bio || 'Therapy specialist',
        specialties: Array.isArray(specialties) ? specialties.join(', ') : specialties || 'General',
        avatarUrl,
      },
    });
    return NextResponse.json({ data: newPsychologist, status: 201 });
  } catch (error) {
    console.error('POST Psychologist error:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, title, hourlyRate, bio } = await request.json();
    const updated = await prisma.psychologist.update({
      where: { id },
      data: { name, title, bio, ...(hourlyRate && { hourlyRate: parseFloat(hourlyRate) }) },
    });
    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error('PUT Psychologist error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.psychologist.delete({ where: { id } });
    return NextResponse.json({ status: 200, message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE Psychologist error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}