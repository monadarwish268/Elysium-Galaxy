export type PlanetEmotionType =
  | 'stress'
  | 'happiness'
  | 'sadness'
  | 'calm'
  | 'anxiety'
  | 'selfLove'
  | 'custom';

export interface EmotionStats {
  emotion: string;
  feelingState: string;
  affirmation: string;
}

export interface PlanetConfig {
  id: string;
  name: string;
  symbol: string;
  type: 'terrestrial' | 'volcanic' | 'gas_giant' | 'ringed_giant' | 'ice_giant' | 'custom';
  emotionType: PlanetEmotionType;
  color: string;
  secondaryColor: string;
  atmosphereColor: string;
  glowIntensity: number;
  radius: number;
  roughness?: number;
  metalness?: number;
  hasClouds?: boolean;
  cloudColor?: string;
  hasRings?: boolean;
  ringColor?: string;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  axialTilt: number;
  rotationSpeed: number;
  orbitAngleOffset: number;
  stats: EmotionStats;
}

export interface OrbitControlsConfig {
  speed: number;
  orbitRadiusX: number;
  orbitRadiusZ: number;
  lightIntensity: number;
  isPaused: boolean;
}

export type CameraPreset = 'cinematic' | 'top_down' | 'horizon' | 'side';

export type AuthMode = 'login' | 'signup' | 'forgot-password';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  emotionalPlanet?: string;
  createdAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  selectedPlanet: string;
  agreeToTerms: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  requirements: PasswordRequirement[];
}