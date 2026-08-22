'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Book, HeartHandshake, Trees } from 'lucide-react';
import { PLANETS_DATA } from '../data/planetsData';
import ActivityCard from '../components/ActivityCard';
import VideoCard from '../components/VideoCard';
import MoodReflection from '../components/MoodReflection';

export default function DynamicPlanetPage() {
  const { id } = useParams();
  const rawId = Array.isArray(id) ? id[0] : id;
  const planetKey = (rawId || 'anxiety').toLowerCase();
  const planet = PLANETS_DATA[planetKey] || PLANETS_DATA.anxiety;

  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const toggleActivity = (actId: string) => {
    setCompletedActivities(prev => 
      prev.includes(actId) ? prev.filter(a => a !== actId) : [...prev, actId]
    );
  };

  const getPlaceIcon = (type: string) => {
    if (type.includes('Bookstore')) return <Book className="w-5 h-5 text-indigo-400" />;
    if (type.includes('Meditation')) return <HeartHandshake className="w-5 h-5 text-indigo-400" />;
    return <Trees className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 p-6 md:p-12 text-white">
      
      

      {/* Planet Hero Banner */}
      <div className="bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md flex flex-col md:flex-row items-center gap-8">
        <div 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0" 
          style={{ 
            background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${planet.color} 60%, #000000 100%)`,
            boxShadow: `0 0 40px ${planet.color}66`
          }} 
        />
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{planet.tagline}</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{planet.name}</h1>
          <p className="text-slate-300 max-w-xl text-sm leading-relaxed">{planet.description}</p>
        </div>
      </div>

      {/* Personalized Wellness Activities */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Personalized wellness activities</h2>
          <span className="text-slate-400 text-xs">{completedActivities.length} of {planet.activities.length} complete</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planet.activities.map((act) => (
            <ActivityCard 
              key={act.id} 
              activity={act} 
              isCompleted={completedActivities.includes(act.id)} 
              onToggle={toggleActivity} 
            />
          ))}
        </div>
      </div>

      {/* Licensed Psychologist Recommendations */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Licensed psychologist recommendations</h2>
          <p className="text-slate-400 text-xs mt-1">Short, evidence-based sessions curated for this planet.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planet.videos.map((vid) => (
            <VideoCard key={vid.id} video={vid} />
          ))}
        </div>
      </div>

      {/* Places Nearby */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">AI mood-based places nearby</h2>
          <p className="text-slate-400 text-xs mt-1">Partnered spaces chosen to match how you feel right now.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0a1122] border border-slate-800 rounded-2xl p-4 h-64 relative overflow-hidden flex flex-col justify-end">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
            <div className="relative z-10 text-slate-400 text-xs flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" /> Live mood map · {planet.places.length} matches near you
            </div>
          </div>

          <div className="space-y-3">
            {planet.places.map((place, idx) => (
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

      {/* Reflection Component */}
      <MoodReflection />

    </div>
  );
}