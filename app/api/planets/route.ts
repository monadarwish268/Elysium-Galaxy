import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

import { PlanetEmotionType, PlanetType } from '@/app/generated/prisma/browser';
import { IPlanet } from '@/interfaces/PlanetInterface';
// 1. Ta3rif l-Schema kirmal l-validation
const createPlanetSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  symbol: z.string().min(1, 'Symbol is required'),
  type: z.nativeEnum(PlanetType), // Ba3ad ma tkoun m'importel PlanetType Enum
  emotionType: z.nativeEnum(PlanetEmotionType),

  // Visuals & Colors
  themeColor: z.string().optional().nullable(),
  color: z.string().min(1, 'Color is required'),
  secondaryColor: z.string().min(1, 'Secondary color is required'),
  atmosphereColor: z.string().min(1, 'Atmosphere color is required'),
  glowIntensity: z.number({ error: 'Glow intensity is required' }),
  radius: z.number({ error: 'Radius is required' }),

  // Material Properties
  roughness: z.number().optional().nullable(),
  metalness: z.number().optional().nullable(),

  // Clouds & Rings
  hasClouds: z.boolean().optional().nullable(),
  cloudColor: z.string().optional().nullable(),
  hasRings: z.boolean().optional().nullable(),
  ringColor: z.string().optional().nullable(),
  ringInnerRadius: z.number().optional().nullable(),
  ringOuterRadius: z.number().optional().nullable(),

  // Physics & Orbit
  axialTilt: z.number({ error: 'Axial tilt is required' }),
  rotationSpeed: z.number({ error: 'Rotation speed is required' }),
  orbitAngleOffset: z.number({ error: 'Orbit angle offset is required' }),

  // Stats JSON (Bi2bal Object aw String)
  stats: z.union([z.record(z.string(), z.any()), z.string()]),
});

// 2. L-API Route Handler
export async function POST(request: Request) {
  try {
    const body : IPlanet = await request.json() ; // 3tit type lal body huwe IPlanet 
    // Verification & Validation
    const validationResult = createPlanetSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Direct Safe Data Insertion
    const validatedData = validationResult.data;
    const newPlanet = await prisma.planet.create({
      data: validatedData,
    });

    return NextResponse.json(
      { status: 201, message: 'Planet created successfully', data: newPlanet },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: 'Failed to create planet', error: (error as Error).message },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const planets = await prisma.planet.findMany();
    return NextResponse.json({ status: 200, message: 'Planets retrieved', data: planets });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Server Error' }, { status: 500 });
  }
}


