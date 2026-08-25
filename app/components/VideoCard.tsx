import React from 'react';
import { Video } from '@/data/planetsData';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-video w-full bg-black">
        <iframe
          src={video.embedUrl}
          title={video.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{video.tag}</span>
          <h4 className="font-medium text-sm text-white line-clamp-1">{video.title}</h4>
          <p className="text-xs text-slate-400">{video.author}</p>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">{video.duration}</span>
      </div>
    </div>
  );
}