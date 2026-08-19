import { Sparkles } from 'lucide-react';
import { appname, navbarlinks } from './Navbar';
import Hero from './Hero';
import Box from './Box';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070D1D] text-white font-['Poppins'] relative overflow-hidden flex flex-col items-center">
      
      {/* NAVBAR */}
      <nav className="w-full max-w-7xl px-8 py-6 flex items-center justify-between z-20 mx-auto">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-wide text-white">
            {appname.name}
          </span>
        </div>

        {/* Navigation Links */}
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
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Team Nibras
          </span>
        </div>
      </nav>

      {/* Hero and Box Sections */}
      <Hero />
      <Box />

    </main>
  );
}