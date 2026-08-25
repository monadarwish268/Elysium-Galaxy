'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { INITIAL_PLANETS } from '@/data/PlanetData';
import { PlanetConfig, OrbitControlsConfig, CameraPreset } from '@/types';
import { PlanetOrbitCanvas } from '@/app/components/PlanetOrbitCanvas';

export default function GalaxyPage() {
  const [planets] = useState<PlanetConfig[]>(INITIAL_PLANETS);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetConfig | null>(null);
  const [cameraPreset] = useState<CameraPreset>('cinematic');

  const [controls] = useState<OrbitControlsConfig>({
    speed: 1.0,
    orbitRadiusX: 38,
    orbitRadiusZ: 28,
    lightIntensity: 2.5,
    isPaused: false,
  });

  return (
    <div id="main-planetary-app" className="relative w-screen h-screen overflow-hidden bg-transparent">
      {/* 3D WebGL Canvas for 5 Synchronized Orbiting Emotion Spheres */}
      <PlanetOrbitCanvas
        planets={planets}
        controls={controls}
        cameraPreset={cameraPreset}
        onHoverPlanet={(p: PlanetConfig | null) => setHoveredPlanet(p)}
        hoveredPlanetId={hoveredPlanet ? hoveredPlanet.id : null}
      />

      <div className="pointer-events-none absolute inset-x-0 top-8 z-10 flex justify-center px-6 text-center">
        <p className="max-w-3xl bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-['Poppins'] text-2xl font-medium italic leading-relaxed tracking-wide text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-3xl">
          A universe created by your presence, step out of the world&apos;s noise and step into your personal space in the stars...
        </p>
      </div>
    </div>
  );
}

export function PlanetNavigation() {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* 1. Stress Planet */}
      <Link href="/planet/stress" className="hover:scale-105 transition-transform">
        <div className="p-4 bg-orange-500/20 border border-orange-500 rounded-xl text-white font-bold">
          Stress Planet
        </div>
      </Link>

      {/* 2. Happy Planet */}
      <Link href="/planet/happiness" className="hover:scale-105 transition-transform">
        <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-xl text-white font-bold">
          Happy Planet
        </div>
      </Link>

      {/* 3. Calm Planet */}
      <Link href="/planet/calm" className="hover:scale-105 transition-transform">
        <div className="p-4 bg-cyan-500/20 border border-cyan-500 rounded-xl text-white font-bold">
          Calm Planet
        </div>
      </Link>

      {/* 4. Self-Love Planet */}
      <Link href="/planet/self-love" className="hover:scale-105 transition-transform">
        <div className="p-4 bg-pink-500/20 border border-pink-500 rounded-xl text-white font-bold">
          Self-Love Planet
        </div>
      </Link>

      {/* 5. Sadness Planet */}
      <Link href="/planet/sadness" className="hover:scale-105 transition-transform">
        <div className="p-4 bg-blue-500/20 border border-blue-500 rounded-xl text-white font-bold">
          Sadness Planet
        </div>
      </Link>
    </div>
  );
}