import React from 'react';

interface BrandPatternProps {
  className?: string;
  variant?: 'overlay' | 'ribbon' | 'watermark' | 'card-border';
  opacity?: number;
  invert?: boolean;
}

export const BrandPattern: React.FC<BrandPatternProps> = ({
  className = '',
  variant = 'overlay',
  opacity = 0.08,
  invert = true, // true for white pattern on dark backgrounds
}) => {
  if (variant === 'ribbon') {
    return (
      <div className={`w-full overflow-hidden py-1 flex items-center justify-center select-none ${className}`}>
        <img
          src="/assets/aistudio/MEAT_AND_CHEESE_pattern_1d139ae3.png"
          alt="Brand Identity Pattern"
          className={`h-6 w-auto max-w-none object-repeat opacity-40 ${invert ? 'brightness-0 invert' : 'brightness-0'}`}
        />
      </div>
    );
  }

  if (variant === 'watermark') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
        style={{ opacity }}
      >
        <div
          className={`w-full h-full ${invert ? 'brightness-0 invert' : 'brightness-0'}`}
          style={{
            backgroundImage: `url('/assets/aistudio/MEAT_AND_CHEESE_pattern_1d139ae3.png')`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
            backgroundSize: 'auto 60px',
          }}
        />
      </div>
    );
  }

  // Default overlay for banners and panels
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <div
        className={`w-full h-full ${invert ? 'brightness-0 invert' : 'brightness-0'}`}
        style={{
          backgroundImage: `url('/assets/aistudio/MEAT_AND_CHEESE_pattern_1d139ae3.png')`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundSize: '240px auto',
        }}
      />
    </div>
  );
};
