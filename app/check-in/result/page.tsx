"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPost } from "@/lib/axios"; // أو المسار المعتمد لـ axios لديكِ

// Client-side subscriber helper to handle SSR hydration safely
const emptySubscribe = () => () => {};

export default function ResultPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Safely check if mounted on client without calling setState in useEffect
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Read score directly from localStorage once on client mount
  const [score] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const step1 = Number(localStorage.getItem("step1Score") || 0);
    const step2 = Number(localStorage.getItem("step2Score") || 0);
    const step3 = Number(localStorage.getItem("step3Score") || 0);
    return Math.round((step1 + step2 + step3) / 3);
  });

  let mood = "";
  let planetKey = "";
  let description = "";
  let emoji = "";

  if (score !== null) {
    if (score <= 20) {
      mood = "Happiness";
      planetKey = "happiness";
      description =
        "You seem to be feeling light, positive, and full of good energy.";
      emoji = "✨";
    } else if (score <= 40) {
      mood = "Calm";
      planetKey = "calm";
      description =
        "Your emotional state seems relatively peaceful and balanced.";
      emoji = "🌙";
    } else if (score <= 59) {
      mood = "Self-Love";
      planetKey = "self-love";
      description =
        "Take a moment to appreciate yourself and give yourself the care you deserve.";
      emoji = "💗";
    } else if (score <= 79) {
      mood = "Sadness";
      planetKey = "sadness";
      description =
        "You may be carrying some emotional heaviness. Give yourself space and kindness.";
      emoji = "💧";
    } else {
      mood = "Stress";
      planetKey = "stress";
      description =
        "Your answers suggest that you may be feeling overwhelmed or under pressure.";
      emoji = "🔥";
    }
  }

  // TanStack Query Mutation (أسلوب الأستاذ)
  const saveCheckInMutation = useMutation({
    mutationFn: async () => {
      // إرسال السجل بنفس حقول Prisma Schema
      return await axiosPost("check-in", {
        userId: "user-demo-id", // يمكنكِ استبدالها بـ ID المستخدم الحالي
        mood: mood,
        energyLevel: score,
        notes: description,
      });
    },
    onSuccess: () => {
      // إبطال كاش الـ check-ins وتحديث البيانات
      queryClient.invalidateQueries({ queryKey: ["check-ins"] });
      // مسح قيم الـ localStorage وتوجيه المستخدم
      localStorage.removeItem("step1Score");
      localStorage.removeItem("step2Score");
      localStorage.removeItem("step3Score");
      router.push(`/planet/${planetKey}`);
    },
    onError: (error) => {
      console.error("Failed to save check-in:", error);
      // التوجيه حتى لو حصل خطأ لضمان استمرارية تجربة المستخدم
      router.push(`/planet/${planetKey}`);
    },
  });

  if (!isClient || score === null) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  function goToPlanet() {
    saveCheckInMutation.mutate();
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

          <div className="mt-8 text-7xl">{emoji}</div>

          <h1 className="mt-6 text-4xl font-bold">{mood}</h1>

          <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-purple-400 bg-purple-950/50 shadow-[0_0_50px_rgba(150,100,255,0.3)]">
            <div>
              <p className="text-4xl font-bold">{score}</p>
              <p className="text-sm text-white/50">/ 100</p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-lg leading-7 text-white/60">
            {description}
          </p>

          <button
            type="button"
            onClick={goToPlanet}
            disabled={saveCheckInMutation.isPending}
            className="mt-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 px-8 py-3 font-semibold transition hover:scale-105 disabled:opacity-50"
          >
            {saveCheckInMutation.isPending ? "Saving..." : `Go to ${mood} Planet`}
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