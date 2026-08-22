'use client';

import React, { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';

export default function MoodReflection() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const feelings = [
    { label: 'Still heavy', emoji: '😟' },
    { label: 'A little better', emoji: '😕' },
    { label: 'Lighter', emoji: '🙂' },
    { label: 'Calm', emoji: '😌' },
    { label: 'Great', emoji: '🤩' }
  ];

  return (
    <div className="bg-[#0b132b]/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">How do you feel now?</h2>
          <p className="text-slate-400 text-xs mt-1">One tap keeps your reflection streak alive.</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-300 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> 0 streak
          </span>
          <span className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> 0 activities
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {feelings.map((item) => (
          <button
            key={item.label}
            onClick={() => setSelectedFeeling(item.label)}
            className={`p-4 rounded-2xl border text-center space-y-2 transition ${
              selectedFeeling === item.label
                ? 'bg-indigo-600/30 border-indigo-500 text-white'
                : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-2xl">{item.emoji}</div>
            <div className="text-xs font-medium">{item.label}</div>
          </button>
        ))}
      </div>

      <div>
        <button
          disabled={!selectedFeeling}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-6 py-3 rounded-xl transition"
        >
          Save reflection
        </button>
      </div>
    </div>
  );
}