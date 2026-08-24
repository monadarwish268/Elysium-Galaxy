import React from 'react';
import { Place } from '@/data/planetsData';

interface PlanetPlacesProps {
  places: Place[];
}

export default function PlanetPlaces({ places }: PlanetPlacesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Nearby Spots in Tripoli</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {places.map((place, index) => (
          <div key={index} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 font-medium">{place.type}</span>
              <span className="text-xs text-slate-500">{place.distance}</span>
            </div>
            <h3 className="font-medium text-white">{place.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{place.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}