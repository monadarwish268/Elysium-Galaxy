import React from 'react';

interface PlanetHeroProps {
  name: string;
  tagline: string;
  description: string;
  color: string;
}

export default function PlanetHero({ name, tagline, description, color }: PlanetHeroProps) {
  return (
    <div className="bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md flex flex-col md:flex-row items-center gap-8">
      <div 
        className="w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0" 
        style={{ 
          background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${color} 60%, #000000 100%)`,
          boxShadow: `0 0 40px ${color}66`
        }} 
      />
      <div className="space-y-2 text-center md:text-left">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{tagline}</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{name}</h1>
        <p className="text-slate-300 max-w-xl text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}