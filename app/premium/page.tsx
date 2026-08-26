'use client';

import React, { useState } from 'react';
import { Psychologist } from '../../data/premiumData';
import UpliftTab from '@/app/components/UpliftTab';
import PsychologistList from '@/app/components/PsychologistList';
import BookingModal from '@/app/components/BookingModal';

export default function PremiumPage() {
  const [activeTab, setActiveTab] = useState<'booking' | 'uplift'>('uplift');
  const [selectedDoc, setSelectedDoc] = useState<Psychologist | null>(null);

  return (
    <div className="min-h-screen bg-transparent text-white p-6 md:p-12 pt-24 font-sans relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            PREMIUM ORBIT
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Make your universe <span className="text-indigo-400">truly yours</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Everything core stays free. These optional extras support the mission and unlock deeper connection and professional care.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex p-1 bg-[#0b132b]/80 backdrop-blur-md rounded-full border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('uplift')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'uplift'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Send Cute Uplift
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('booking')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'booking'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Psychologist Booking
          </button>
        </div>

        {/* Active View */}
        {activeTab === 'uplift' ? (
          <UpliftTab />
        ) : (
          <PsychologistList onSelectDoc={(doc) => setSelectedDoc(doc)} />
        )}

      </div>

      {/* Booking Modal */}
      {selectedDoc && (
        <BookingModal 
          selectedDoc={selectedDoc} 
          onClose={() => setSelectedDoc(null)} 
        />
      )}
    </div>
  );
}