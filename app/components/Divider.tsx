import React from 'react';

interface DividerProps {
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ label = 'or continue with', className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center my-5 w-full ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#23294a]" />
      </div>
      <div className="relative px-3 bg-[#13172e] text-[11px] uppercase tracking-wider text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
};