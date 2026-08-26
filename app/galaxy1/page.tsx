"use client";

import React, { useState } from "react";
import { INITIAL_PLANETS } from "@/data/PlanetData";
import { PlanetConfig, OrbitControlsConfig, CameraPreset } from "@/types";
import { PlanetOrbitCanvas } from "@/components/PlanetOrbitCanvas";

export default function GalaxyPage() {
  const [planets] = useState<PlanetConfig[]>(INITIAL_PLANETS);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetConfig | null>(null);
  const [cameraPreset] = useState<CameraPreset>("cinematic");

  const [controls] = useState<OrbitControlsConfig>({
    speed: 1.0,
    orbitRadiusX: 38,
    orbitRadiusZ: 28,
    lightIntensity: 2.5,
    isPaused: false,
  });

  return (
    <div
      id="main-planetary-app"
      className="relative w-screen h-screen overflow-hidden bg-transparent"
    >
      {/* 3D WebGL Canvas for 5 Synchronized Orbiting Emotion Spheres */}
      <PlanetOrbitCanvas
        planets={planets}
        controls={controls}
        cameraPreset={cameraPreset}
        onHoverPlanet={(p) => setHoveredPlanet(p)}
        hoveredPlanetId={hoveredPlanet ? hoveredPlanet.id : null}
      />

      <div className="pointer-events-none absolute inset-x-0 top-8 z-10 flex justify-center px-6 text-center">
        <p className="max-w-3xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-['Poppins'] text-2xl font-medium italic leading-relaxed tracking-wide text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-3xl">
          A universe created by your presence, step out of the world&apos;s
          noise and step into your personal space in the stars...
        </p>
      </div>
    </div>
  );
}
