'use client';

import React, { useState } from 'react';
import { MessageSquareHeart, Send, Check } from 'lucide-react';

export default function MoodReflection() {
  const [reflection, setReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const moods = [
    { label: 'Still heavy', emoji: '😔' },
    { label: 'A little better', emoji: '😟' },
    { label: 'Lighter', emoji: '😐' },
    { label: 'Calm', emoji: '😌' },
    { label: 'Great', emoji: '🤩' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim() && !selectedMood) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#0b132b]/60 border border-slate-800/80 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
          <MessageSquareHeart className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">How do you feel now?</h2>
          <p className="text-slate-400 text-xs">One tap keeps your reflection streak alive.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {moods.map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelectedMood(m.label)}
            className={`p-4 rounded-xl border text-center transition flex flex-col items-center space-y-2 ${
              selectedMood === m.label
                ? 'bg-cyan-950 border-cyan-400 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">{m.emoji}</span>
            <span className="text-[11px] font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write a few words about your current mood or thoughts..."
          rows={3}
          className="w-full bg-[#070d19]/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none transition"
        />

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-500">Only visible to you</span>
          <button
            type="submit"
            disabled={(!reflection.trim() && !selectedMood) || saved}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium transition ${
              saved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved Reflection
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Save reflection
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}