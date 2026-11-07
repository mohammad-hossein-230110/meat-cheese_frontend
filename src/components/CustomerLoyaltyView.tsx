import React, { useState } from 'react';
import { Award, Sparkles, Gift, Zap, Shield, ChevronLeft, ArrowRight, Check, Star, Trophy, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits, formatPersianPrice } from '../utils/formatters';

export const CustomerLoyaltyView: React.FC = () => {
  const { setCurrentView } = useApp();

  const [points, setPoints] = useState(780);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const tiers = [
    { name: 'سیلور (پایه)', minPoints: 0, current: false, color: 'text-stone-300' },
    { name: 'گلد (طلایی)', minPoints: 300, current: false, color: 'text-amber-400' },
    { name: 'پلاتینیوم (VIP)', minPoints: 600, current: true, color: 'text-[#ffb4ab]' },
    { name: 'دایموند (اختصاصی)', minPoints: 1200, current: false, color: 'text-cyan-300' },
  ];

  const rewards = [
    {
      id: 'rew-1',
      title: 'کوپن تخفیف ۵۰,۰۰۰ تومانی',
      costPoints: 200,
      description: 'قابل استفاده در کلیه سفارش‌های حضوری و اکسپرس بدون محدودیت حداقل سفارش',
      tag: 'تخفیف نقدی',
    },
    {
      id: 'rew-2',
      title: 'پیش‌غذای رایگان: سیب‌زمینی ترافل',
      costPoints: 350,
      description: 'یک پرس سیب‌زمینی طلایی با روغن ترافل سفید و پارمزان پودری به همراه سس سرآشپز',
      tag: 'هدیه خوراک',
    },
    {
      id: 'rew-3',
      title: 'ساندویچ پاسترامی رایگان',
      costPoints: 600,
      description: 'یک پرس ساندویچ پاسترامی نیویورکی دست‌ساز در نان خمیرترش داغ',
      tag: 'خوراک اصلی',
    },
    {
      id: 'rew-4',
      title: 'تخته گرند اپیکیورین VIP',
      costPoints: 1000,
      description: 'مجموعه دست‌چین ۵ مدل پنیر کهنه DOP و ۴ مدل کالباس آرتیزان کارگاهی',
      tag: 'پلاتین VIP',
    },
  ];

  const history = [
    { date: '۱۶ آبان ۱۴۰۳', event: 'سفارش آنلاین MC-2408', pointsChange: '+۱۰۰', type: 'earn' },
    { date: '۱۰ آبان ۱۴۰۳', event: 'سفارش حضوری سالن فرشته', pointsChange: '+۱۲۰', type: 'earn' },
    { date: '۲۵ مهر ۱۴۰۳', event: 'استفاده از کوپن تخفیف در تسویه', pointsChange: '-۲۰۰', type: 'redeem' },
    { date: '۱۵ مهر ۱۴۰۳', event: 'پاداش تبریک سالگرد عضویت VIP', pointsChange: '+۲۰۰', type: 'earn' },
  ];

  const handleRedeem = (id: string, cost: number) => {
    if (points >= cost) {
      setPoints((prev) => prev - cost);
      setSelectedReward(id);
      setTimeout(() => setSelectedReward(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#121010] text-[#f7f5f2] flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#1c1817]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shrink-0">
              M&amp;C
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-[#f7f5f2] truncate">باشگاه مشتریان</h1>
              <p className="text-[10px] text-[#a8a09b] truncate">امتیازها و جوایز همراهان رستوران</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setCurrentView('customer-profile')}
              className="text-[11px] sm:text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              پروفایل
            </button>
            <button
              onClick={() => setCurrentView('menu')}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-[#f7f5f2] bg-[#6b0d0c] px-2.5 sm:px-3 py-1.5 rounded-lg shadow-burgundy-glow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>منوی سفارش</span>
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 my-4 space-y-6">
        {/* Tier & Points Hero Card */}
        <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Burgundy radial backdrop glow */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#6b0d0c]/20 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-xs text-[#ffb4ab]">
                <Sparkles size={14} className="text-[#f77569]" />
                <span className="font-semibold">سطح فعال: عضو پلاتینیوم (VIP)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f7f5f2] tracking-tight">
                باشگاه مشتریان MEAT &amp; CHEESE
              </h2>
              <p className="text-xs text-[#a8a09b] max-w-md leading-relaxed">
                به ازای هر ۱۰,۰۰۰ تومان خرید، ۱ امتیاز طلایی کسب می‌کنید و می‌توانید امتیازها را به تخفیف نقدی و آیتم‌های منو تبدیل کنید.
              </p>
            </div>

            {/* Points Badge */}
            <div className="bg-[#241f1e] p-5 rounded-xl border border-[rgba(255,255,255,0.08)] text-center min-w-48 shadow-lg">
              <span className="text-[11px] text-[#a8a09b] block">امتیاز قابل استفاده شما:</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#ffb4ab] my-1">
                {toPersianDigits(points)}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                معادل {formatPersianPrice(78000)} تومان اعتبار خرید
              </span>
            </div>
          </div>

          {/* Tier Progress Bar */}
          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] space-y-2">
            <div className="flex justify-between text-xs text-[#a8a09b]">
              <span>پیشرفت تا سطح دایموند (Diamond):</span>
              <span className="text-[#ffb4ab] font-medium">{toPersianDigits(420)} امتیاز تا سطح بعدی</span>
            </div>
            <div className="w-full h-2.5 bg-[#121010] rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)]">
              <div className="h-full bg-gradient-to-r from-[#530201] via-[#6b0d0c] to-[#ffb4ab] rounded-full w-[65%]" />
            </div>

            <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-xs pt-1.5 text-center font-mono">
              {tiers.map((t, idx) => (
                <div key={idx} className={`${t.current ? 'font-bold text-[#ffb4ab]' : 'text-[#7d7570]'}`}>
                  <span className="font-sans block truncate px-0.5">{t.name}</span>
                  <span className="text-[10px] sm:text-xs text-[#a8a09b]">{toPersianDigits(t.minPoints)}+</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Redeemable Rewards Grid */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#f7f5f2] flex items-center gap-2">
              <Gift size={18} className="text-[#ffb4ab]" />
              <span>پاداش‌ها و جوایز قابل دریافت</span>
            </h3>
            <span className="text-xs text-[#a8a09b]">تبدیل فوری امتیاز به کوپن</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewards.map((rew) => {
              const canAfford = points >= rew.costPoints;
              const isRedeemed = selectedReward === rew.id;
              return (
                <div
                  key={rew.id}
                  className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-[rgba(255,255,255,0.16)] transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#ffb4ab] bg-[#241f1e] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
                        {rew.tag}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#f7f5f2]">
                        {rew.costPoints} امتیاز
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#f7f5f2] pt-1">{rew.title}</h4>
                    <p className="text-xs text-[#a8a09b] leading-relaxed">
                      {rew.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                    <span className="text-[11px] text-[#7d7570]">
                      {canAfford ? 'امتیاز کافی دارید' : 'کسری امتیاز'}
                    </span>

                    <button
                      disabled={!canAfford}
                      onClick={() => handleRedeem(rew.id, rew.costPoints)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isRedeemed
                          ? 'bg-emerald-600 text-white'
                          : canAfford
                          ? 'bg-[#6b0d0c] hover:bg-[#85221c] text-white shadow-burgundy-glow cursor-pointer'
                          : 'bg-[#241f1e] text-[#7d7570] cursor-not-allowed border border-[rgba(255,255,255,0.04)]'
                      }`}
                    >
                      {isRedeemed ? 'کد هدیه صادر شد ✓' : 'دریافت جایزه'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Points History */}
        <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 space-y-3 shadow-lg">
          <h3 className="text-sm font-bold text-[#f7f5f2] pb-2 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
            <Clock size={16} className="text-[#a8a09b]" />
            <span>گردش و تاریخچه امتیازات شما</span>
          </h3>

          <div className="divide-y divide-[rgba(255,255,255,0.04)] text-xs">
            {history.map((row, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#f7f5f2]">{row.event}</div>
                  <span className="text-[10px] text-[#7d7570]">{row.date}</span>
                </div>
                <span
                  className={`font-mono font-bold text-xs ${
                    row.type === 'earn' ? 'text-emerald-400' : 'text-[#ffb4ab]'
                  }`}
                >
                  {row.pointsChange}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570]">
        MEAT &amp; CHEESE RESTAURANT · قوانین و امتیازات باشگاه وفاداری اعضای VIP © ۱۴۰۳
      </footer>
    </div>
  );
};
