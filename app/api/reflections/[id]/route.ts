import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE: حذف Reflection بواسطة الـ id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: 400, message: "Reflection ID is required" },
        { status: 400 }
      );
    }

    await prisma.reflection.delete({
      where: { id },
    });

    return NextResponse.json({
      status: 200,
      message: "Reflection deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete reflection:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to delete reflection" },
      { status: 500 }
    );
  }
}

// PUT: تعديل Reflection بواسطة الـ id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content, feelingNow, tags } = body;

    if (!id) {
      return NextResponse.json(
        { status: 400, message: "Reflection ID is required" },
        { status: 400 }
      );
    }

    const updatedReflection = await prisma.reflection.update({
      where: { id },
      data: {
        ...(content !== undefined && { content }),
        ...(feelingNow !== undefined && { feelingNow }),
        ...(tags !== undefined && { tags }),
      },
    });

    return NextResponse.json({
      status: 200,
      data: updatedReflection,
    });
  } catch (error) {
    console.error("Failed to update reflection:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to update reflection" },
      { status: 500 }
    );
  }
}