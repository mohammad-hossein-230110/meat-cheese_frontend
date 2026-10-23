import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'burgundy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'light', // 'light' means white logo for dark background
  size = 'md',
  showSubtitle = false,
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-9',
    lg: 'h-13',
    xl: 'h-20',
  };

  const filterClass =
    variant === 'light'
      ? 'brightness-0 invert' // pure white for dark burgundy backgrounds
      : variant === 'burgundy'
      ? 'filter invert-[10%] sepia-[90%] saturate-[5000%] hue-rotate-[340deg]'
      : 'brightness-0 opacity-90'; // dark carbon for light backgrounds

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <img
        src="/assets/aistudio/logo-without-back_758837d1.png"
        alt="برند زنجیره تأمین"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 ${filterClass}`}
        onError={(e) => {
          // Resilient fallback
          e.currentTarget.style.display = 'none';
        }}
      />
      {showSubtitle && (
        <span
          className={`text-[11px] tracking-wider mt-1.5 font-medium ${
            variant === 'light' ? 'text-white/70' : 'text-[#777777]'
          }`}
        >
          سامانه تدارکات و تأمین شعب
        </span>
      )}
    </div>
  );
};
