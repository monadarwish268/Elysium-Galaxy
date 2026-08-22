'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { Video } from '../data/planetsData';

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  return (
    <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm group hover:border-slate-700 transition flex flex-col justify-between">
      <div className="h-44 bg-slate-900/80 relative flex items-center justify-center">
        <div className="w-12 h-12 bg-cyan-400/90 rounded-full flex items-center justify-center text-slate-950 group-hover:scale-110 transition cursor-pointer">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
        <span className="absolute bottom-3 right-3 bg-slate-950/80 text-xs font-mono px-2 py-0.5 rounded text-slate-300">
          {video.duration}
        </span>
      </div>
      <div className="p-5 space-y-2">
        <span className="bg-slate-800/80 text-indigo-300 text-xs px-2.5 py-1 rounded-full font-medium">
          {video.category}
        </span>
        <h3 className="font-bold text-lg text-white pt-1">{video.title}</h3>
        <p className="text-slate-400 text-xs">{video.instructor}</p>
      </div>
    </div>
  );
}