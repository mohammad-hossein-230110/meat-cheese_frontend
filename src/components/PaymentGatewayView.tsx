import React, { useEffect, useState } from 'react';
import { Lock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

export const PaymentGatewayView: React.FC = () => {
  const { setCurrentView, lastCreatedOrder, cartTotal, branch } = useApp();
  const [secondsLeft, setSecondsLeft] = useState<number>(5);
  const [autoRedirect, setAutoRedirect] = useState<boolean>(true);

  const orderNumber = lastCreatedOrder?.orderNumber || 'MC-104-9920';
  const totalAmount = lastCreatedOrder?.totalAmount || (cartTotal > 0 ? cartTotal : 214746350);

  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCurrentView('payment-success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, setCurrentView]);

  const handleSuccess = () => {
    setAutoRedirect(false);
    setCurrentView('payment-success');
  };

  const handleFailed = () => {
    setAutoRedirect(false);
    setCurrentView('payment-failed');
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-4">
      {/* Top Brand Logo */}
      <div className="mb-4">
        <BrandLogo variant="burgundy" size="sm" />
      </div>

      {/* Main Gateway Card */}
      <div className="w-full max-w-sm bg-white border border-[#E8E6E3] rounded-lg p-5 sm:p-6 shadow-2xs space-y-4 text-center">
        {/* Animated Loading Spinner */}
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full border-3 border-[#FAF9F7] border-t-[#530201] animate-spin" />
        </div>

        {/* Headline */}
        <div className="space-y-1">
          <h1 className="text-sm sm:text-base font-bold text-[#242424]">
            درگاه پرداخت شاپرک
          </h1>
          <p className="text-[11px] text-[#777777] leading-relaxed">
            انتقال خودکار تا <span className="font-mono font-bold text-[#530201]">{secondsLeft}</span> ثانیه دیگر... یا نتیجه پرداخت را انتخاب کنید:
          </p>
        </div>

        {/* Order Details Pod */}
        <div className="bg-[#FAF9F7] border border-[#E8E6E3] rounded p-3 space-y-1.5 text-xs text-right">
          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">شماره سفارش:</span>
            <span className="font-mono font-bold text-[#242424]">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">واحد متقاضی:</span>
            <span className="font-medium text-[#242424] text-[11px]">{branch.name}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#E8E6E3]">
            <span className="text-[#777777] text-[11px]">مبلغ تراکنش:</span>
            <span className="font-mono font-bold text-[#530201] text-xs">
              {formatPrice(totalAmount)} تومان
            </span>
          </div>
        </div>

        {/* 2 Distinct State Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleSuccess}
            className="w-full h-9 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <CheckCircle2 size={14} />
            <span>شبیه‌سازی پرداخت موفق</span>
          </button>

          <button
            onClick={handleFailed}
            className="w-full h-9 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <XCircle size={14} />
            <span>شبیه‌سازی پرداخت ناموفق (خطا)</span>
          </button>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#777777] pt-1 border-t border-[#FAF9F7]">
          <Lock size={12} className="text-[#530201]" />
          <span>اتصال رمزنگاری‌شده شاپرک (256-bit)</span>
        </div>

        <div>
          <button
            onClick={() => setCurrentView('cart')}
            className="text-[11px] text-[#777777] hover:text-[#242424] transition-colors"
          >
            انصراف و بازگشت به سبد خرید
          </button>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[#777777] text-center font-mono">
        SHAPARAK B2B GATEWAY // 2026
      </p>
    </div>
  );
};
