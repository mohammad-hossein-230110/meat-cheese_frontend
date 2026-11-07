import React, { useState } from 'react';
import { Phone, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomerAuthView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('09121234567');
  const [fullName, setFullName] = useState('علیرضا راد');
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(118);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // After login, navigate to profile or menu
    setCurrentView('customer-profile');
  };

  return (
    <div className="min-h-screen bg-[#121010] text-[#f7f5f2] flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white" dir="rtl">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#1c1817]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shadow-sm shrink-0">
              M&amp;C
            </div>
            <span className="font-serif-brand tracking-widest text-sm sm:text-base font-bold text-[#f7f5f2] truncate">
              MEAT &amp; CHEESE
            </span>
          </div>

          <button
            onClick={() => setCurrentView('menu')}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>بازگشت به منو</span>
            <ChevronLeft size={14} />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-md mx-auto w-full p-4 sm:p-6 flex flex-col justify-center my-6">
        <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
          {/* Subtle Top Red Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#530201] via-[#6b0d0c] to-[#ffb4ab]" />

          {/* Heading */}
          <div className="text-center space-y-1.5 pt-1">
            <span className="inline-block text-[11px] font-medium text-[#ffb4ab] tracking-wider uppercase bg-[#241f1e] border border-[rgba(255,255,255,0.08)] px-2.5 py-0.5 rounded-full">
              باشگاه اعضا و مشتریان
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#f7f5f2] tracking-tight">
              {step === 'otp'
                ? 'تأیید شماره موبایل'
                : authMode === 'login'
                ? 'ورود به حساب کاربری'
                : 'ثبت‌نام عضو جدید'}
            </h1>
            <p className="text-xs text-[#a8a09b] font-normal">
              {step === 'otp'
                ? `کد ۴ رقمی ارسال شده به شماره ${phoneNumber} را وارد کنید`
                : 'جهت سفارش اختصاصی، پیگیری فاکتور و امتیازات وفاداری'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Only in phone step) */}
          {step === 'phone' && (
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#121010] rounded-lg border border-[rgba(255,255,255,0.06)] text-xs font-medium">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-2 rounded-md transition-all ${
                  authMode === 'login'
                    ? 'bg-[#6b0d0c] text-[#f7f5f2] shadow-sm font-semibold'
                    : 'text-[#a8a09b] hover:text-[#f7f5f2]'
                }`}
              >
                ورود سریع
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`py-2 rounded-md transition-all ${
                  authMode === 'register'
                    ? 'bg-[#6b0d0c] text-[#f7f5f2] shadow-sm font-semibold'
                    : 'text-[#a8a09b] hover:text-[#f7f5f2]'
                }`}
              >
                ثبت‌نام اولیه
              </button>
            </div>
          )}

          {/* Form */}
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#a8a09b] block">
                    نام و نام خانوادگی
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: علیرضا راد"
                      required
                      className="w-full h-11 pr-10 pl-3 bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg text-xs text-[#f7f5f2] placeholder-[#7d7570] focus:outline-none focus:border-[#6b0d0c] transition-colors"
                    />
                    <User size={16} className="absolute right-3 top-3 text-[#7d7570]" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#a8a09b] block">
                  شماره تلفن همراه
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="09123456789"
                    required
                    dir="ltr"
                    className="w-full h-11 pr-10 pl-3 bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg text-xs text-[#f7f5f2] placeholder-[#7d7570] focus:outline-none focus:border-[#6b0d0c] transition-colors font-mono text-right"
                  />
                  <Phone size={16} className="absolute right-3 top-3 text-[#7d7570]" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2] rounded-lg text-xs font-semibold shadow-burgundy-glow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>دریافت کد تأیید یکبارمصرف</span>
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center justify-center gap-1 text-[11px] text-[#7d7570] pt-2">
                <ShieldCheck size={14} className="text-[#a8a09b]" />
                <span>ورود امن بدون نیاز به کلمه عبور پیچیده</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#a8a09b]">کد ۴ رقمی پیامک‌شده:</span>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-[#ffb4ab] hover:underline"
                  >
                    ویرایش شماره
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={5}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="• • • •"
                    autoFocus
                    required
                    dir="ltr"
                    className="w-full h-12 text-center tracking-[1em] bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg text-lg font-bold text-[#f7f5f2] focus:outline-none focus:border-[#6b0d0c] transition-colors font-mono"
                  />
                  <Lock size={16} className="absolute right-3 top-3.5 text-[#7d7570]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#7d7570] pt-1">
                  <span>ارسال مجدد کد پس از:</span>
                  <span className="font-mono text-[#ffb4ab]">۰۱:{countdown > 9 ? countdown : `0${countdown}`}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2] rounded-lg text-xs font-semibold shadow-burgundy-glow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>تأیید و ورود به پرتال</span>
                <CheckCircle2 size={16} />
              </button>
            </form>
          )}

          {/* Quick Shortcuts */}
          <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] text-center space-y-2 text-xs">
            <button
              onClick={() => setCurrentView('customer-profile')}
              className="text-[#a8a09b] hover:text-[#f7f5f2] hover:underline block mx-auto text-[11px]"
            >
              مشاهده پروفایل نمونه (بدون لاگین) ←
            </button>
            <button
              onClick={() => setCurrentView('customer-loyalty')}
              className="text-[#ffb4ab] hover:underline block mx-auto text-[11px] font-medium"
            >
              مشاهده امتیازات باشگاه M&amp;C Loyalty ←
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570]">
        MEAT &amp; CHEESE RESTAURANT © ۱۴۰۳ · کلیه حقوق محفوظ است
      </footer>
    </div>
  );
};
