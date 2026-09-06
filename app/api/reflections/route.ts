import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const planetId = searchParams.get("planetId");

    const reflections = await prisma.reflection.findMany({
      where: planetId ? { planetId } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ status: 200, data: reflections });
  } catch (error) {
    console.error("Failed to fetch reflections:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to fetch reflections" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, planetId, content, feelingNow, tags, activityId } = body;

    if (!userId || !feelingNow) {
      return NextResponse.json(
        { status: 400, message: "userId and feelingNow are required" },
        { status: 400 }
      );
    }

    const newReflection = await prisma.reflection.create({
      data: {
        userId,
        planetId: planetId || null,
        content: content || null,
        feelingNow,
        tags: tags || null,
        activityId: activityId || null,
      },
    });

    return NextResponse.json(
      { status: 201, data: newReflection },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create reflection:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to create reflection" },
      { status: 500 }
    );
  }
}