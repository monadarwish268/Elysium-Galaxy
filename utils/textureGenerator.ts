import * as THREE from 'three';
import { PlanetEmotionType } from '@/types';

// Helper function to create a 2D canvas texture
function createTextureCanvas(
  width = 1024,
  height = 512,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    draw(ctx, width, height);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 1. Terrestrial Texture
export function generateTerrestrialTexture(baseColor: string, secondaryColor: string): THREE.CanvasTexture {
  return createTextureCanvas(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = secondaryColor;
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 20 + Math.random() * 80;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

// 2. Volcanic Texture
export function generateVolcanicTexture(baseColor: string, secondaryColor: string): THREE.CanvasTexture {
  return createTextureCanvas(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = secondaryColor;
    for (let i = 0; i < 70; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 100, Math.random() * 8);
    }
  });
}

// 3. Gas Giant Texture
export function generateGasGiantTexture(baseColor: string, secondaryColor: string): THREE.CanvasTexture {
  return createTextureCanvas(1024, 512, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, baseColor);
    grad.addColorStop(0.3, secondaryColor);
    grad.addColorStop(0.5, baseColor);
    grad.addColorStop(0.8, secondaryColor);
    grad.addColorStop(1, baseColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}

// 4. Ringed Giant Texture
export function generateRingedGiantTexture(baseColor: string, secondaryColor: string): THREE.CanvasTexture {
  return generateGasGiantTexture(baseColor, secondaryColor);
}

// 5. Ice Giant Texture
export function generateIceGiantTexture(baseColor: string, secondaryColor: string): THREE.CanvasTexture {
  return createTextureCanvas(1024, 512, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, baseColor);
    grad.addColorStop(0.5, secondaryColor);
    grad.addColorStop(1, baseColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}

// 6. Emotion Texture
export function generateEmotionTexture(
  emotion: PlanetEmotionType,
  baseColor: string,
  secondaryColor: string
): THREE.CanvasTexture {
  switch (emotion) {
    case 'stress':
      return generateVolcanicTexture(baseColor, secondaryColor);
    case 'happiness':
      return generateGasGiantTexture(baseColor, secondaryColor);
    case 'sadness':
      return generateIceGiantTexture(baseColor, secondaryColor);
    case 'anxiety':
      return generateRingedGiantTexture(baseColor, secondaryColor);
    case 'calm':
    default:
      return generateTerrestrialTexture(baseColor, secondaryColor);
  }
}

// 7. Cloud Texture
export function generateCloudTexture(cloudColor = '#ffffff'): THREE.CanvasTexture {
  return createTextureCanvas(1024, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = cloudColor;
    for (let i = 0; i < 50; i++) {
      ctx.globalAlpha = Math.random() * 0.4 + 0.1;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 30 + Math.random() * 50, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

// 8. Ring Texture
export function generateRingTexture(ringColor = '#ecd5a5'): THREE.CanvasTexture {
  return createTextureCanvas(512, 64, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.3, ringColor);
    grad.addColorStop(0.7, ringColor);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}

// 9. Atmosphere Fresnel Shader Material
export function createAtmosphereMaterial(color: string, glowIntensity = 0.85) {
  return new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      uniform vec3 color;
      uniform float intensity;
      void main() {
        float fresnel = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
        gl_FragColor = vec4(color, fresnel * intensity);
      }
    `,
    uniforms: {
      color: { value: new THREE.Color(color) },
      intensity: { value: glowIntensity },
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  });
}