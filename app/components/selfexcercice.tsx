import React, { useState, useEffect } from "react";

const selfLoveData = [
  {
    affirmation: "I choose to see the good in myself and others.",
    challenge: "Make eye contact and smile at someone today.",
  },
  {
    affirmation: "My worth is not defined by my productivity.",
    challenge: "Take 5 deep breaths and forgive yourself for a past mistake.",
  },
  {
    affirmation: "I am deserving of love, respect, and kindness.",
    challenge: "Write down 3 things you genuinely appreciate about yourself.",
  },
];

export default function SelfLoveSection() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % selfLoveData.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Increase score by 3% when user clicks "I did it"
  const handleAction = () => {
    setProgress((prev) => Math.min(prev + 3, 100));
  };

  const current = selfLoveData[index];

  return (
    <section className="space-y-6 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Affirmation Box */}
        <div className="galaxy-gold-card flex flex-col justify-between">
          <h3 className="text-amber-400 text-sm font-semibold tracking-wide uppercase mb-4">
            &ldquo; Today&apos;s Affirmation
          </h3>
          <div className="bg-[#1c223d]/80 border-l-4 border-amber-500 p-6 rounded-xl min-h-35 flex items-center">
            <p className="text-xl font-medium text-slate-100 italic transition-opacity duration-500">
              &ldquo;{current.affirmation}&rdquo;
            </p>
          </div>
        </div>

        {/* Confidence Challenge Box */}
        <div className="galaxy-gold-card flex flex-col justify-between">
          <h3 className="text-amber-400 text-sm font-semibold tracking-wide uppercase mb-4">
            Confidence Challenge
          </h3>
          <div className="bg-[#1c223d]/80 border-l-4 border-amber-500 p-6 rounded-xl min-h-[100px] flex items-center mb-4">
            <p className="text-lg text-slate-200">{current.challenge}</p>
          </div>
          <div className="text-center">
            <button onClick={handleAction} className="btn-gold w-full max-w-xs">
              I did it
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="pt-4">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Your Progress: <strong className="text-amber-400">{progress}%</strong></span>
          <span>100%</span>
        </div>
        <div className="w-full bg-[#181d36] h-2.5 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="bg-amber-400 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}