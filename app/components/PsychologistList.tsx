'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import BookingModal from './BookingModal';
import type { Psychologist as BookingPsychologist } from '@/data/premiumData';

interface Psychologist {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  avatarUrl: string | null;
  startTime: string;
  endTime: string;
}

export default function PsychologistList() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<BookingPsychologist | null>(null);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const response = await fetch('/api/psychologists');
        if (!response.ok) throw new Error('Failed to fetch psychologists');

        const result = await response.json();
        const doctors: Psychologist[] = result.data.map((doctor: {
          id: string;
          name: string;
          title: string;
          bio: string;
          specialties: string[];
          avatarUrl: string | null;
          startTime: string;
          endTime: string;
        }) => ({
          id: doctor.id,
          name: doctor.name,
          title: doctor.title,
          bio: doctor.bio,
          specialties: doctor.specialties,
          avatarUrl: doctor.avatarUrl,
          startTime: doctor.startTime,
          endTime: doctor.endTime,
        }));

        setPsychologists(doctors);
      } catch (fetchError) {
        console.error('Failed to load psychologists:', fetchError);
        setError('Unable to load psychologists right now.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {isLoading && <p className="text-sm text-slate-400">Loading psychologists...</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        {!isLoading && !error && psychologists.length === 0 && (
          <p className="text-sm text-slate-400">No psychologists are available yet.</p>
        )}
        {psychologists.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0b132b]/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between hover:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-4">
              <img 
                src={doc.avatarUrl || '/default-avatar.png'} 
                alt={doc.name} 
                className="w-12 h-12 rounded-full object-cover border border-indigo-500/30 shrink-0"
              />
              <div>
                <h3 className="text-base font-bold text-white">{doc.name}</h3>
                <p className="text-xs text-slate-400">
                  {doc.specialties.join(' & ')} · <span className="text-slate-300">{doc.startTime} - {doc.endTime}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[11px] text-slate-400">Mon-Sat · {doc.startTime} - {doc.endTime}</span>
              <button
                type="button"
                onClick={() => setSelectedPsychologist({
                  id: doc.id,
                  name: doc.name,
                  title: doc.title,
                  exp: 'Available specialist',
                  rating: 5,
                  bio: doc.bio,
                  specialty: doc.specialties.join(' & '),
                  availability: `Mon-Sat · ${doc.startTime} - ${doc.endTime}`,
                  price: 0,
                  avatar: doc.avatarUrl || '/default-avatar.png',
                  startTime: doc.startTime,
                  endTime: doc.endTime,
                })}
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

      {selectedPsychologist && (
        <BookingModal
          selectedDoc={selectedPsychologist}
          onClose={() => setSelectedPsychologist(null)}
        />
      )}
    </div>
  );
}