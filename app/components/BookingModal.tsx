'use client';

import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, UserCircle, Star, Video, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { Psychologist } from '@/data/premiumData';
import { ApiError, axiosGet, axiosPost } from '@/lib/axios';

// Interface defining the booking payload sent to the backend
export interface IBookingPayload {
  userId?: string;
  psychologistId: string;
  scheduledAt: string;
  sessionType: 'video' | 'chat';
  status: string;
}

// Interface defining the response expected from the backend
export interface IBookingResponse {
  id: string;
  psychologistId: string;
  scheduledAt: string;
  sessionType: 'video' | 'chat';
  status: string;
  createdAt: string;
}

interface Props {
  selectedDoc: Psychologist;
  onClose: () => void;
}

const createBookingDates = () => {
  const dates: { day: string; date: string; month: string; value: string }[] = [];
  const currentDate = new Date();

  for (let offset = 0; dates.length < 66 && offset < 92; offset += 1) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + offset);
    const day = date.getDay();

    if (day !== 0) {
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      dates.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        date: String(date.getDate()).padStart(2, '0'),
        month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        value,
      });
    }
  }

  return dates;
};

const createTimeSlots = () => {
  const slots: { label: string; value: string }[] = [];

  for (let minutes = 9 * 60; minutes <= 15 * 60; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    slots.push({
      value,
      label: `${displayHour}:${String(minute).padStart(2, '0')} ${period}`,
    });
  }

  return slots;
};

export default function BookingModal({ selectedDoc, onClose }: Props) {
  const dates = createBookingDates();
  const slots = createTimeSlots();
  const [selectedDate, setSelectedDate] = useState(dates[0]?.value ?? '');
  const [selectedSlot, setSelectedSlot] = useState('09:00');
  const [showSlots, setShowSlots] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'video' | 'chat'>('video');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const loadBookedSlots = async () => {
      setAvailabilityError(null);
      try {
        const response = await axiosGet<{ scheduledAt: string }[]>(
          `/bookings?psychologistId=${encodeURIComponent(selectedDoc.id)}&date=${selectedDate}`,
        );
        setBookedSlots((response.data ?? []).map((booking) => {
          const time = new Date(booking.scheduledAt).toISOString();
          return time.slice(11, 16);
        }));
      } catch (error) {
        setAvailabilityError(error instanceof ApiError ? error.message : 'Could not load availability.');
        setBookedSlots([]);
      }
    };

    void loadBookedSlots();
  }, [selectedDate, selectedDoc.id]);

  // TanStack Query Mutation requested by your doctor/instructor
  const createMutation = useMutation({
  mutationFn: (values: IBookingPayload) =>
    axiosPost<IBookingPayload, IBookingResponse>('bookings', values), // Notice: 'bookings'
  onSuccess: () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      onClose();
    }, 2000);
  },
  onError: (error) => {
    console.error('Mutation error:', error);
    const message = error instanceof ApiError ? error.message : 'Could not create booking.';
    alert(message);
  },
});

  // Updated handler: Triggers the TanStack Mutation
  const handleBookSubmit = () => {
    const storedUser = localStorage.getItem('elysium_user') || localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) as { id?: string } : undefined;
    const payload: IBookingPayload = {
      ...(user?.id ? { userId: user.id } : {}),
      psychologistId: selectedDoc.id,
      scheduledAt: `${selectedDate}T${selectedSlot}:00.000Z`,
      sessionType: sessionType,
      status: 'PENDING',
    };

    createMutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#05091e] border border-slate-800 rounded-3xl p-6 relative space-y-6 shadow-2xl text-white">
        
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
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
            {dates.map((d) => {
              const isSelected = selectedDate === d.value;
              return (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setSelectedDate(d.value)}
                  className={`py-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#152a5c] border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                      : 'bg-[#0b122c] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-semibold text-slate-400">{d.day}</div>
                  <div className="text-[9px] font-semibold text-cyan-400">{d.month}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{d.date}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Available Slots */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => setShowSlots((isOpen) => !isOpen)}
            className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-[#0b122c] px-4 py-3 text-left transition-colors hover:border-cyan-500/60"
          >
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Clock className="h-4 w-4 text-cyan-400" /> Available slots
            </span>
            <span className="text-xs font-semibold text-cyan-300">{selectedSlot}</span>
          </button>

          {showSlots && (
            <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-800 bg-[#0b122c] p-2">
              {slots.map((slot) => {
                const isSelected = selectedSlot === slot.value;
                const isBooked = bookedSlots.includes(slot.value);
                return (
                  <button
                    key={slot.value}
                    type="button"
                    disabled={isBooked}
                    onClick={() => {
                      if (isBooked) return;
                      setSelectedSlot(slot.value);
                      setShowSlots(false);
                    }}
                    className={`rounded-lg border py-2.5 text-xs font-bold transition-all ${
                      isBooked
                        ? 'cursor-not-allowed border-red-900/60 bg-red-950/30 text-red-300'
                        : isSelected
                        ? 'border-indigo-500 bg-[#13204c] text-indigo-200 shadow-md shadow-indigo-500/20'
                        : 'border-slate-800 bg-[#0b122c] text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {isBooked ? `${slot.label} - Booked` : slot.label}
                  </button>
                );
              })}
            </div>
          )}

          {availabilityError && <p className="text-xs text-red-400">{availabilityError}</p>}

          {!showSlots && (
            <p className="text-[11px] text-slate-500">Choose a time from 9:00 AM to 3:00 PM.</p>
          )}
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
              <span className="text-white font-bold text-sm">$5{selectedDoc.price}</span>
              <span className="text-cyan-400 ml-1 font-semibold">(Relax with Premium)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookSubmit}
            disabled={bookingConfirmed || createMutation.isPending}
            className="w-full py-3.5 rounded-full bg-linear-to-r from-indigo-500 via-cyan-400 to-indigo-500 hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {createMutation.isPending ? (
              'Saving to Supabase...'
            ) : bookingConfirmed ? (
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