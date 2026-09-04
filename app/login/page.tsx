'use client';
import { useState, useEffect } from 'react';
import { AuthContainer } from '@/components/AuthContainer';
import { User, AuthMode } from '@/types';


export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showHeroPreview, setShowHeroPreview] = useState<boolean>(false);

  // Load persisted user if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('elysium_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.email) {
          setCurrentUser(parsed);
        }
      }
    } catch {
      // Ignore parse error
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setShowHeroPreview(false);
  };
  return (
    <div className="min-h-screen galaxy-bg relative flex flex-col justify-between overflow-x-hidden bg-transparent">
      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-10 px-4">


        <div className="w-full flex flex-col items-center space-y-12">
          {/* Form Card */}
          <AuthContainer
            mode={authMode}
            onSelectMode={setAuthMode}
            onAuthSuccess={handleAuthSuccess}
          />

          {/* 3 Companion Features from Reference */}
          <div className="w-full max-w-5xl pt-4">
            <div className="text-center mb-6">
              <span className="text-xs font-semibold tracking-widest text-cyan-300/80 uppercase">
                The Elysium Galaxy Ecosystem
              </span>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif] mt-1">
                Explore Your Emotional Universe
              </h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}