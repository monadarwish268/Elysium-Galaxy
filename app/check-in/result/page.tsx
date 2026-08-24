"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const step1 = Number(localStorage.getItem("step1Score") || 0);
    const step2 = Number(localStorage.getItem("step2Score") || 0);
    const step3 = Number(localStorage.getItem("step3Score") || 0);

    const finalScore = Math.round((step1 + step2 + step3) / 3);

    setScore(finalScore);
  }, []);

  if (score === null) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  let mood = "";
  let description = "";
  let emoji = "";

  if (score <= 20) {
    mood = "Happiness";
    description =
      "You seem to be feeling light, positive, and full of good energy.";
    emoji = "✨";
  } else if (score <= 40) {
    mood = "Calm";
    description =
      "Your emotional state seems relatively peaceful and balanced.";
    emoji = "🌙";
  } else if (score <= 59) {
    mood = "Self-Love";
    description =
      "Take a moment to appreciate yourself and give yourself the care you deserve.";
    emoji = "💗";
  } else if (score <= 79) {
    mood = "Sadness";
    description =
      "You may be carrying some emotional heaviness. Give yourself space and kindness.";
    emoji = "💧";
  } else {
    mood = "Stress";
    description =
      "Your answers suggest that you may be feeling overwhelmed or under pressure.";
    emoji = "🔥";
  }

  function goToPlanet() {
    router.push(`/planet/${mood.toLowerCase()}`);
  }

  return (
    <main className="relative min-h-screen px-6 py-12 text-white">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[10%] top-[15%] text-2xl text-purple-200">
          ✦
        </span>

        <span className="absolute left-[25%] top-[30%] text-sm text-blue-200">
          ✧
        </span>

        <span className="absolute right-[15%] top-[18%] text-2xl text-purple-200">
          ✦
        </span>

        <span className="absolute right-[10%] bottom-[25%] text-lg text-blue-200">
          ✧
        </span>

        <span className="absolute left-[15%] bottom-[15%] text-xl text-purple-200">
          ✦
        </span>
      </div>

      <div className="relative mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-[36px] border border-purple-400/20 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">

          <p className="text-sm font-semibold text-purple-300">
            Your Emotional Result
          </p>

          <div className="mt-8 text-7xl">
            {emoji}
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            {mood}
          </h1>

          <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-purple-400 bg-purple-950/50 shadow-[0_0_50px_rgba(150,100,255,0.3)]">
            <div>
              <p className="text-4xl font-bold">
                {score}
              </p>

              <p className="text-sm text-white/50">
                / 100
              </p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-lg leading-7 text-white/60">
            {description}
          </p>

          <button
            type="button"
            onClick={goToPlanet}
            className="mt-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 font-semibold transition hover:scale-105"
          >
            Go to {mood} Planet
          </button>

          <button
            type="button"
            onClick={() => router.push("/check-in")}
            className="mt-4 block w-full text-sm text-white/50 transition hover:text-white"
          >
            Start Again
          </button>

        </div>
      </div>
    </main>
  );
}