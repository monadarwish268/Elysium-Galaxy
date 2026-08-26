'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface Props {
  videoId: string;
  title: string;
}

export default function YouTubeAudioPlayer({ videoId, title }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const togglePlay = () => {
    if (!iframeRef.current) return;
    const command = isPlaying ? 'pauseVideo' : 'playVideo';
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#0b132b]/80 border border-slate-800 rounded-2xl backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <p className="text-xs text-slate-400">
            {isPlaying ? 'Playing Halal Ambient YouTube Stream...' : 'Click to start ambient atmosphere'}
          </p>
        </div>
      </div>

      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition"
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        {isPlaying ? 'Pause Sound' : 'Play Ambient Audio'}
      </button>

      {/* Invisible YouTube Player */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0`}
        title={title}
        className="hidden w-0 h-0 pointer-events-none"
        allow="autoplay"
      />
    </div>
  );
}