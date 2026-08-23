import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PlanetConfig, OrbitControlsConfig, CameraPreset } from '../types';
import {
  generateTerrestrialTexture,
  generateVolcanicTexture,
  generateGasGiantTexture,
  generateRingedGiantTexture,
  generateIceGiantTexture,
  generateEmotionTexture,
  generateCloudTexture,
  generateRingTexture,
  createAtmosphereMaterial,
} from '../utils/textureGenerator';

interface PlanetOrbitCanvasProps {
  planets: PlanetConfig[];
  controls: OrbitControlsConfig;
  cameraPreset: CameraPreset;
  onHoverPlanet?: (planet: PlanetConfig | null) => void;
  hoveredPlanetId?: string | null;
  onPlanetClick?: (planet: PlanetConfig) => void;
}

export const PlanetOrbitCanvas: React.FC<PlanetOrbitCanvasProps> = ({
  planets,
  controls,
  cameraPreset,
  onHoverPlanet,
  hoveredPlanetId,
  onPlanetClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    planet: PlanetConfig | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    planet: null,
  });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const orbitAngleRef = useRef(0);
  const planetMeshesRef = useRef<Map<string, {
    group: THREE.Group;
    bodyMesh: THREE.Mesh;
    cloudMesh?: THREE.Mesh;
    ringMesh?: THREE.Mesh;
    atmosphereMesh?: THREE.Mesh;
    config: PlanetConfig;
  }>>(new Map());

  const controlsRef = useRef(controls);
  useEffect(() => {
    controlsRef.current = controls;
  }, [controls]);

  const targetCamPosRef = useRef(new THREE.Vector3(0, 8, 65));
  const targetCamLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentCamLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  const raycasterRef = useRef(new THREE.Raycaster());
  const mousePosRef = useRef(new THREE.Vector2(-9999, -9999));
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const orbitGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    targetCamLookAtRef.current.set(0, 0, 0);

    switch (cameraPreset) {
      case 'cinematic':
        targetCamPosRef.current.set(0, 8, 65);
        break;
      case 'top_down':
        targetCamPosRef.current.set(0, 85, 0.1);
        break;
      case 'horizon':
        targetCamPosRef.current.set(0, 2, 75);
        break;
      case 'side':
        targetCamPosRef.current.set(78, 12, 0);
        break;
      default:
        targetCamPosRef.current.set(0, 8, 65);
    }
  }, [cameraPreset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fully Transparent Canvas
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.5,
      1000
    );
    camera.position.copy(targetCamPosRef.current);
    cameraRef.current = camera;

    // Lighting Setup
    const keySunLight = new THREE.DirectionalLight(0xfffaed, controlsRef.current.lightIntensity);
    keySunLight.position.set(65, 45, 55);
    scene.add(keySunLight);

    const cosmicFillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
    cosmicFillLight.position.set(-60, -30, -50);
    scene.add(cosmicFillLight);

    const ambientDeepVoid = new THREE.AmbientLight(0x0a1128, 0.35);
    scene.add(ambientDeepVoid);

    // Orbit System Group (Invisible Orbit Line)
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    orbitGroupRef.current = orbitGroup;

    const meshesMap = new Map<string, {
      group: THREE.Group;
      bodyMesh: THREE.Mesh;
      cloudMesh?: THREE.Mesh;
      ringMesh?: THREE.Mesh;
      atmosphereMesh?: THREE.Mesh;
      config: PlanetConfig;
    }>();

    planets.forEach((planetConfig) => {
      const planetGroup = new THREE.Group();

      const planetTiltGroup = new THREE.Group();
      planetTiltGroup.rotation.z = (planetConfig.axialTilt * Math.PI) / 180;
      planetGroup.add(planetTiltGroup);

      let mainTexture: THREE.CanvasTexture;
      if (planetConfig.emotionType && planetConfig.emotionType !== 'custom') {
        mainTexture = generateEmotionTexture(planetConfig.emotionType, planetConfig.color, planetConfig.secondaryColor);
      } else if (planetConfig.type === 'volcanic') {
        mainTexture = generateVolcanicTexture(planetConfig.color, planetConfig.secondaryColor);
      } else if (planetConfig.type === 'gas_giant') {
        mainTexture = generateGasGiantTexture(planetConfig.color, planetConfig.secondaryColor);
      } else if (planetConfig.type === 'ringed_giant') {
        mainTexture = generateRingedGiantTexture(planetConfig.color, planetConfig.secondaryColor);
      } else if (planetConfig.type === 'ice_giant') {
        mainTexture = generateIceGiantTexture(planetConfig.color, planetConfig.secondaryColor);
      } else {
        mainTexture = generateTerrestrialTexture(planetConfig.color, planetConfig.secondaryColor);
      }

      const sphereGeometry = new THREE.SphereGeometry(planetConfig.radius, 64, 64);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        map: mainTexture,
        roughness: planetConfig.roughness ?? 0.5,
        metalness: planetConfig.metalness ?? 0.1,
      });
      const bodyMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      bodyMesh.userData = { planetId: planetConfig.id, isPlanetBody: true };
      planetTiltGroup.add(bodyMesh);

      let cloudMesh: THREE.Mesh | undefined;
      if (planetConfig.hasClouds) {
        const cloudTex = generateCloudTexture(planetConfig.cloudColor || '#ffffff');
        const cloudGeo = new THREE.SphereGeometry(planetConfig.radius * 1.02, 64, 64);
        const cloudMat = new THREE.MeshStandardMaterial({
          map: cloudTex,
          transparent: true,
          opacity: 0.88,
          blending: THREE.NormalBlending,
        });
        cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        planetTiltGroup.add(cloudMesh);
      }

      let ringMesh: THREE.Mesh | undefined;
      if (planetConfig.hasRings || planetConfig.type === 'ringed_giant') {
        const ringTex = generateRingTexture(planetConfig.ringColor || '#ecd5a5');
        const innerR = planetConfig.ringInnerRadius ?? planetConfig.radius * 1.35;
        const outerR = planetConfig.ringOuterRadius ?? planetConfig.radius * 2.35;
        const ringGeo = new THREE.RingGeometry(innerR, outerR, 80);

        const pos = ringGeo.attributes.position;
        const v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v3.fromBufferAttribute(pos, i);
          ringGeo.attributes.uv.setXY(i, (v3.length() - innerR) / (outerR - innerR), 0.5);
        }

        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        planetTiltGroup.add(ringMesh);
      }

      const atmoGeo = new THREE.SphereGeometry(planetConfig.radius * 1.12, 64, 64);
      const atmoMat = createAtmosphereMaterial(planetConfig.atmosphereColor, planetConfig.glowIntensity);
      const atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
      planetTiltGroup.add(atmosphereMesh);

      orbitGroup.add(planetGroup);

      meshesMap.set(planetConfig.id, {
        group: planetGroup,
        bodyMesh,
        cloudMesh,
        ringMesh,
        atmosphereMesh,
        config: planetConfig,
      });
    });

    planetMeshesRef.current = meshesMap;

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const currentControls = controlsRef.current;

      if (!currentControls.isPaused) {
        orbitAngleRef.current += 0.003 * currentControls.speed;
      }

      const currentOrbitAngle = orbitAngleRef.current;

      planetMeshesRef.current.forEach((item) => {
        const totalAngle = currentOrbitAngle + item.config.orbitAngleOffset;
        const x = Math.cos(totalAngle) * currentControls.orbitRadiusX;
        const z = Math.sin(totalAngle) * currentControls.orbitRadiusZ;

        item.group.position.set(x, 0, z);

        if (!currentControls.isPaused) {
          item.bodyMesh.rotation.y += item.config.rotationSpeed;
          if (item.cloudMesh) {
            item.cloudMesh.rotation.y += item.config.rotationSpeed * 1.35;
          }
        }

        const isHovered = (hoveredPlanetId === item.config.id) || (tooltip.visible && tooltip.planet?.id === item.config.id);
        const targetScale = isHovered ? 1.18 : 1.0;
        item.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      camera.position.lerp(targetCamPosRef.current, 0.045);
      currentCamLookAtRef.current.lerp(targetCamLookAtRef.current, 0.045);
      camera.lookAt(currentCamLookAtRef.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [planets]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const camera = cameraRef.current;
    if (!container || !camera) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    mousePosRef.current.set(x, y);

    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      const rotSpeed = 0.005;
      const camPos = targetCamPosRef.current;

      const radius = Math.sqrt(camPos.x * camPos.x + camPos.z * camPos.z);
      let angle = Math.atan2(camPos.z, camPos.x);
      angle -= deltaX * rotSpeed;

      camPos.x = radius * Math.cos(angle);
      camPos.z = radius * Math.sin(angle);
      camPos.y = Math.max(2, Math.min(120, camPos.y - deltaY * 0.2));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }

    raycasterRef.current.setFromCamera(mousePosRef.current, camera);
    const meshesToCheck: THREE.Mesh[] = [];
    planetMeshesRef.current.forEach((item) => {
      meshesToCheck.push(item.bodyMesh);
    });

    const intersects = raycasterRef.current.intersectObjects(meshesToCheck);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object as THREE.Mesh;
      const planetId = hitMesh.userData.planetId;
      const hovered = planets.find((p) => p.id === planetId) || null;

      if (hovered && hovered.id !== hoveredPlanetId) {
        onHoverPlanet?.(hovered);
      }

      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        planet: hovered,
      });
      container.style.cursor = 'pointer';
    } else {
      if (hoveredPlanetId) {
        onHoverPlanet?.(null);
      }
      setTooltip((prev) => ({ ...prev, visible: false }));
      container.style.cursor = isDraggingRef.current ? 'grabbing' : 'default';
    }
  };

  const handleClick = () => {
    if (tooltip.visible && tooltip.planet) {
      onPlanetClick?.(tooltip.planet);
    }
  };

  return (
    <div
      id="planet-orbit-canvas-container"
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseUp={() => { isDraggingRef.current = false; }}
      onClick={handleClick}
      onWheel={(e) => {
        const camPos = targetCamPosRef.current;
        const zoomFactor = e.deltaY * 0.05;
        const dist = camPos.length();
        const newDist = Math.max(15, Math.min(140, dist + zoomFactor));
        camPos.multiplyScalar(newDist / dist);
      }}
    >
      {/* Emotion Hover Card Only */}
      {tooltip.visible && tooltip.planet && (
        <div
          id="planet-hover-card"
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-4 w-72 max-w-[90vw] p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border shadow-2xl transition-all duration-150 ease-out"
          style={{
            left: Math.min(window.innerWidth - 160, Math.max(160, tooltip.x)),
            top: Math.max(120, tooltip.y),
            borderColor: `${tooltip.planet.atmosphereColor}70`,
            boxShadow: `0 20px 40px -15px ${tooltip.planet.color}40`,
          }}
        >
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl select-none">{tooltip.planet.symbol}</span>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide font-sans leading-tight">
                  {tooltip.planet.name}
                </h3>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: tooltip.planet.atmosphereColor }}
                >
                  {tooltip.planet.stats.emotion}
                </span>
              </div>
            </div>
            <div
              className="w-3 h-3 rounded-full mt-1 shrink-0 animate-pulse shadow-sm"
              style={{ backgroundColor: tooltip.planet.color }}
            />
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <p className="text-slate-300 leading-relaxed font-sans">
              {tooltip.planet.stats.feelingState}
            </p>

            <div className="pt-2 border-t border-slate-800/70">
              <p className="italic text-[11px] text-cyan-200/90 font-serif">
                {tooltip.planet.stats.affirmation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};