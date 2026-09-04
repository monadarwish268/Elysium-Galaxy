import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.planet.delete({
      where: { id },
    });

    return NextResponse.json(
      { status: 200, message: 'Planet deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 400, message: error.message || 'Failed to delete planet' },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json(); // l new data li badde zida

    const updatedPlanet = await prisma.planet.update({
      where: { id },
      data: body, // baemel update lal shi li ana badde yehh
    });

    return NextResponse.json(
      { status: 200, data: updatedPlanet, message: 'Planet updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 400, message: error.message || 'Failed to update planet' },
      { status: 400 }
    );
  }
}