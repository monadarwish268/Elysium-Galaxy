import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Stars, Orbit} from 'lucide-react';
import { GalaxyCard } from '@/components/GalaxyCard';
// import { Badge } from '@/components/Badge';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
// import { ForgotPasswordModal } from './ForgotPasswordModal';
import { AuthMode, User } from '@/types';

interface AuthContainerProps {
    mode: AuthMode;
    onSelectMode: (mode: AuthMode) => void;
    onAuthSuccess: (user: User) => void;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
    mode,
    onSelectMode,
    onAuthSuccess,
}) => {
    return (
        <div className="w-full max-w-md mx-auto relative z-10 px-4">
            {/* Decorative celestial halo behind the card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 via-cyan-500/30 to-indigo-600/20 blur-xl opacity-75 pointer-events-none" />

            <GalaxyCard variant="default" className="p-6 sm:p-8" glow>
             
                 <div className="text-center mb-6">
                    <div className="flex justify-center mb-3"></div> 

                    <h2
                        id="auth-card-title"
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 font-['Outfit',sans-serif]"
                    >
                        {mode === 'login' ? (
                            <>
                                Welcome Back, <span className="gradient-text">Traveler</span>
                            </>
                        ) : mode === 'signup' ? (
                            <>
                                Join the <span className="gradient-text">Elysium Galaxy</span>
                            </>
                        ) : (
                            <>
                                Account <span className="gradient-text">Recovery</span>
                            </>
                        )}
                    </h2>

                    <p id="auth-card-desc" className="text-xs sm:text-sm text-gray-400 font-light">
                        {mode === 'login'
                            ? 'Sign in to access your mood assessment and emotion planets.'
                            : mode === 'signup'
                                ? 'Create your traveler passport and begin your emotional journey.'
                                : 'Restore access to your cosmic wellness records.'}
                    </p>

                    {/* Mode Switcher Tabs (Only shown for login and signup) */}
                    {mode !== 'forgot-password' && (
                        <div className="mt-5 p-1 bg-[#0c1024] rounded-xl border border-[#23294a] grid grid-cols-2 gap-1">
                            <button
                                type="button"
                                id="tab-btn-login"
                                onClick={() => onSelectMode('login')}
                                className={`py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${mode === 'login'
                                        ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Sign In
                            </button>

                            <button
                                type="button"
                                id="tab-btn-signup"
                                onClick={() => onSelectMode('signup')}
                                className={`py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${mode === 'signup'
                                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Create Account
                            </button>
                        </div>
                    )}
                </div>

                {/* Animated Form Switch */}
                <AnimatePresence mode="wait">
                    {mode === 'login' && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <LoginForm
                                onSuccess={onAuthSuccess}
                                onSwitchToSignUp={() => onSelectMode('signup')}
                                onForgotPassword={() => onSelectMode('forgot-password')}
                            />
                        </motion.div>
                    )}

                    {mode === 'signup' && (
                        <motion.div
                            key="signup"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <SignUpForm
                                onSuccess={onAuthSuccess}
                                onSwitchToLogin={() => onSelectMode('login')}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Security watermark footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400/80" />
                    <span>256-Bit Encrypted &bull; Elysium Quantum Guard</span>
                </div>
            </GalaxyCard>
        </div>
    );
};