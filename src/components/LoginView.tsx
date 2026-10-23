import React, { useState } from 'react';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { BrandPattern } from './BrandPattern';

export const LoginView: React.FC = () => {
  const { setIsLoggedIn, setCurrentView } = useApp();
  const [branchCode, setBranchCode] = useState<string>('104');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-3 sm:p-5 select-none" dir="rtl">
      {/* Container - Minimal & Modern Split Card */}
      <div className="w-full max-w-3xl bg-white border border-[#E8E6E3] rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Right Side in RTL (Burgundy Showcase) */}
        <div className="relative bg-[#2C0000] text-white p-6 md:p-8 flex flex-col justify-between overflow-hidden order-1 md:order-2">
          <BrandPattern variant="overlay" opacity={0.08} invert />

          {/* Top text */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-[#E4C8B5] tracking-wider font-mono">
            <span>B2B PORTAL · BRANCH ACCESS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Center Brand Identity */}
          <div className="relative z-10 my-8 text-center space-y-3">
            <BrandLogo variant="light" size="lg" />
            <div className="space-y-1 pt-1">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                سامانه اختصاصی تامین شعب
              </h2>
              <p className="text-[11px] text-white/70 font-light">
                پرتال متمرکز تدارکات پروتئین و اقلام مصرفی
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 text-[10px] text-white/50 border-t border-white/10 pt-3 flex items-center justify-between">
            <span>&</span>
            <span>پرتال زنجیره تامین مرکزی</span>
          </div>
        </div>

        {/* Left Side in RTL (Login Form) */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-white order-2 md:order-1 space-y-5">
          <div className="space-y-4">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-base sm:text-lg font-bold text-[#242424]">ورود به پنل شعبه</h1>
              <p className="text-[11px] text-[#777777]">
                برای دسترسی به سامانه تامین، کد شعبه را وارد نمایید.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Branch ID */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#242424] block">
                  شناسه شعبه یا شماره موبایل
                </label>
                <input
                  type="text"
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                  placeholder="مثال: 104 یا شماره ثبت‌شده"
                  className="w-full h-9 px-3 bg-white border border-[#E8E6E3] rounded text-xs text-[#242424] placeholder-[#777777] focus:outline-none focus:border-[#530201] transition-colors font-mono"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-[#242424]">رمز عبور</label>
                  <button
                    type="button"
                    className="text-[10px] text-[#777777] hover:text-[#530201] transition-colors"
                  >
                    فراموشی رمز
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور شعبه"
                    className="w-full h-9 pr-3 pl-8 bg-white border border-[#E8E6E3] rounded text-xs text-[#242424] placeholder-[#777777] focus:outline-none focus:border-[#530201] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-2.5 top-2.5 text-[#777777] hover:text-[#242424]"
                    aria-label="نمایش رمز"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-1.5 pt-0.5">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#E8E6E3] text-[#530201] focus:ring-[#530201]"
                />
                <label htmlFor="remember" className="text-[11px] text-[#777777] cursor-pointer">
                  مرا به خاطر بسپار
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-9 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>ورود به حساب کاربری شعبه</span>
                <ChevronLeft size={14} />
              </button>
            </form>
          </div>

          {/* Switch to Owner / HQ Admin */}
          <div className="pt-3 border-t border-[#FAF9F7] flex flex-col items-center gap-1.5 text-center text-[11px]">
            <button
              type="button"
              onClick={() => setCurrentView('owner-login')}
              className="text-[#530201] hover:underline font-semibold"
            >
              ورود به پنل مدیریت کل (مالک / HQ Admin) ←
            </button>
            <span className="text-[10px] text-[#777777]">
              پشتیبانی تأمین مرکزی: ۰۲۱-۲۲۰۰۱۱۲۲
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
