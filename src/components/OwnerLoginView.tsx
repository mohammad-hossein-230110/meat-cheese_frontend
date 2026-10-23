import React, { useState } from 'react';
import { Shield, BadgeCheck, Eye, EyeOff, Fingerprint, Lock, ArrowLeft, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const OwnerLoginView: React.FC = () => {
  const { setIsLoggedIn, setCurrentView, setUserRole } = useApp();
  const [identifier, setIdentifier] = useState<string>('admin');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [secureToken, setSecureToken] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole('owner');
    setIsLoggedIn(true);
    setCurrentView('owner-orders');
  };

  const handleSwitchToBranchLogin = () => {
    setUserRole('branch');
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1C1B] flex flex-col justify-center items-center p-4 selection:bg-[#530201] selection:text-white" dir="rtl">
      <div className="flex flex-col w-full max-w-sm mx-auto py-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#530201] text-white flex items-center justify-center mb-3 shadow-xs">
            <Shield size={24} />
          </div>
          <BrandLogo variant="burgundy" size="md" />
          <span className="text-[11px] text-[#57423F] tracking-widest mt-1.5 font-medium">
            سامانه مدیریت مرکزی
          </span>
        </div>

        {/* Main Login Card */}
        <div className="bg-white border border-[#E8E6E3] rounded-xl p-6 shadow-2xs flex flex-col gap-5">
          {/* Title & Badge */}
          <div className="flex items-center justify-between">
            <h1 className="text-sm md:text-base font-bold text-[#1A1C1B]">ورود به پنل مدیریت</h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E9E8E6] text-[#57423F] font-medium font-mono">
              مدیر ارشد / HQ Admin
            </span>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 mt-1" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="flex flex-col gap-1.5 text-right">
              <label className="text-[11px] text-[#57423F] font-medium" htmlFor="admin-identifier">
                نام کاربری یا شماره همراه
              </label>
              <div className="relative flex items-center bg-[#FAF9F7] border border-[#E8E6E3] rounded-lg px-3 py-2 transition-colors focus-within:bg-white focus-within:border-[#530201]">
                <input
                  id="admin-identifier"
                  type="text"
                  dir="rtl"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="مثال: admin یا 09123456789"
                  className="w-full bg-transparent text-[#1A1C1B] text-xs placeholder:text-[#8D8D8D] outline-none"
                  required
                />
                <BadgeCheck size={18} className="text-[#8A716E] mr-2 shrink-0" />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5 text-right">
              <label className="text-[11px] text-[#57423F] font-medium" htmlFor="admin-password">
                رمز عبور
              </label>
              <div className="relative flex items-center bg-[#FAF9F7] border border-[#E8E6E3] rounded-lg px-3 py-2 transition-colors focus-within:bg-white focus-within:border-[#530201]">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent text-[#1A1C1B] text-xs placeholder:text-[#8D8D8D] outline-none text-left font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#8A716E] hover:text-[#1A1C1B] transition-colors p-1 flex items-center justify-center shrink-0"
                  aria-label="نمایش یا پنهان‌سازی رمز عبور"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Security Option: Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="remember-token"
                  checked={secureToken}
                  onChange={(e) => setSecureToken(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#E8E6E3] text-[#530201] focus:ring-[#530201]"
                />
                <span className="text-[11px] text-[#57423F]">ورود ایمن با توکن امنیتی</span>
              </label>
              <div className="flex items-center text-[#57423F] gap-1 text-[10px]">
                <Fingerprint size={14} className="text-[#8A716E]" />
                <span className="font-mono">Hardware MFA</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="submit-login"
              type="submit"
              className="w-full h-10 mt-1 bg-[#530201] hover:bg-[#2C0000] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-2xs"
            >
              <span>ورود به پنل مرکزی</span>
              <ArrowLeft size={16} />
            </button>
          </form>

          {/* Switch to Branch Login */}
          <div className="pt-2 border-t border-[#F1EFEC] text-center">
            <button
              onClick={handleSwitchToBranchLogin}
              className="text-[11px] text-[#530201] hover:underline flex items-center justify-center gap-1.5 mx-auto font-medium"
            >
              <Building2 size={13} />
              <span>ورود به عنوان مدیر شعبه (فرمانیه)</span>
            </button>
          </div>
        </div>

        {/* Institutional Footer Protocol */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-[#777777] text-[10px] font-mono">
          <Lock size={12} />
          <span>پروتکل رمزنگاری اختصاصی TLS 1.3 / 256 بیتی</span>
        </div>
      </div>
    </div>
  );
};
