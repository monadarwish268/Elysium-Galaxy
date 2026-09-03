import React from 'react';
import { Check, X } from 'lucide-react';
import { PasswordStrength } from '@/types';

interface PasswordStrengthMeterProps {
  password: string;
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  const requirements = [
    {
      id: 'length',
      label: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'At least 1 uppercase letter (A-Z)',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'number',
      label: 'At least 1 number (0-9)',
      met: /[0-9]/.test(password),
    },
    {
      id: 'special',
      label: 'At least 1 special symbol (!@#$%^&*)',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const metCount = requirements.filter((r) => r.met).length;

  if (!password) {
    return {
      score: 0,
      label: 'Weak',
      color: 'bg-gray-600',
      requirements,
    };
  }

  if (metCount <= 1) {
    return {
      score: 1,
      label: 'Weak',
      color: 'bg-rose-500',
      requirements,
    };
  } else if (metCount === 2) {
    return {
      score: 2,
      label: 'Fair',
      color: 'bg-amber-400',
      requirements,
    };
  } else if (metCount === 3) {
    return {
      score: 3,
      label: 'Good',
      color: 'bg-cyan-400',
      requirements,
    };
  } else {
    return {
      score: 4,
      label: 'Strong',
      color: 'bg-emerald-400',
      requirements,
    };
  }
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  if (!password) return null;

  const strength = calculatePasswordStrength(password);

  return (
    <div id="password-strength-container" className="mt-2 space-y-2 text-xs">
      <div className="flex items-center justify-between text-gray-400">
        <span className="text-[11px]">Password strength:</span>
        <span
          className={`font-medium ${
            strength.score === 4
              ? 'text-emerald-400'
              : strength.score === 3
              ? 'text-cyan-300'
              : strength.score === 2
              ? 'text-amber-300'
              : 'text-rose-400'
          }`}
        >
          {strength.label}
        </span>
      </div>

      {/* Progress segments */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full rounded-full transition-all duration-300 ${
              step <= strength.score ? strength.color : 'bg-gray-800'
            }`}
          />
        ))}
      </div>

      {/* Requirements checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
        {strength.requirements.map((req) => (
          <div
            key={req.id}
            className={`flex items-center gap-1.5 text-[11px] transition-colors ${
              req.met ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {req.met ? (
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
            ) : (
              <X className="w-3 h-3 text-gray-600 shrink-0" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};