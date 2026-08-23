'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Book, HeartHandshake, Trees } from 'lucide-react';

import { PLANETS_DATA, Planet, Activity, Video, Place } from '../data/planetsData';
import ActivityCard from '../components/ActivityCard';
import VideoCard from '../components/VideoCard';
import MoodReflection from '../components/MoodReflection';

export default function DynamicPlanetPage() {
  const { id } = useParams();
  const rawId = Array.isArray(id) ? id[0] : id;
  
  const planetKey = (rawId || 'anxiety').toLowerCase();
  const planet: Planet = PLANETS_DATA[planetKey] || PLANETS_DATA.anxiety;

  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const toggleActivity = (actId: string) => {
    setCompletedActivities(prev => 
      prev.includes(actId) ? prev.filter(a => a !== actId) : [...prev, actId]
    );
  };

  const getPlaceIcon = (type: string) => {
    if (type.includes('Library') || type.includes('Cafe') || type.includes('Book')) return <Book className="w-5 h-5 text-indigo-400" />;
    if (type.includes('Park') || type.includes('Nature') || type.includes('Walk')) return <Trees className="w-5 h-5 text-indigo-400" />;
    return <HeartHandshake className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className={`min-h-screen bg-linear-to-b ${planet.bgGradient || 'from-[#1e0a38] via-[#0d122b] to-[#040817]'} text-white p-6 md:p-12 font-sans relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        <Link href="/galaxy" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to galaxy
        </Link>

        {/* Planet Hero Banner */}
        <div className="bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div 
            className="w-36 h-36 md:w-44 md:h-44 rounded-full shrink-0" 
            style={{ 
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${planet.color} 60%, #000000 100%)`,
              boxShadow: `0 0 40px ${planet.color}66`
            }} 
          />
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{planet.tagline}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{planet.name}</h1>
            <p className="text-slate-300 max-w-xl text-lg">{planet.description}</p>
          </div>
        </div>

        {/* Personalized Activities */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Personalized wellness activities</h2>
            <span className="text-slate-400 text-sm">{completedActivities.length} of {planet.activities?.length || 0} complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {planet.activities?.map((act: Activity) => (
              <ActivityCard 
                key={act.id} 
                activity={act} 
                isCompleted={completedActivities.includes(act.id)} 
                onToggle={toggleActivity} 
              />
            ))}
          </div>
        </div>

        {/* Psychologist Video Recommendations */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Licensed psychologist recommendations</h2>
            <p className="text-slate-400 text-xs mt-1">Short, evidence-based sessions curated for this planet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planet.videos?.map((vid: Video) => (
              <VideoCard key={vid.id} video={vid} />
            ))}
          </div>
        </div>

        {/* Interactive Google Map & Nearby Places */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">AI mood-based places nearby</h2>
            <p className="text-slate-400 text-xs mt-1">Partnered spaces chosen to match how you feel right now in Lebanon.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a1122] border border-slate-800 rounded-2xl h-64 overflow-hidden relative shadow-lg">
              {planet.mapEmbedUrl ? (
                <iframe
                  src={planet.mapEmbedUrl}
                  className="w-full h-full border-0 grayscale opacity-80 contrast-125"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-xs">Map not available</div>
              )}
              <div className="absolute bottom-2 left-2 bg-slate-950/80 px-3 py-1 rounded-lg text-slate-300 text-xs flex items-center gap-1.5 backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-purple-400" /> Live Lebanon Mood Map
              </div>
            </div>

            <div className="space-y-3">
              {planet.places?.map((place: Place, idx: number) => (
                <div key={idx} className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-700 transition">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0">
                    {getPlaceIcon(place.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{place.name}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{place.type} · {place.distance} · {place.desc}</p>
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