"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckinCard from "../../components/card";

const answers = [
  { text: "I feel full of energy", score: 10 },
  { text: "I feel good and active", score: 25 },
  { text: "My energy feels normal", score: 50 },
  { text: "I feel low on energy", score: 75 },
  { text: "I feel completely drained", score: 90 },
];

export default function StepTwoPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  function handleAnswer(score: number, index: number) {
    setSelected(index);
    localStorage.setItem("step2Score", String(score));
    router.push("/check-in/step-3");
  }

  return (
    <CheckinCard
      step={2}
      question="How has your energy been today?"
      description="Choose the answer that feels closest to you."
      answers={answers}
      selected={selected}
      onAnswer={handleAnswer}
      onBack={() => router.push("/check-in")}
    />
  );
}