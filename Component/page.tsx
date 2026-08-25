'use client';

import React, { useState } from 'react';
import { INITIAL_PLANETS } from '@/data/PlanetData';
import { PlanetConfig, OrbitControlsConfig, CameraPreset } from '@/types';
import { PlanetOrbitCanvas } from '@/Component/PlanetOrbitCanvas';



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
     
      <PlanetOrbitCanvas
        planets={planets}
        controls={controls}
        cameraPreset={cameraPreset}
        onHoverPlanet={(p) => setHoveredPlanet(p)}
        hoveredPlanetId={hoveredPlanet ? hoveredPlanet.id : null}
      />
    </div>
  );
}

