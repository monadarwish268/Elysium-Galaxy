import React from 'react';
import Link from 'next/link';

export const appname = {
  name: 'Elysium Galaxy',
};

export const navbarlinks = [
  { label: 'Welcome', href: '/welcome' },
  { label: 'Galaxy', href: '/galaxy' },
  { label: 'Premium', href: '/premium' },
];

export default function Navbar() {
  return (
    // تأكدي من وجود fixed top-0 left-0 w-full z-50
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/40 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* اللوجو والنجمة */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            ✨
          </div>
          <span className="font-bold text-lg text-white">Elysium Galaxy</span>
        </div>

        {/* الروابط */}
        <div className="flex items-center gap-6">
          {/* الروابط الخاصة بكِ */}
        </div>

      </div>
    </header>
  );
}