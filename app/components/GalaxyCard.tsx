import React from 'react';

interface GalaxyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'glass';
  className?: string;
  glow?: boolean;
}

export const GalaxyCard: React.FC<GalaxyCardProps> = ({
  children,
  variant = 'default',
  className = '',
  glow = false,
  ...props
}) => {
  const baseClasses =
    'relative rounded-2xl transition-all duration-300 backdrop-blur-xl';

  const variantClasses = {
    default:
      'bg-[#13172e]/85 border border-[#23294a] hover:border-[#3b4371] shadow-2xl shadow-black/40',
    gold:
      'bg-[#13172e]/90 border border-amber-500/40 shadow-lg shadow-amber-500/5',
    glass:
      'bg-white/[0.03] border border-white/10 hover:border-white/20 shadow-xl',
  };

  const glowEffect = glow ? 'ring-1 ring-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${glowEffect} ${className}`}
      {...props}
    >
      {/* Top subtle highlight reflection */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};