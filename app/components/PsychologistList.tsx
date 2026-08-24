'use client';

import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { PSYCHOLOGISTS, Psychologist } from '@/app/premium/data/premiumData';

interface Props {
  onSelectDoc: (doc: Psychologist) => void;
}

export default function PsychologistList({ onSelectDoc }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {PSYCHOLOGISTS.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0b132b]/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between hover:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-4">
              <img 
                src={doc.avatar} 
                alt={doc.name} 
                className="w-12 h-12 rounded-full object-cover border border-indigo-500/30 shrink-0"
              />
              <div>
                <h3 className="text-base font-bold text-white">{doc.name}</h3>
                <p className="text-xs text-slate-400">
                  {doc.specialty} · <span className="text-slate-300">{doc.availability}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-300 font-medium">${doc.price} / 50min</span>
              <button 
                type="button" 
                onClick={() => onSelectDoc(doc)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <Calendar className="w-3.5 h-3.5" /> Book
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
        <h3 className="text-base font-bold text-white">What&apos;s included</h3>
        <ul className="space-y-3 text-xs text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Licensed, verified psychologists
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Encrypted video sessions
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Shared mood history with your therapist
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Free rescheduling up to 12h before
          </li>
        </ul>
      </div>
    </div>
  );
}