"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckInCard from "../components/card";

const answers = [
  { text: "Tense and overloaded", score: 80 },
  { text: "Restless and worried", score: 65 },
  { text: "Low and heavy", score: 50 },
  { text: "Steady and settled", score: 30 },
  { text: "Light and joyful", score: 10 },
];

export default function CheckInPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  function handleAnswer(score: number, index: number) {
    setSelected(index);

    localStorage.setItem("step1Score", String(score));

    router.push("/check-in/step-2");
  }

  return (
    <CheckInCard
      step={1}
      question="How are you feeling right now?"
      description="Choose the answer that feels closest to you."
      answers={answers}
      selected={selected}
      onAnswer={handleAnswer}
    />
  );
}