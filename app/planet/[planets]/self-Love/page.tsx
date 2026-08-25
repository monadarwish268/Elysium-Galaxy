'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Book, HeartHandshake, Trees, ArrowLeft } from 'lucide-react';
import { PLANETS_DATA } from '@/data/planetsData';
import VideoCard from '@/components/VideoCard';
import MoodReflection from '@/components/MoodReflection';

const selfLoveData = [
  {
    affirmation: "I choose to see the good in myself and others.",
    challenge: "Make eye contact and smile at someone today.",
  },
  {
    affirmation: "My worth is not defined by my productivity.",
    challenge: "Take 5 deep breaths and forgive yourself for a past mistake.",
  },
  {
    affirmation: "I am deserving of love, respect, and kindness.",
    challenge: "Write down 3 things you genuinely appreciate about yourself.",
  },
];

export default function SelfLovePlanetPage() {
  // Safe lookup checking both hyphenated and camelCase data keys
  const planet = PLANETS_DATA['self-love'] || PLANETS_DATA['selfLove'];
  
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % selfLoveData.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = () => {
    setProgress((prev) => Math.min(prev + 3, 100));
  };

  const current = selfLoveData[index];

  const getPlaceIcon = (type: string) => {
    if (type.includes('Bookstore') || type.includes('Café')) return <Book className="w-4 h-4 text-pink-400" />;
    if (type.includes('Meditation')) return <HeartHandshake className="w-4 h-4 text-pink-400" />;
    return <Trees className="w-4 h-4 text-pink-400" />;
  };

  if (!planet) return null;

  return (
    <div className="min-h-screen bg-transparent text-slate-100 p-6 md:p-12 font-sans relative z-10">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <Link 
          href="/galaxy" 
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back to galaxy
        </Link>

        {/* Dynamic Hero Header */}
        <div className="bg-[#0b132b]/60 border border-slate-800/80 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div 
            className="w-28 h-28 md:w-36 md:h-36 rounded-full shrink-0 relative z-10"
            style={{ 
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${planet.color || '#ec4899'} 60%, #000000 100%)`,
              boxShadow: `0 0 60px ${planet.color || '#ec4899'}aa`
            }} 
          />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-[10px] tracking-widest font-bold uppercase text-slate-300 bg-slate-900/80 border border-slate-700/50 px-3 py-1 rounded-full">
              {planet.tagline}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{planet.name}</h1>
            <p className="text-slate-300 text-sm max-w-lg font-light">{planet.description}</p>
          </div>
        </div>

        {/* Wellness Activities Section with Custom Self-Love Component */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Personalized wellness activities</h2>
          </div>

          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Today's Affirmation Box */}
              <div className="bg-[#0b132b]/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between">
                <h3 className="text-pink-400 text-xs font-semibold tracking-wide uppercase mb-4">
                  &ldquo; Today&apos;s Affirmation
                </h3>
                <div className="bg-[#1c223d]/80 border-l-4 border-pink-500 p-6 rounded-xl min-h-[140px] flex items-center">
                  <p className="text-xl font-medium text-slate-100 italic transition-opacity duration-500">
                    &ldquo;{current.affirmation}&rdquo;
                  </p>
                </div>
              </div>

              {/* Confidence Challenge Box */}
              <div className="bg-[#0b132b]/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between">
                <h3 className="text-pink-400 text-xs font-semibold tracking-wide uppercase mb-4">
                  Confidence Challenge
                </h3>
                <div className="bg-[#1c223d]/80 border-l-4 border-pink-500 p-6 rounded-xl min-h-[100px] flex items-center mb-4">
                  <p className="text-lg text-slate-200">{current.challenge}</p>
                </div>
                <div className="text-center">
                  <button 
                    onClick={handleAction} 
                    className="w-full max-w-xs py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition shadow-lg shadow-pink-500/20 text-sm"
                  >
                    I did it
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Your Progress: <strong className="text-pink-400">{progress}%</strong></span>
                <span>100%</span>
              </div>
              <div className="w-full bg-[#181d36] h-2.5 rounded-full overflow-hidden border border-slate-700/50">
                <div
                  className="bg-pink-400 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Licensed Psychologist Recommendations */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white">Licensed psychologist recommendations</h2>
            <p className="text-slate-400 text-xs mt-0.5">Short, evidence-based sessions curated for this planet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planet.videos?.slice(0, 2).map((vid) => (
              <VideoCard key={vid.id} video={vid} />
            ))}
          </div>
        </div>

        {/* Nearby Places */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white">AI mood-based places nearby</h2>
            <p className="text-slate-400 text-xs mt-0.5">Partnered spaces chosen to match how you feel right now.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0b132b]/50 border border-slate-800/80 rounded-2xl min-h-[220px] relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
              <iframe
                title="Beirut Map"
                src="https://maps.google.com/maps?q=Beirut%20Lebanon&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[220px] border-0 opacity-70 hover:opacity-100 transition"
                loading="lazy"
              />
              <div className="p-3 bg-slate-950/90 text-slate-400 text-[11px] flex justify-between items-center border-t border-slate-800">
                <span className="flex items-center gap-1 text-pink-400"><MapPin className="w-3.5 h-3.5" /> Live mood map</span>
                <span>{planet.places?.length || 0} matches near Beirut</span>
              </div>
            </div>

            <div className="space-y-3">
              {planet.places?.map((place, idx) => (
                <div key={idx} className="bg-[#0b132b]/50 border border-slate-800/80 p-4 rounded-xl flex items-center gap-4 backdrop-blur-md hover:border-pink-500/40 transition">
                  <div className="w-9 h-9 rounded-lg bg-pink-950/60 border border-pink-800/40 flex items-center justify-center shrink-0">
                    {getPlaceIcon(place.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{place.name}</h3>
                    <p className="text-slate-400 text-xs">{place.type} · {place.distance} · {place.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <MoodReflection />

      </div>
    </div>
  );
}