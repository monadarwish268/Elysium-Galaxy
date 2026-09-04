import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      error,
      helperText,
      leadingIcon,
      containerClassName = '',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={`flex flex-col space-y-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id}
            id={`${id}-label`}
            className="text-xs font-medium text-gray-300 flex items-center justify-between"
          >
            <span>{label}</span>
          </label>
        )}

        <div className="relative flex items-center">
          {leadingIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
              {leadingIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={computedType}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            className={`w-full rounded-xl bg-[#0d122b]/90 border text-sm text-white placeholder-gray-500 
              transition-all duration-200 outline-none
              ${leadingIcon ? 'pl-10' : 'pl-3.5'}
              ${isPassword ? 'pr-11' : 'pr-3.5'}
              py-3
              ${
                error
                  ? 'border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-500/20 bg-red-950/10'
                  : 'border-[#23294a] hover:border-[#353d6b] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              id={`${id}-toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 p-1 rounded-lg text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-cyan-400" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {error ? (
          <p
            id={`${id}-error`}
            className="text-xs text-red-400 flex items-center gap-1 mt-1 animate-fadeIn"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="text-xs text-gray-400 mt-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';