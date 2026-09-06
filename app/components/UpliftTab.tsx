'use client';

import React, { useState } from 'react';
import { Heart, Send, Sparkles, CheckCircle2, CreditCard, Lock, X } from 'lucide-react';
import { axiosPost, ApiError } from '@/lib/axios';

interface SubscriptionRecord {
  id: string;
  userId: string;
  planType: string;
  message: string;
  amount: number;
  paymentStatus: string;
  paidAt: string;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
}

export default function UpliftTab() {
  const [message, setMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Triggered when clicking "Beam Message"
  const handleInitiateSend = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!message.trim()) {
      setError('Please write a message before sending.');
      return;
    }
    setShowPaymentModal(true);
  };

  // Triggered after confirming the payment
  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const storedUser = localStorage.getItem('elysium_user') || localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) as { id?: string } : undefined;

      await axiosPost<
        { userId?: string; planType: string; message: string; amount: 1 },
        SubscriptionRecord
      >('subscriptions', {
        userId: user?.id,
        planType: 'UPLIFT_BEAM',
        message: message.trim(),
        amount: 1,
      });

      setShowPaymentModal(false);
      setIsSent(true);
      setMessage('');
      setTimeout(() => setIsSent(false), 3000);
    } catch (paymentError) {
      const details = paymentError instanceof ApiError && paymentError.data && typeof paymentError.data === 'object'
        ? paymentError.data as { errors?: Record<string, string[]> }
        : undefined;
      const validationMessage = details?.errors
        ? Object.values(details.errors).flat().join(' ')
        : paymentError instanceof Error ? paymentError.message : 'Could not save your message.';
      setError(validationMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Composer Form */}
      <div className="lg:col-span-2 bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-pink-500/10 rounded-2xl border border-pink-500/20 text-pink-400">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Post an Anonymous Kind Message</h2>
            <p className="text-xs text-slate-400">
              Send a warm note into the galaxy to brighten a strangers day.
            </p>
          </div>
        </div>

        <form onSubmit={handleInitiateSend} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., You're doing so much better than you think. Keep shining softly today! 💫"
            className="w-full h-32 bg-[#040817]/70 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            maxLength={250}
            disabled={isSent}
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {250 - message.length} characters left
            </span>

            <button
              type="submit"
              disabled={!message.trim() || isSent}
              className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              {isSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-300" /> Sent to the Galaxy!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Beam Message ($1.00)
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Side Info Box */}
      <div className="bg-[#0b132b]/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" /> How it works
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              A small $1.00 contribution prevents spam and supports the server mission.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              Your message lands randomly on another users galaxy view.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              100% anonymous — no names, profiles, or tracking.
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Required Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0b132b] border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Payment Required</h3>
              <p className="text-xs text-slate-400">
                Pay $1.00 to send your message to the cosmic galaxy feed.
              </p>
            </div>

            <div className="bg-[#040817]/60 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Item:</span>
                <span className="text-white font-medium">Anonymous Uplift Beam</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Due:</span>
                <span className="text-indigo-400 font-bold">$1.00 USD</span>
              </div>
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" /> Pay $1.00 & Beam
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}