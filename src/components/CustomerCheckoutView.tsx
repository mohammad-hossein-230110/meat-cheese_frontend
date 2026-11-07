import React, { useState } from 'react';
import { Lock, ArrowRight, ChevronLeft, CreditCard, Wallet, ShieldCheck, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits, formatPersianPrice } from '../utils/formatters';

export const CustomerCheckoutView: React.FC = () => {
  const { setCurrentView } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'wallet' | 'cash_pos'>('online');
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  // Financial values
  const itemsTotal = 975000;
  const deliveryFee = 45000;
  const packagingFee = 35000;
  const loyaltyDiscount = useLoyaltyPoints ? 50000 : 0;
  const couponDiscount = discountApplied ? 97500 : 0;
  const grandTotal = itemsTotal + deliveryFee + packagingFee - loyaltyDiscount - couponDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const handleFinalPayment = () => {
    // Navigate to order details & invoice screen
    setCurrentView('customer-invoice');
  };

  return (
    <div className="min-h-screen bg-[#121010] text-[#f7f5f2] flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#1c1817]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shrink-0">
              M&amp;C
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-[#f7f5f2] truncate">تسویه نهایی سفارش</h1>
              <p className="text-[10px] text-[#a8a09b] truncate">مرحله آخر پرداخت امن</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('customer-address')}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>بازگشت به آدرس</span>
            <ChevronLeft size={14} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 my-4 space-y-5">
        {/* Progress Stepper Bar */}
        <div className="flex items-center justify-between text-xs text-[#a8a09b] bg-[#1c1817] p-3 rounded-xl border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold font-mono">
              ✓
            </span>
            <span>سبد خرید</span>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.1)] flex-1 mx-3" />
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold font-mono">
              ✓
            </span>
            <span>آدرس تحویل</span>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.1)] flex-1 mx-3" />
          <div className="flex items-center gap-2 text-[#ffb4ab] font-bold">
            <span className="w-5 h-5 rounded-full bg-[#6b0d0c] text-white flex items-center justify-center text-[10px] font-bold font-mono">
              ۳
            </span>
            <span>تسویه و پرداخت</span>
          </div>
        </div>

        {/* Selected Address Recap */}
        <div className="p-4 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] text-[#ffb4ab] block font-semibold">آدرس تحویل منتخب:</span>
            <p className="text-xs text-[#f7f5f2] font-medium leading-relaxed">
              تهران، الهیه، خیابان فرشته (فیاضی)، خیابان مریم شرقی، پلاک ۲۴، واحد ۶
            </p>
            <span className="text-[11px] text-[#a8a09b] block pt-0.5 font-mono">تحویل‌گیرنده: علیرضا راد (۰۹۱۲۱۲۳۴۵۶۷)</span>
          </div>
          <button
            onClick={() => setCurrentView('customer-address')}
            className="self-start sm:self-center text-xs text-[#ffb4ab] hover:underline shrink-0 bg-[#241f1e] px-2.5 py-1.5 rounded border border-[rgba(255,255,255,0.06)]"
          >
            تغییر آدرس
          </button>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 space-y-3.5">
          <h2 className="text-sm font-bold text-[#f7f5f2]">روش پرداخت</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Online Gateway */}
            <div
              onClick={() => setPaymentMethod('online')}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                paymentMethod === 'online'
                  ? 'bg-[#241f1e] border-[#6b0d0c] shadow-burgundy-glow'
                  : 'bg-[#241f1e]/40 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <CreditCard size={16} className={paymentMethod === 'online' ? 'text-[#ffb4ab]' : 'text-[#a8a09b]'} />
                <span className="text-xs font-bold text-[#f7f5f2]">درگاه آنلاین شتاب</span>
              </div>
              <p className="text-[11px] text-[#a8a09b] leading-tight">
                سامان، ملت، پاسارگاد با تمامی کارت‌های بانکی
              </p>
            </div>

            {/* Wallet */}
            <div
              onClick={() => setPaymentMethod('wallet')}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                paymentMethod === 'wallet'
                  ? 'bg-[#241f1e] border-[#6b0d0c] shadow-burgundy-glow'
                  : 'bg-[#241f1e]/40 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Wallet size={16} className={paymentMethod === 'wallet' ? 'text-[#ffb4ab]' : 'text-[#a8a09b]'} />
                <span className="text-xs font-bold text-[#f7f5f2]">کیف پول اعضا</span>
              </div>
              <p className="text-[11px] text-[#a8a09b] leading-tight font-mono">
                موجودی: ۱,۲۰۰,۰۰۰ تومان
              </p>
            </div>

            {/* Cash/Card on Delivery */}
            <div
              onClick={() => setPaymentMethod('cash_pos')}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                paymentMethod === 'cash_pos'
                  ? 'bg-[#241f1e] border-[#6b0d0c] shadow-burgundy-glow'
                  : 'bg-[#241f1e]/40 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck size={16} className={paymentMethod === 'cash_pos' ? 'text-[#ffb4ab]' : 'text-[#a8a09b]'} />
                <span className="text-xs font-bold text-[#f7f5f2]">کارتخوان در محل</span>
              </div>
              <p className="text-[11px] text-[#a8a09b] leading-tight">
                پرداخت به پیک همراه دستگاه پوز بیسیم
              </p>
            </div>
          </div>
        </div>

        {/* Loyalty Points & Discount Coupon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Loyalty points toggle */}
          <div className="p-4 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffb4ab]">
                <Sparkles size={14} />
                <span>باشگاه وفاداری M&amp;C</span>
              </div>
              <p className="text-[11px] text-[#a8a09b]">
                استفاده از ۵۰,۰۰۰ تومان اعتبار تخفیف
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUseLoyaltyPoints(!useLoyaltyPoints)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                useLoyaltyPoints
                  ? 'bg-[#6b0d0c] border-[#6b0d0c] text-white'
                  : 'bg-[#241f1e] border-[rgba(255,255,255,0.1)] text-[#a8a09b]'
              }`}
            >
              {useLoyaltyPoints ? 'اعمال شد ✓' : 'اعمال تخفیف'}
            </button>
          </div>

          {/* Coupon Input */}
          <form onSubmit={handleApplyCoupon} className="p-4 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] flex items-center gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="کد تخفیف (مثال: GOURMET10)"
              className="flex-1 h-9 px-3 rounded-lg bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-xs text-[#f7f5f2] placeholder-[#7d7570] focus:outline-none focus:border-[#6b0d0c] uppercase font-mono"
            />
            <button
              type="submit"
              className="h-9 px-3.5 rounded-lg bg-[#241f1e] hover:bg-[#2c2929] border border-[rgba(255,255,255,0.1)] text-xs text-[#f7f5f2] font-semibold"
            >
              {discountApplied ? 'ثبت شد ✓' : 'ثبت'}
            </button>
          </form>
        </div>

        {/* Invoice Summary Box */}
        <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-[#f7f5f2] pb-2 border-b border-[rgba(255,255,255,0.06)]">
            صورت‌حساب نهایی
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#a8a09b]">
              <span>مبلغ کل سفارش:</span>
              <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(itemsTotal)} تومان</span>
            </div>
            <div className="flex justify-between text-[#a8a09b]">
              <span>هزینه بسته‌بندی آرتیزان:</span>
              <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(packagingFee)} تومان</span>
            </div>
            <div className="flex justify-between text-[#a8a09b]">
              <span>هزینه پیک اکسپرس:</span>
              <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(deliveryFee)} تومان</span>
            </div>
            {useLoyaltyPoints && (
              <div className="flex justify-between text-emerald-400">
                <span>تخفیف اعتبار باشگاه وفاداری:</span>
                <span>- {formatPersianPrice(loyaltyDiscount)} تومان</span>
              </div>
            )}
            {discountApplied && (
              <div className="flex justify-between text-emerald-400">
                <span>تخفیف کد هدیه (۱۰٪):</span>
                <span>- {formatPersianPrice(couponDiscount)} تومان</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-baseline justify-between">
            <span className="text-sm font-bold text-[#f7f5f2]">مبلغ نهایی قابل پرداخت:</span>
            <div className="text-left">
              <span className="text-xl font-bold text-[#ffb4ab]">
                {formatPersianPrice(grandTotal)}
              </span>
              <span className="text-[11px] text-[#a8a09b] mr-1">تومان</span>
            </div>
          </div>

          {/* Submit Checkout */}
          <div className="pt-2">
            <button
              onClick={handleFinalPayment}
              className="w-full h-12 bg-[#6b0d0c] hover:bg-[#85221c] text-white rounded-lg text-xs font-bold shadow-burgundy-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Lock size={16} />
              <span>پرداخت نهایی و ثبت سفارش ({formatPersianPrice(grandTotal)} تومان)</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570]">
        MEAT &amp; CHEESE · اتصال مستقیم به درگاه پرداخت شاپرک با پروتکل رمزنگاری TLS 1.3 © ۱۴۰۳
      </footer>
    </div>
  );
};
