import React from 'react';
import Link from 'next/link';
import { Flame, Sparkles } from 'lucide-react';

const PLANETS = [
  {
    id: 'stress',
    name: 'Stress Planet',
    tagline: 'Release the pressure',
    description: "Feeling overwhelmed? Let's take a small step toward feeling better.",
    color: '#ff7a3c',
    glow: 'rgba(255, 122, 60, 0.4)'
  },
  {
    id: 'anxiety',
    name: 'Anxiety Planet',
    tagline: 'Slow the spiral',
    description: "Your mind is racing ahead. Let's bring it gently back to this moment.",
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 'happiness',
    name: 'Happiness Planet',
    tagline: 'Amplify the light',
    description: "You're glowing today — let's make this feeling last longer.",
    color: '#eab308',
    glow: 'rgba(234, 179, 8, 0.4)'
  },
  {
    id: 'sadness',
    name: 'Sadness Planet',
    tagline: 'Rest and be held',
    description: "It's okay to feel heavy. You don't have to carry it alone.",
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.4)'
  },
  {
    id: 'calm',
    name: 'Calm Planet',
    tagline: 'Stay in the still',
    description: "You're centered. Let's protect this quiet space you've found.",
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)'
  }
];

export default function GalaxyMainPage() {
  return (
    <div className="min-h-screen bg-[#040817] text-white p-6 md:p-12 pt-20 font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Title Header */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            EMOTION GALAXY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight">
            Choose the planet that <span className="text-indigo-400">matches your mood</span>
          </h1>

          <div className="flex gap-3 pt-2">
            <div className="bg-[#0b132b]/80 border border-slate-800 px-4 py-2 rounded-full text-xs text-slate-300 flex items-center gap-2">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">0</span> day streak
            </div>
            <div className="bg-[#0b132b]/80 border border-slate-800 px-4 py-2 rounded-full text-xs text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI check-in
            </div>
          </div>
        </div>

        {/* Planet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLANETS.map((planet) => (
            <Link key={planet.id} href={`/galaxy/${planet.id}`}>
              <div className="bg-[#0b132b]/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md hover:border-slate-600 transition-all cursor-pointer flex flex-col justify-between h-48 space-y-4 group hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full shrink-0 group-hover:scale-110 transition-transform"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${planet.color} 60%, #000000 100%)`,
                      boxShadow: `0 0 20px ${planet.glow}`
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {planet.name}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      {planet.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {planet.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}