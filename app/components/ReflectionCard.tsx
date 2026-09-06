'use client';

import React, { useState } from 'react';
import { Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPost } from '@/lib/axios';

const MOODS = [
  { id: 'heavy', label: 'Still heavy', emoji: '😔' },
  { id: 'better', label: 'A little better', emoji: '😟' },
  { id: 'lighter', label: 'Lighter', emoji: '😃' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'great', label: 'Great', emoji: '🤩' },
];

interface ReflectionCardProps {
  completedActivitiesCount?: number;
  planetId?: string;
}

export default function ReflectionCard({
  completedActivitiesCount = 0,
  planetId,
}: ReflectionCardProps) {
  const queryClient = useQueryClient();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  // 1. Fetching Reflections لحساب الـ Streak من البيانات الحقيقية
  const { data: reflections = [] } = useQuery({
    queryKey: ['reflections', planetId],
    queryFn: async () => {
      const url = planetId ? `reflections?planetId=${planetId}` : 'reflections';
      const response = await axiosGet<any[]>(url);
      return response.data || [];
    },
  });

  // 2. Mutation لحفظ الـ Reflection في Supabase
  const createMutation = useMutation({
    mutationFn: async (feelingNow: string) => {
      return await axiosPost('reflections', {
        userId: localStorage.getItem('userId'), // يمكن استبدالها بـ ID المستخدم الحالي مستقبلاً
        planetId,
        feelingNow,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections', planetId] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
    onError: (error) => {
      console.error('Failed to save reflection:', error);
    },
  });

  const handleSave = () => {
    if (!selectedMood) return;
    const moodObj = MOODS.find((m) => m.id === selectedMood);
    if (moodObj) {
      createMutation.mutate(moodObj.label);
    }
  };

  return (
    <div className="bg-transparent border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
      
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
            <span><strong className="text-white">{reflections.length}</strong> streak</span>
          </div>

          <div className="flex items-center gap-1.5 bg-transparent backdrop-blur-[20px] border border-slate-800/80 px-3 py-1.5 rounded-full text-xs text-slate-300 font-medium">
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
                  ? 'bg-sky-950/60 backdrop-blur-[20px] border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.2)] scale-105'
                  : 'bg-[#0e1a35]/25 backdrop-blur-[20px] border-slate-800/80 hover:bg-[#132247] hover:border-slate-700'
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
          disabled={!selectedMood || createMutation.isPending}
          className={`px-6 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
            selectedMood && !createMutation.isPending
              ? 'bg-indigo-600 backdrop-blur-[20px] hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95'
              : 'bg-indigo-900/20 backdrop-blur-[20px] text-slate-500 border border-indigo-900/40 cursor-not-allowed'
          }`}
        >
          {saved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {createMutation.isPending
            ? 'Saving...'
            : saved
            ? 'Reflection Saved!'
            : 'Save reflection'}
        </button>
      </div>

    </div>
  );
}