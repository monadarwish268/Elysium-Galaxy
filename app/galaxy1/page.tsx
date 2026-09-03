"use client";

import React, { useState, useMemo } from "react";
import { useGetPlanetsQuery } from "@/lib/usePlanet";
import { PlanetConfig, OrbitControlsConfig, CameraPreset } from "@/types";
import { PlanetOrbitCanvas } from "@/app/components/PlanetOrbitCanvas";
import { IPlanet } from "@/interfaces/PlanetInterface";

export default function GalaxyPage() {
  // 1. جلب البيانات من الداتابيز بواسطة الـ Hook
  const { data: response, isLoading, isError, error } = useGetPlanetsQuery();

  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetConfig | null>(null);
  const [cameraPreset] = useState<CameraPreset>("cinematic");

  const [controls] = useState<OrbitControlsConfig>({
    speed: 1.0,
    orbitRadiusX: 38,
    orbitRadiusZ: 28,
    lightIntensity: 2.5,
    isPaused: false,
  });

  // 2. تحويل البيانات القادمة من الـ API إلى PlanetConfig متكامل
  const planetsData = useMemo<PlanetConfig[]>(() => {
    const rawPlanets: IPlanet[] = response?.data || [];

    return rawPlanets.map((planet) => {
      const parsedStats = typeof planet.stats === "string"
        ? JSON.parse(planet.stats)
        : planet.stats;

      return {
        id: planet.id,
        name: planet.name,
        symbol: planet.symbol,
        type: planet.type,
        emotionType: planet.emotionType,
        color: planet.color,
        secondaryColor: planet.secondaryColor,
        atmosphereColor: planet.atmosphereColor,
        glowIntensity: planet.glowIntensity,
        radius: planet.radius,
        roughness: planet.roughness ?? 0.5,
        metalness: planet.metalness ?? 0.1,
        hasClouds: planet.hasClouds ?? false,
        // ⚠️ تحويل null أو "" إلى undefined باستخدام || 
        cloudColor: planet.cloudColor || undefined,
        hasRings: planet.hasRings ?? false,
        ringColor: planet.ringColor || undefined,
        ringInnerRadius: planet.ringInnerRadius || undefined,
        ringOuterRadius: planet.ringOuterRadius || undefined,
        axialTilt: planet.axialTilt,
        rotationSpeed: planet.rotationSpeed,
        orbitAngleOffset: planet.orbitAngleOffset,
        stats: parsedStats,
      };
    });
  }, [response]);

  // 3. حالة التحميل
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <p className="font-['Poppins'] text-xl animate-pulse text-cyan-400">
          Connecting to Elysium Galaxy...
        </p>
      </div>
    );
  }

  // 4. حالة الخطأ
  if (isError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-red-400">
        <p className="font-['Poppins'] text-lg">
          Error loading galaxy: {error?.message || "Failed to load planets"}
        </p>
      </div>
    );
  }

  return (
    <div
      id="main-planetary-app"
      className="relative w-screen h-screen overflow-hidden bg-transparent"
    >
      {/* 3D WebGL Canvas for 5 Synchronized Orbiting Emotion Spheres */}
      <PlanetOrbitCanvas
        planets={planetsData}
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