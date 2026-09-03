import React from 'react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { Bot, Orbit, HeartHandshake } from "lucide-react";

const features: { icon: React.ReactNode; title: string; description: string }[] = [
  {
    icon: <Bot className="w-6 h-6 text-cyan-400" />,
    title: "AI Check-in",
    description:
      "A 3-step conversational assessment that scores your mood and routes you onward.",
  },
  {
    icon: <Orbit className="w-6 h-6 text-purple-400" />,
    title: "5 Emotion Planets",
    description:
      "Stress, Anxiety, Happiness, Sadness and Calm — each with its own wellness hub.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-blue-400" />,
    title: "Real Support",
    description:
      "Licensed psychologist videos plus partnered calm spaces near you.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen text-white font-['Poppins'] relative overflow-hidden flex flex-col justify-between items-center pb-10">
      <div className="flex-1 flex items-center justify-center w-full z-10">
        <Hero />
      </div>

      <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6 z-20 mt-16 pt-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      </main>
  );
}