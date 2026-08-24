"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckinCard from "../../components/card";

const answers = [
  { text: "I need to slow down and rest", score: 80 },
  { text: "I need some peace and quiet", score: 65 },
  { text: "I need someone to talk to", score: 50 },
  { text: "I need motivation", score: 30 },
  { text: "I feel good and want to keep going", score: 10 },
];

export default function StepThreePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  function handleAnswer(score: number, index: number) {
    setSelected(index);
    localStorage.setItem("step3Score", String(score));
    router.push("/check-in/result");
  }

  return (
    <CheckinCard
      step={3}
      question="What do you need most right now?"
      description="Choose the answer that feels closest to what you need."
      answers={answers}
      selected={selected}
      onAnswer={handleAnswer}
      onBack={() => router.push("/check-in/step-2")}
    />
  );
}