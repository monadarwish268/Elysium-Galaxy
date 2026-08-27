import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white">
      {/* Spinner متحرك بتصميم فضائي */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
        <Loader2 className="w-6 h-6 text-cyan-400 animate-pulse absolute" />
      </div>

      <p className="mt-4 text-sm font-light text-gray-300 tracking-widest animate-pulse">
        Entering Your Personal Cosmos...
      </p>
    </div>
  );
}