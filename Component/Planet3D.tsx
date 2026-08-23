import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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
import { PlanetEmotionType } from '../types';

export interface Planet3DProps {
  id?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  secondaryColor?: string;
  atmosphereColor?: string;
  glowIntensity?: number;
  type?: 'terrestrial' | 'volcanic' | 'gas_giant' | 'ringed_giant' | 'ice_giant' | 'custom';
  emotionType?: PlanetEmotionType;
  hasRings?: boolean;
  ringColor?: string;
  hasClouds?: boolean;
  cloudColor?: string;
  axialTilt?: number;
  rotationSpeed?: number;
  hoverEffect?: boolean;
  hoverScale?: number;
  interactive?: boolean;
  autoRotate?: boolean;
  className?: string;
  onClick?: (planetId?: string) => void;
  onHover?: (isHovered: boolean) => void;
  planetName?: string;
  feelingState?: string;
  affirmation?: string;
}

export const Planet3D: React.FC<Planet3DProps> = ({
  id,
  size = 220,
  width,
  height,
  color = '#1b6ca8',
  secondaryColor = '#2ea44f',
  atmosphereColor = '#4fc3f7',
  glowIntensity = 0.85,
  type = 'terrestrial',
  emotionType,
  hasRings = false,
  ringColor = '#ecd5a5',
  hasClouds = true,
  cloudColor = '#ffffff',
  axialTilt = 23.4,
  rotationSpeed = 0.008,
  hoverEffect = true,
  hoverScale = 1.12,
  interactive = true,
  autoRotate = true,
  className = '',
  onClick,
  onHover,
  planetName,
  feelingState,
  affirmation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const planetMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudMeshRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const targetScaleRef = useRef(1);

  const resolvedWidth = width ?? (typeof size === 'number' ? `${size}px` : size);
  const resolvedHeight = height ?? (typeof size === 'number' ? `${size}px` : size);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || 220, container.clientHeight || 220);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || 1) / (container.clientHeight || 1),
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.4);
    scene.add(ambientLight);

    const group = new THREE.Group();
    group.rotation.z = (axialTilt * Math.PI) / 180;
    scene.add(group);
    groupRef.current = group;

    let mainTexture: THREE.CanvasTexture;
    if (emotionType && emotionType !== 'custom') {
      mainTexture = generateEmotionTexture(emotionType, color, secondaryColor);
    } else if (type === 'volcanic') {
      mainTexture = generateVolcanicTexture(color, secondaryColor);
    } else if (type === 'gas_giant') {
      mainTexture = generateGasGiantTexture(color, secondaryColor);
    } else if (type === 'ringed_giant') {
      mainTexture = generateRingedGiantTexture(color, secondaryColor);
    } else if (type === 'ice_giant') {
      mainTexture = generateIceGiantTexture(color, secondaryColor);
    } else {
      mainTexture = generateTerrestrialTexture(color, secondaryColor);
    }

    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      map: mainTexture,
      roughness: type === 'terrestrial' ? 0.45 : 0.6,
      metalness: 0.1,
    });
    const planetMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(planetMesh);
    planetMeshRef.current = planetMesh;

    if (hasClouds && (type === 'terrestrial' || type === 'custom')) {
      const cloudsTexture = generateCloudTexture(cloudColor);
      const cloudsGeometry = new THREE.SphereGeometry(2.025, 64, 64);
      const cloudsMaterial = new THREE.MeshStandardMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.88,
        blending: THREE.NormalBlending,
      });
      const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
      group.add(cloudsMesh);
      cloudMeshRef.current = cloudsMesh;
    }

    if (hasRings || type === 'ringed_giant') {
      const ringTexture = generateRingTexture(ringColor || '#ecd5a5');
      const innerR = 2.4;
      const outerR = 4.2;
      const ringGeometry = new THREE.RingGeometry(innerR, outerR, 64);

      const pos = ringGeometry.attributes.position;
      const v3 = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        ringGeometry.attributes.uv.setXY(i, (v3.length() - innerR) / (outerR - innerR), 0.5);
      }

      const ringMaterial = new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
      });

      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      group.add(ringMesh);
    }

    const atmosphereGeometry = new THREE.SphereGeometry(2.18, 64, 64);
    const atmosphereMaterial = createAtmosphereMaterial(atmosphereColor, glowIntensity);
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    group.add(atmosphereMesh);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    let animationFrameId: number;
    let currentScale = 1;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && planetMeshRef.current) {
        planetMeshRef.current.rotation.y += rotationSpeed;
      }
      if (cloudMeshRef.current) {
        cloudMeshRef.current.rotation.y += rotationSpeed * 1.35;
      }

      if (groupRef.current) {
        currentScale += (targetScaleRef.current - currentScale) * 0.12;
        groupRef.current.scale.set(currentScale, currentScale, currentScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      mainTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
    };
  }, [
    color,
    secondaryColor,
    atmosphereColor,
    glowIntensity,
    type,
    emotionType,
    hasRings,
    ringColor,
    hasClouds,
    cloudColor,
    axialTilt,
    rotationSpeed,
    autoRotate,
  ]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
    if (hoverEffect) {
      targetScaleRef.current = hoverScale;
    }
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    targetScaleRef.current = 1.0;
    onHover?.(false);
  };

  return (
    <div
      id={id || `planet-3d-${type}`}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ width: resolvedWidth, height: resolvedHeight }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => interactive && onClick?.(id)}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-visible"
      />

      {isHovered && (planetName || feelingState) && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 w-64 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border shadow-2xl transition-all duration-150 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            borderColor: `${atmosphereColor}70`,
            boxShadow: `0 15px 35px -10px ${color}50`,
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white tracking-wide">{planetName}</h3>
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: color }}
            />
          </div>

          <div className="mt-2 space-y-1.5 text-xs">
            {feelingState && (
              <p className="text-slate-300 leading-relaxed font-sans">{feelingState}</p>
            )}
            {affirmation && (
              <div className="pt-1.5 border-t border-slate-800/70">
                <p className="italic text-[11px] text-cyan-200/90 font-serif">{affirmation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};