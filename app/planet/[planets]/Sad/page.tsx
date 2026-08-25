'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Book, HeartHandshake, Trees, ArrowLeft } from 'lucide-react';
import { PLANETS_DATA } from '@/data/planetsData';
import ActivityCard from '@/components/ActivityCard';
import VideoCard from '@/components/VideoCard';
import MoodReflection from '@/components/MoodReflection';

export default function SadPlanetPage() {
  const planet = PLANETS_DATA.sad;
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const toggleActivity = (id: string) => {
    setCompletedActivities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getPlaceIcon = (type: string) => {
    if (type.includes('Bookstore') || type.includes('Café')) return <Book className="w-4 h-4 text-blue-400" />;
    if (type.includes('Meditation')) return <HeartHandshake className="w-4 h-4 text-blue-400" />;
    return <Trees className="w-4 h-4 text-blue-400" />;
  };

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
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${planet.color} 60%, #000000 100%)`,
              boxShadow: `0 0 60px ${planet.color}aa`
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

        {/* 3 Personalized Wellness Activities */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Personalized wellness activities</h2>
            <span className="text-slate-400 text-xs font-medium">
              {completedActivities.length} of {planet.activities.length} complete
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {planet.activities.slice(0, 3).map((act) => (
              <ActivityCard
                key={act.id}
                activity={act}
                isCompleted={completedActivities.includes(act.id)}
                onToggle={toggleActivity}
              />
            ))}
          </div>
        </div>

        {/* 2 Psychologist Recommendations */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white">Licensed psychologist recommendations</h2>
            <p className="text-slate-400 text-xs mt-0.5">Short, evidence-based sessions curated for this planet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planet.videos.slice(0, 2).map((vid) => (
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
                title="Batroun Map"
                src="https://maps.google.com/maps?q=Batroun%20Lebanon&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[220px] border-0 opacity-70 hover:opacity-100 transition"
                loading="lazy"
              />
              <div className="p-3 bg-slate-950/90 text-slate-400 text-[11px] flex justify-between items-center border-t border-slate-800">
                <span className="flex items-center gap-1 text-blue-400"><MapPin className="w-3.5 h-3.5" /> Live mood map</span>
                <span>{planet.places.length} matches near Batroun</span>
              </div>
            </div>

            <div className="space-y-3">
              {planet.places.map((place, idx) => (
                <div key={idx} className="bg-[#0b132b]/50 border border-slate-800/80 p-4 rounded-xl flex items-center gap-4 backdrop-blur-md hover:border-blue-500/40 transition">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0">
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