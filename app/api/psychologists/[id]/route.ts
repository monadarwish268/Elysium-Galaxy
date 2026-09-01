import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// UPDATE
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await prisma.psychologist.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.psychologist.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Psychologist deleted successfully' });
  } catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
}