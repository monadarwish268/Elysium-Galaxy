'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Check } from 'lucide-react';
import { Activity } from '../data/planetsData';

interface Props {
  activity: Activity;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export default function ActivityCard({ activity, isCompleted, onToggle }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Convert "04:00" duration format to seconds
  const parseSeconds = (durationStr: string) => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 240;
  };

  const initialSeconds = parseSeconds(activity.duration);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Safe Web Audio Context initializer
  const getAudioContext = () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Card 1: Soothing Beach Waves Sound (Gentle ocean pulse)
  const playBeachWaveSound = () => {
    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 0.9;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.45);
      filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.9);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  };

  // Card 2: Calming Forest Bird Chirp Sound
  const playBirdChirpSound = () => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(2000, now);
      osc.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.18);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Audio fallback
    }
  };

  // Card 3: Peaceful Rain Ambient Sound
  const playSoftRainSound = () => {
    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  };

  // Pick unique nature sound per activity
  const playHalalNatureSound = () => {
    const actId = String(activity.id);
    const title = activity.title.toLowerCase();

    if (actId === 'a1' || title.includes('box') || title.includes('breathing')) {
      playBeachWaveSound();
    } else if (actId === 'a2' || title.includes('sensory') || title.includes('5-4-3-2-1')) {
      playBirdChirpSound();
    } else {
      playSoftRainSound();
    }
  };

  // Countdown loop & sound tick trigger
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

        playHalalNatureSound();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!isPlaying && secondsLeft === 0) {
      setSecondsLeft(initialSeconds);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
        isCompleted ? 'bg-purple-950/30 border-purple-500/40' : 'bg-[#0f172a]/80 border-slate-800'
      }`}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-white text-base">{activity.title}</h3>

          {/* Real-time Second Countdown Display */}
          <span className="text-xs text-purple-300 font-mono bg-purple-900/40 border border-purple-500/30 px-2 py-0.5 rounded font-bold">
            {formatTime(secondsLeft)}
          </span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">{activity.desc}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 font-medium transition"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause Audio' : 'Listen Audio'}
        </button>

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