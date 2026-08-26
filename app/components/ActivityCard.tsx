'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, CheckCircle2 } from 'lucide-react';
import { Activity } from '@/data/planetsData';

interface ActivityCardProps {
  activity: Activity;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export default function ActivityCard({ activity, isCompleted, onToggle }: ActivityCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const parseSeconds = (durationStr: string) => {
    const parts = durationStr.split(':');
    return parts.length === 2 ? parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) : 300;
  };

  const initialSeconds = parseSeconds(activity.duration);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Halal Nature Sound 1: Ocean Waves
  const playBeachWaveSound = () => {
    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.4);
      filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.8);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {}
  };

  // Halal Nature Sound 2: Forest Birds
  const playBirdChirpSound = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.18);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  };

  // Halal Nature Sound 3: Night Crickets
  const playCricketSound = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(4200, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  };

  const triggerHalalNatureSound = () => {
    const id = String(activity.id);
    if (id.endsWith('1') || activity.title.toLowerCase().includes('decompression') || activity.title.toLowerCase().includes('journaling')) {
      playBeachWaveSound();
    } else if (id.endsWith('2') || activity.title.toLowerCase().includes('walk') || activity.title.toLowerCase().includes('joy')) {
      playBirdChirpSound();
    } else {
      playCricketSound();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
        triggerHalalNatureSound();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCardClick = () => {
    triggerHalalNatureSound();
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(activity.id);
  };

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying && secondsLeft === 0) setSecondsLeft(initialSeconds);
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer select-none ${
        isCompleted
          ? 'bg-cyan-950/40 border-cyan-500/50'
          : 'bg-[#0b132b]/50 border-slate-800/80 hover:border-slate-700'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-sm text-white">{activity.title}</h3>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">{activity.description}</p>
        </div>
        <button onClick={handleToggle} className="p-1 hover:opacity-80 transition">
          <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-cyan-400' : 'text-slate-600'}`} />
        </button>
      </div>

      <div className="flex justify-between items-center pt-2 text-xs">
        <span className="text-cyan-400 font-mono font-semibold">{formatTime(secondsLeft)}</span>
        <button
          onClick={handlePlayToggle}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-[11px] hover:bg-cyan-900/80 transition"
        >
          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
          {isPlaying ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}