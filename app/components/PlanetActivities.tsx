import React from 'react';
import { Activity } from '@/data/planetsData';

interface PlanetActivitiesProps {
  activities: Activity[];
}

export default function PlanetActivities({ activities }: PlanetActivitiesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Recommended Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.map((act) => (
          <div key={act.id} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs text-amber-400 font-mono">{act.duration}</span>
              <h3 className="font-medium text-white mt-1">{act.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{act.description}</p>
            </div>
            <button className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-xl transition-colors text-slate-200">
              Start Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}