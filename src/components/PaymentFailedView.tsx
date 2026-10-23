import React from 'react';
import { XCircle, RefreshCw, ShoppingBag, ArrowRight, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

export const PaymentFailedView: React.FC = () => {
  const { setCurrentView, lastCreatedOrder, cartTotal, branch } = useApp();

  const orderNumber = lastCreatedOrder?.orderNumber || 'MC-104-9920';
  const totalAmount = lastCreatedOrder?.totalAmount || (cartTotal > 0 ? cartTotal : 214746350);

  const handleRetryPayment = () => {
    setCurrentView('checkout');
  };

  const handleGoToCart = () => {
    setCurrentView('cart');
  };

  const handleGoToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 space-y-4">
      {/* Brand logo */}
      <BrandLogo variant="burgundy" size="sm" />

      {/* Main Failed Receipt Card */}
      <div className="w-full max-w-md bg-white border border-[#E8E6E3] rounded-lg p-5 sm:p-6 shadow-2xs space-y-4 text-center">
        {/* Status Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
            <XCircle size={24} strokeWidth={2.5} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-base sm:text-lg font-bold text-[#242424]">
            تراکنش پرداخت ناموفق بود
          </h1>
          <p className="text-xs text-[#777777] leading-relaxed">
            عملیات پرداخت توسط کاربر لغو شد یا پاسخی از شبکه شاپرک دریافت نگردید.
          </p>
        </div>

        {/* Notice alert */}
        <div className="bg-amber-50/70 border border-amber-200/60 rounded p-2.5 text-right flex items-start gap-2 text-[11px] text-amber-900">
          <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            هیچ مبلغی از حساب بانکی شما کسر نشده است. در صورت کسر موقت، حداکثر تا 72 ساعت به حسابتان بازمی‌گردد.
          </p>
        </div>

        {/* Failed Transaction Details */}
        <div className="bg-[#FAF9F7] border border-[#E8E6E3] rounded p-3.5 space-y-2 text-xs text-right">
          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">شماره سفارش:</span>
            <span className="font-mono font-bold text-[#242424]">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">کد خطای بانکی:</span>
            <span className="font-mono text-red-700 font-bold text-[11px]">ERR-51 (تراکنش ناموفق)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">شعبه متقاضی:</span>
            <span className="font-medium text-[#242424] text-[11px]">{branch.name}</span>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-[#E8E6E3]">
            <span className="text-[#777777] text-[11px]">مبلغ سفارش:</span>
            <span className="font-mono font-bold text-xs text-[#242424]">
              {formatPrice(totalAmount)} تومان
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#777777]">زمان ثبت تلاش:</span>
            <span className="font-mono text-[#242424]">22 آبان 1403 — 11:25</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleRetryPayment}
            className="w-full h-9 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw size={13} />
            <span>تلاش مجدد برای پرداخت</span>
          </button>

          <button
            onClick={handleGoToCart}
            className="w-full h-8 border border-[#E8E6E3] hover:bg-[#FAF9F7] text-[#242424] rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag size={13} className="text-[#777777]" />
            <span>بازگشت و اصلاح سبد خرید</span>
          </button>

          <button
            onClick={handleGoToDashboard}
            className="w-full py-1 text-[11px] text-[#777777] hover:text-[#242424] transition-colors"
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>
    </div>
  );
};
