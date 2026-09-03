import { IActivity } from './ActivityInterface';

export type PlanetEmotionType =
  | 'stress'
  | 'happiness'
  | 'sadness'
  | 'calm'
  | 'selfLove'
  | 'custom';

export type PlanetType =
  | 'terrestrial'
  | 'volcanic'
  | 'gas_giant'
  | 'ringed_giant'
  | 'ice_giant'
  | 'custom';

export interface EmotionStats {
  emotion: string;
  feelingState: string;
  affirmation: string;
}

// الـ Interface المحدث بالكامل ليشمل كل الخصائص الـ 3D والعلاقات السابقة
export interface IPlanet {
  id: string;
  slug: string;
  name: string;
  description: string;
  symbol: string;
  type: PlanetType;
  emotionType: PlanetEmotionType;
  
  // Visuals & Colors
  themeColor?: string | null;
  color: string;
  secondaryColor: string;
  atmosphereColor: string;
  glowIntensity: number;
  radius: number;
  
  // Material Properties
  roughness?: number | null;
  metalness?: number | null;
  
  // Clouds & Rings
  hasClouds?: boolean | null;
  cloudColor?: string | null;
  hasRings?: boolean | null;
  ringColor?: string | null;
  ringInnerRadius?: number | null;
  ringOuterRadius?: number | null;
  
  // Physics & Orbit
  axialTilt: number;
  rotationSpeed: number;
  orbitAngleOffset: number;
  
  // Stats JSON
  stats: EmotionStats | string;
  
  // Relations
  activities?: IActivity[];
  reflections?: any[];
  bookings?: any[];
}
export type CreatePlanetDTO = Omit<IPlanet, 'id' | 'activities'>;