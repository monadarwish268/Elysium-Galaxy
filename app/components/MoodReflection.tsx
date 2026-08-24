'use client';

import React, { useState } from 'react';
import { MessageSquareHeart, Send, Check } from 'lucide-react';

export default function MoodReflection() {
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#0b132b]/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
          <MessageSquareHeart className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Daily Reflection</h2>
          <p className="text-slate-400 text-xs">How do you feel after exploring this planet? Take a moment to write it down.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write a few words about your current mood or thoughts..."
          rows={3}
          className="w-full bg-[#070d19]/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 resize-none transition"
        />

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-500">Only visible to you</span>
          <button
            type="submit"
            disabled={!reflection.trim() || saved}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
              saved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950 disabled:opacity-40 disabled:hover:bg-sky-500'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Saved to Journal
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Save Reflection
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}