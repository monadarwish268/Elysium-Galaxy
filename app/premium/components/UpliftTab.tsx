'use client';

import React, { useState } from 'react';
import { Heart, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UpliftTab() {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setMessage('');
      setIsSent(false);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-pink-500/10 rounded-2xl border border-pink-500/20 text-pink-400">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Post an Anonymous Kind Message</h2>
            <p className="text-xs text-slate-400">
              Send a warm note into the galaxy to brighten a stranger&apos;s day. Completely anonymous.
            </p>
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., You're doing so much better than you think. Keep shining softly today! 💫"
            className="w-full h-32 bg-[#040817]/70 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            maxLength={250}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {250 - message.length} characters left
            </span>
            <button
              type="submit"
              disabled={!message.trim() || isSent}
              className="bg-linear-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              {isSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-300" /> Sent to the Galaxy!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Beam Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" /> How it works
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              Your message lands randomly on another user&apos;s galaxy view.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              No names, no profiles, no tracking — just pure good vibes.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              Helps someone feel less alone right when they need it.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}