'use client';

import React, { useState } from 'react';
import { Flame, Sparkles, CheckCircle2 } from 'lucide-react';

const MOODS = [
  { id: 'heavy', label: 'Still heavy', emoji: '😔' },
  { id: 'better', label: 'A little better', emoji: '😟' },
  { id: 'lighter', label: 'Lighter', emoji: '😃' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'great', label: 'Great', emoji: '🤩' },
];

interface ReflectionCardProps {
  completedActivitiesCount?: number;
}

export default function ReflectionCard({ completedActivitiesCount = 0 }: ReflectionCardProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = () => {
    if (!selectedMood) return;
    setStreak((prev) => prev + 1);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#0a1329]/90 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">How do you feel now?</h2>
          <p className="text-slate-400 text-xs mt-1">One tap keeps your reflection streak alive.</p>
        </div>

        {/* Streaks & Activities counters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#0e1b38] border border-slate-800/80 px-3 py-1.5 rounded-full text-xs text-slate-300 font-medium">
            <Flame className="w-4 h-4 text-sky-400" />
            <span><strong className="text-white">{streak}</strong> streak</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0e1b38] border border-slate-800/80 px-3 py-1.5 rounded-full text-xs text-slate-300 font-medium">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span><strong className="text-white">{completedActivitiesCount}</strong> activities</span>
          </div>
        </div>
      </div>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                isSelected
                  ? 'bg-sky-950/60 border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.2)] scale-105'
                  : 'bg-[#0e1a35]/60 border-slate-800/80 hover:bg-[#132247] hover:border-slate-700'
              }`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <span className={`text-xs font-medium ${isSelected ? 'text-white font-semibold' : 'text-slate-300'}`}>
                {m.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={!selectedMood}
          className={`px-6 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
            selectedMood
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95'
              : 'bg-indigo-900/40 text-slate-500 border border-indigo-900/40 cursor-not-allowed'
          }`}
        >
          {saved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {saved ? 'Reflection Saved!' : 'Save reflection'}
        </button>
      </div>

    </div>
  );
}