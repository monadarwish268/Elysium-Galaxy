import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const appname = {
  name: 'Elysium Galaxy',
};

export const navbarlinks = [
  { label: 'Welcome', href: '/HomePage' }, // يُفضل التوجيه للـ Root /
  { label: 'Galaxy', href: '/galaxy1' },
  { label: 'Premium', href: '/premium' },
];

export default function Navbar() {
  return (
    <header className="z-50 font-['Poppins']">
      <div className="w-full max-w-7xl px-8 py-8 flex items-center justify-between mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-3xl tracking-wide text-white">
            Elysium Galaxy
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-10 text-lg text-gray-300 font-light">
          {navbarlinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </header>
  );
}