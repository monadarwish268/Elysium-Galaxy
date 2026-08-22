import React from 'react';  
import { Sparkles } from 'lucide-react';
import { appname, navbarlinks } from '../../Component/Navbar';
import Hero from './Hero';
import FeatureCard from './FeatureCard';
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
      
      {/* 1. Navbar بأعلى الصفحة */}
      <nav className="w-full max-w-7xl px-8 py-6 flex items-center justify-between z-20 mx-auto">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-wide text-white">
            {appname.name}
          </span>
        </div>

        <div className="flex items-center gap-8 text-sm text-gray-300 font-light">
          {navbarlinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-2 backdrop-blur-md">
          </span>
        </div>
      </nav>

      
      <div className="flex-1 flex items-center justify-center w-full z-10">
        <Hero />
      </div>

      {/* 3. الكروت بأسفل الصفحة (mt-auto بتدفشهم لتحت تماماً) */}
      <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6 z-20 mt-16 pt-6 ">
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