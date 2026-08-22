'use client';

import React from 'react';
import { Check, Play, RotateCcw } from 'lucide-react';
import { Activity } from '../data/planetsData';

interface Props {
  activity: Activity;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export default function ActivityCard({ activity, isCompleted, onToggle }: Props) {
  return (
    <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between h-48 backdrop-blur-sm hover:border-slate-700 transition">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-white">{activity.title}</h3>
          <button 
            onClick={() => onToggle(activity.id)} 
            className={`w-7 h-7 rounded-full flex items-center justify-center border transition ${
              isCompleted 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                : 'border-slate-700 text-slate-500 hover:border-slate-500'
            }`}
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed">{activity.desc}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800/60">
        <span className="text-xs font-mono text-slate-400">{activity.duration}</span>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-full text-xs font-medium text-white transition">
            <Play className="w-3 h-3 fill-current" /> Start
          </button>
          <button className="p-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}