import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. READ (جلب البيانات)
export async function GET() {
  try {
    const checkIns = await prisma.checkIn.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(checkIns);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch check-ins" }, { status: 500 });
  }
}

// 2. CREATE (إضافة سجل جديد)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { energyLevel, mood, notes, userId } = body;

    const newCheckIn = await prisma.checkIn.create({
      data: {
        energyLevel: energyLevel ?? 50,
        mood: mood ?? "Calm",
        notes: notes ?? "",
        userId: userId ?? "user-demo-id",
      },
    });

    return NextResponse.json(newCheckIn, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create check-in" }, { status: 500 });
  }
}

// 3. UPDATE (تعديل السجل بالكامل باستخدام PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, energyLevel, mood, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
    }

    const updatedCheckIn = await prisma.checkIn.update({
      where: { id },
      data: {
        energyLevel: energyLevel ?? 50,
        mood: mood ?? "Calm",
        notes: notes ?? "",
      },
    });

    return NextResponse.json(updatedCheckIn);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update check-in" }, { status: 500 });
  }
}

// 4. DELETE (حذف سجل)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required for deletion" }, { status: 400 });
    }

    await prisma.checkIn.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Check-in deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete check-in" }, { status: 500 });
  }
}