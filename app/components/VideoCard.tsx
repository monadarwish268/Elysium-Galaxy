'use client';

import React from 'react';
import { Video } from '@/data/planetsData';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-[#0b132b]/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-4 backdrop-blur-md hover:border-slate-700 transition">
      <div className="h-44 w-full bg-slate-900/80 rounded-xl relative overflow-hidden border border-slate-800/50">
        {video.embedUrl ? (
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-500">
            Preview unavailable
          </div>
        )}
      </div>

      <div>
        <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded-md font-medium">
          {video.tag}
        </span>
        <h3 className="font-bold text-sm text-white mt-2">{video.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-slate-400 text-xs">{video.doctor}</p>
          <span className="text-[11px] text-slate-400 font-mono">{video.duration}</span>
        </div>
      </div>
    </div>
  );
}