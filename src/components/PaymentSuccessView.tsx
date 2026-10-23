import React from 'react';
import { Check, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

export const PaymentSuccessView: React.FC = () => {
  const { setCurrentView, lastCreatedOrder, cartTotal, branch, clearCart } = useApp();

  const orderNumber = lastCreatedOrder?.orderNumber || 'MC-104-9920';
  const trackingCode = lastCreatedOrder?.trackingCode || 'TRK-98321045';
  const rrn = lastCreatedOrder?.rrn || '7284019245';
  const totalAmount = lastCreatedOrder?.totalAmount || (cartTotal > 0 ? cartTotal : 214746350);

  const handleGoToDashboard = () => {
    clearCart();
    setCurrentView('dashboard');
  };

  const handleGoToInvoice = () => {
    clearCart();
    setCurrentView('checkout');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 space-y-4">
      {/* Brand logo at top */}
      <BrandLogo variant="burgundy" size="sm" />

      {/* Main Success Receipt Card */}
      <div className="w-full max-w-md bg-white border border-[#E8E6E3] rounded-lg p-5 sm:p-6 shadow-2xs space-y-4 text-center">
        {/* Status Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <Check size={24} strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-base sm:text-lg font-bold text-[#242424]">
            پرداخت با موفقیت انجام شد
          </h1>
          <p className="text-xs text-[#777777]">
            سفارش {branch.name} ثبت و جهت بارگیری به واحد انبار ارسال شد.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-[#FAF9F7] border border-[#E8E6E3] rounded p-3.5 space-y-2 text-xs text-right">
          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">شماره سفارش:</span>
            <span className="font-mono font-bold text-[#242424]">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">کد پیگیری شاپرک:</span>
            <span className="font-mono text-[#242424] text-[11px]">{trackingCode}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#777777] text-[11px]">کد مرجع بانکی (RRN):</span>
            <span className="font-mono text-[#242424] text-[11px]">{rrn}</span>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-[#E8E6E3]">
            <span className="text-[#777777] text-[11px]">مبلغ پرداخت‌شده:</span>
            <span className="font-mono font-bold text-xs text-[#242424]">
              {formatPrice(totalAmount)} تومان
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#777777]">زمان ثبت:</span>
            <span className="font-mono text-[#242424]">22 آبان 1403 — 11:24</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleGoToDashboard}
            className="w-full h-9 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>بازگشت به داشبورد</span>
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={handleGoToInvoice}
            className="w-full h-8 border border-[#E8E6E3] hover:bg-[#FAF9F7] text-[#242424] rounded text-[11px] font-medium transition-colors"
          >
            مشاهده پیش‌فاکتور رسمی
          </button>
        </div>
      </div>
    </div>
  );
};
