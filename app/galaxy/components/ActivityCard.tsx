'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check, Play, Pause } from 'lucide-react';
import { Activity } from '../data/planetsData';

interface Props {
  activity: Activity;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export default function ActivityCard({ activity, isCompleted, onToggle }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (activity.audioUrl) {
      const audio = new Audio(activity.audioUrl);
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [activity.audioUrl]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
      isCompleted ? 'bg-purple-950/30 border-purple-500/40' : 'bg-[#0f172a]/80 border-slate-800'
    }`}>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-white text-base">{activity.title}</h3>
          <span className="text-xs text-slate-400 font-mono bg-slate-800/60 px-2 py-0.5 rounded">
            {activity.duration}
          </span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">{activity.desc}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        {activity.audioUrl ? (
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 font-medium transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause Audio' : 'Listen Audio'}
          </button>
        ) : <div />}

        <button
          onClick={() => onToggle(activity.id)}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition ${
            isCompleted ? 'bg-purple-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          {isCompleted ? 'Completed' : 'Mark Done'}
        </button>
      </div>
    </div>
  );
}