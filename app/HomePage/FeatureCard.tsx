import React from 'react';

// تعريف الـ Props للتأكد من نوع البيانات بـ TypeScript
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

//3mlt box wehed w eeyatelu 3 marrat bl page.tsx//
export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start p-8 rounded-3xl bg-[#091535]/80 border border-[#1d3368] backdrop-blur-md shadow-lg hover:border-[#2a488f] transition-all duration-300">
    
      <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-[#1b2559] text-[#00d2ff]">
        {icon}
      </div>

      
      <h3 className="mb-3 text-xl font-bold text-white tracking-wide">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-[#8f9bba]">
        {description}
      </p>
    </div>
  );
}