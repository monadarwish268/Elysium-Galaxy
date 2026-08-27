'use client'
import React, { useEffect, useRef } from 'react';

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      depth: number;
    }> = [];

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const initStars = () => {
      width = canvas.width = Math.max(window.innerWidth, document.documentElement.clientWidth);
      height = canvas.height = Math.max(window.innerHeight, document.documentElement.clientHeight);

      mouse.x = width / 2;
      mouse.y = height / 2;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;

      const starsCount = 300;
      stars = Array.from({ length: starsCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.4,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.003,
        depth: Math.random() * 2 + 0.5,
      }));
    };

    const handleResize = () => {
      initStars();
    };

    initStars();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const shootingStar = {
      x: Math.random() * width,
      y: Math.random() * (height / 2),
      length: Math.random() * 90 + 40,
      speed: Math.random() * 11 + 6,
      alpha: 0,
      active: false,
    };

    const resetShootingStar = () => {
      shootingStar.x = Math.random() * width * 1.2;
      shootingStar.y = Math.random() * (height / 3);
      shootingStar.length = Math.random() * 100 + 50;
      shootingStar.speed = Math.random() * 10 + 6;
      shootingStar.alpha = 1;
      shootingStar.active = true;
    };

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) star.speed = -star.speed;

        const offsetX = (mouse.x - width / 2) * 0.008 * star.depth;
        const offsetY = (mouse.y - height / 2) * 0.008 * star.depth;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!shootingStar.active && Math.random() < 0.008) {
        resetShootingStar();
      }

      if (shootingStar.active) {
        ctx.strokeStyle = `rgba(224, 170, 255, ${shootingStar.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.length,
          shootingStar.y + shootingStar.length * 0.55
        );
        ctx.stroke();

        shootingStar.x -= shootingStar.speed;
        shootingStar.y += shootingStar.speed * 0.55;
        shootingStar.alpha -= 0.015;

        if (shootingStar.alpha <= 0) shootingStar.active = false;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 min-w-full min-h-full pointer-events-none overflow-hidden -z-10"
      style={{
        background: 'linear-gradient(180deg, #020205 0%, #13204d 30%, #371a4e 65%, #030207 100%)',
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}