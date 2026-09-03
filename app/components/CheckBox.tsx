import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: React.ReactNode;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  error,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={id}
        className={`inline-flex items-start gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-gray-300 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'
        } ${className}`}
      >
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`w-4 h-4 rounded-md border transition-all duration-200 flex items-center justify-center
              ${
                checked
                  ? 'bg-cyan-400 border-cyan-400 text-[#070D1D] shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                  : 'border-[#303862] bg-[#0d122b] hover:border-[#4c578f]'
              }
              ${error ? 'border-red-500' : ''}
            `}
          >
            {checked && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>
        <span className="leading-tight">{label}</span>
      </label>
      {error && <p className="text-xs text-red-400 ml-6">{error}</p>}
    </div>
  );
};