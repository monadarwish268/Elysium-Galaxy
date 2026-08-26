'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Book, Trees, Coffee, Flower2 } from 'lucide-react';
import { PLANETS_DATA } from '../../../data/planetsData';
import VideoCard from '../../components/VideoCard';
import ReflectionCard from '../../components/ReflectionCard';
import ActivityCard from '@/components/ActivityCard';


// أماكن مخصصة لطرابلس، لبنان بحسب المود
const TRIPOLI_PLACES: Record<string, Array<{ name: string; type: string; distance: string; desc: string; coords: string }>> = {
  calm: [
    { name: 'Ahwek Café - Mina', type: 'Quiet Café', distance: '1.2 km', desc: 'Cozy seaside spot in Al-Mina for relaxation', coords: 'Al-Mina Corniche' },
    { name: 'Mina Seaside Corniche', type: 'Nature & Walk', distance: '2.0 km', desc: 'Calm waves and refreshing sea breeze', coords: 'Al-Mina' },
    { name: 'Culturama Bookstore', type: 'Bookstore', distance: '3.1 km', desc: 'Peaceful space for reading and quiet reflection', coords: 'Dam & Farz' }
  ],
  focus: [
    { name: 'Tripoli Technical Hub / Space', type: 'Study Space', distance: '0.8 km', desc: 'Quiet environment with high-speed internet', coords: 'Azmi Street' },
    { name: 'Rachid Karami International Fair', type: 'Architecture & Walk', distance: '1.5 km', desc: 'Open iconic space designed by Oscar Niemeyer', coords: 'Fair Grounds' },
    { name: 'Bean & Leaf Specialty Coffee', type: 'Café', distance: '2.4 km', desc: 'Ideal for deep focus and laptop work', coords: 'Dam & Farz' }
  ],
  energy: [
    { name: 'Old Souks & Citadel Walk', type: 'Historic Exploration', distance: '1.0 km', desc: 'Vibrant historical pulse near Raymond de Saint-Gilles Citadel', coords: 'Old Tripoli' },
    { name: 'Palm Islands Nature Reserve', type: 'Outdoor Adventure', distance: '5.5 km', desc: 'Boat trip & refreshing island nature walk', coords: 'Off Al-Mina Port' },
    { name: 'Al-Mina Sports Complex', type: 'Fitness', distance: '2.8 km', desc: 'Energizing workouts near the sea', coords: 'Al-Mina' }
  ]
};

export default function DynamicPlanetPage() {
  const router = useRouter();
  const { name } = useParams();
  const rawName = name?.toString().split("-")[0];
  console.log(`name:${name},rawname:${rawName}`);
  const planetKey = (rawName || 'calm').toLowerCase();
  const planet = PLANETS_DATA[planetKey] || PLANETS_DATA.calm;

  // اختيار أماكن طرابلس بحسب الكوكب
  const tripoliPlaces = TRIPOLI_PLACES[planetKey] || TRIPOLI_PLACES.calm;

  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const toggleActivity = (actId: string) => {
    setCompletedActivities(prev => 
      prev.includes(actId) ? prev.filter(a => a !== actId) : [...prev, actId]
    );
  };

  const getPlaceIcon = (type: string) => {
    if (type.includes('Bookstore') || type.includes('Study')) return <Book className="w-5 h-5 text-sky-400" />;
    if (type.includes('Café') || type.includes('Coffee')) return <Coffee className="w-5 h-5 text-sky-400" />;
    if (type.includes('Nature') || type.includes('Outdoor') || type.includes('Walk')) return <Trees className="w-5 h-5 text-sky-400" />;
    return <Flower2 className="w-5 h-5 text-sky-400" />;
  };

  return (
    <div className="min-h-screen bg-transparent  text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Back Link */}
        <button 
          onClick={() => router.push('/galaxy1')}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-full w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to galaxy
        </button>

        {/* Planet Hero Banner */}
        <div className="bg-transparent backdrop-blur-[4px] border border-slate-800/80 rounded-3xl p-8 backdrop-blur-xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0 relative z-10" 
            style={{ 
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${planet.color} 60%, #000000 100%)`,
              boxShadow: `0 0 50px ${planet.color}88`
            }} 
          />
          <div className="space-y-3 text-center md:text-left relative z-10">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold bg-sky-950/60 border border-sky-800/40 px-3 py-1 rounded-full">{planet.tagline}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{planet.name}</h1>
            <p className="text-slate-300 max-w-xl text-sm leading-relaxed">{planet.description}</p>
          </div>
        </div>

       {/* Personalized Wellness Activities */}
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-white">Personalized wellness activities</h2>
    <span className="text-sky-400 text-xs bg-sky-950/10 border backdrop-blur-[20px] border-sky-800/30 px-3 py-1 rounded-full font-medium">
      {completedActivities.length} of {planet.activities.length} complete
    </span>
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
            <h2 className="text-2xl font-bold text-white">Licensed psychologist recommendations</h2>
            <p className="text-slate-400 text-xs mt-1">Short, evidence-based sessions curated for this planet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planet.videos.map((vid) => (
              <VideoCard key={vid.id} video={vid} />
            ))}
          </div>
        </div>

        {/* AI Places Nearby - Tripoli Lebanon */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">AI mood-based places in Tripoli, Lebanon</h2>
            <p className="text-slate-400 text-xs mt-1">Real spots in Tripoli chosen to match your current vibe.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Embedded Live Google Map for Tripoli */}
            <div className="bg-transparent backdrop-blur-[20px] border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[300px] flex flex-col">
              <iframe
                title="Tripoli Lebanon Map"
                src="https://maps.google.com/maps?q=Tripoli%20Lebanon&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[250px] border-0 opacity-80 hover:opacity-100 transition"
                loading="lazy"
              ></iframe>
              <div className="p-3 bg-transparent backdrop-blur-[20px] text-slate-400 text-xs flex items-center justify-between border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <MapPin className="w-4 h-4" /> Tripoli Live Map
                </span>
                <span>{tripoliPlaces.length} matching locations</span>
              </div>
            </div>

            {/* Tripoli Places List */}
            <div className="space-y-3">
              {tripoliPlaces.map((place, idx) => (
                <div key={idx} className="bg-[#0b132b]/20 backdrop-blur-[20px] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-sky-500/40 transition">
                  <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-800/40 flex items-center justify-center shrink-0">
                    {getPlaceIcon(place.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-white">{place.name}</h3>
                      <span className="text-[10px] text-sky-400 bg-sky-950 border border-sky-800/30 px-2 py-0.5 rounded-md">{place.distance}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">{place.type} · {place.coords}</p>
                    <p className="text-slate-500 text-[11px] mt-1">{place.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* How do you feel now? Reflection Component - AT THE VERY BOTTOM */}
        <ReflectionCard completedActivitiesCount={completedActivities.length} />

      </div>
    </div>
  );
}