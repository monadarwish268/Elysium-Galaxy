'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Video } from '../data/planetsData';

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-[#0f172a]/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm group hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
      <div className="h-56 bg-slate-900 relative flex items-center justify-center">
        {isPlaying ? (
          <iframe
            src={`${video.youtubeEmbedUrl}?autoplay=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center cursor-pointer bg-slate-900/60 hover:bg-slate-900/40 transition"
            onClick={() => setIsPlaying(true)}
          >
            <div className="w-14 h-14 bg-purple-600/90 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition shadow-lg">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
            <span className="absolute bottom-3 right-3 bg-slate-950/80 text-xs font-mono px-2 py-0.5 rounded text-slate-300">
              {video.duration}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 space-y-2">
        <span className="bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs px-2.5 py-1 rounded-full font-medium">
          {video.category}
        </span>
        <h3 className="font-bold text-lg text-white pt-1">{video.title}</h3>
        <p className="text-slate-400 text-xs">{video.instructor}</p>
      </div>
    </div>
  );
}