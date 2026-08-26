'use client';

import React, { useState } from 'react';
import { ChevronLeft, UserCircle, Star, Video, MessageSquare, CheckCircle2 } from 'lucide-react';
import { DATES, SLOTS, Psychologist } from '@/data/premiumData';

interface Props {
  selectedDoc: Psychologist;
  onClose: () => void;
}

export default function BookingModal({ selectedDoc, onClose }: Props) {
  const [selectedDate, setSelectedDate] = useState('15');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [sessionType, setSessionType] = useState<'video' | 'chat'>('video');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookSubmit = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#05091e] border border-slate-800 rounded-3xl p-6 relative space-y-6 shadow-2xl text-white">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button 
            type="button" 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0d1636] border border-slate-700 flex items-center justify-center hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">Book a Session</h2>
          <div className="w-8 h-8 rounded-full bg-[#0d1636] border border-slate-700 flex items-center justify-center text-slate-300">
            <UserCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Doctor Info */}
        <div className="bg-[#0b122c] border border-slate-800/80 rounded-2xl p-4 flex items-start gap-3 relative">
          <img 
            src={selectedDoc.avatar} 
            alt={selectedDoc.name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{selectedDoc.name}</h3>
              <div className="flex items-center gap-1 text-cyan-400 text-xs font-bold">
                <span>{selectedDoc.rating}</span>
                <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {selectedDoc.title} · {selectedDoc.exp}
            </p>
            <p className="text-[11px] text-slate-300 leading-snug pt-1">
              {selectedDoc.bio}
            </p>
          </div>
        </div>

        {/* Select Date */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Date</label>
          <div className="grid grid-cols-5 gap-2">
            {DATES.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDate(d.date)}
                  className={`py-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#152a5c] border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                      : 'bg-[#0b122c] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-semibold text-slate-400">{d.day}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{d.date}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Available Slots */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Available Slots</label>
          <div className="space-y-2">
            {SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full py-3 rounded-xl border text-xs font-bold tracking-wider transition-all ${
                    isSelected
                      ? 'bg-[#13204c] border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/20'
                      : 'bg-[#0b122c] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Session Type */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Session Type</label>
          <div className="grid grid-cols-2 gap-2 bg-[#0b122c] p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setSessionType('video')}
              className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                sessionType === 'video'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" /> Video Call
            </button>
            <button
              type="button"
              onClick={() => setSessionType('chat')}
              className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                sessionType === 'chat'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat Room
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Session Rate</span>
            <div>
              <span className="text-white font-bold text-sm">${selectedDoc.price}</span>
              <span className="text-cyan-400 ml-1 font-semibold">(Free with Premium)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookSubmit}
            disabled={bookingConfirmed}
            className="w-full py-3.5 rounded-full bg-linear-to-r from-indigo-500 via-cyan-400 to-indigo-500 hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
          >
            {bookingConfirmed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" /> Session Reserved!
              </>
            ) : (
              'Book Session'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}