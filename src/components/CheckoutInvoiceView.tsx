import React from 'react';
import { Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/mockData';

export const CheckoutInvoiceView: React.FC = () => {
  const {
    cartItems,
    cartSubtotal,
    cartTax,
    cartTotal,
    handlePlaceOrder,
    setCurrentView,
    branch,
  } = useApp();

  const invoiceSubtotal = cartSubtotal > 0 ? cartSubtotal : 196700000;
  const invoiceTax = cartTax > 0 ? cartTax : 17703000;
  const invoiceTotal = cartTotal > 0 ? cartTotal : 214746350;

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-20 md:pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-[#777777]">
        <span>تدارکات</span>
        <ChevronLeft size={12} className="text-[#8a716e]" />
        <span>سبد خرید</span>
        <ChevronLeft size={12} className="text-[#8a716e]" />
        <span className="text-[#242424] font-medium">تسویه نهایی</span>
      </div>

      {/* Invoice Card */}
      <div className="bg-white border border-[#E8E6E3] rounded-md shadow-2xs overflow-hidden">
        <div className="h-1 bg-[#530201] w-full" />

        <div className="p-5 md:p-6 space-y-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E8E6E3] pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-medium text-[#777777] bg-[#FAF9F7] px-2 py-0.5 rounded border border-[#E8E6E3]">
                پیش‌فاکتور رسمی تأمین
              </span>
              <h1 className="text-base md:text-lg font-bold text-[#242424]">
                فاکتور تسویه حساب
              </h1>
              <p className="text-[11px] text-[#777777]">
                {branch.name} (کد {branch.code}) — انبار مرکزی
              </p>
            </div>

            <div className="text-left bg-[#FAF9F7] border border-[#E8E6E3] rounded p-2 text-xs space-y-0.5 sm:min-w-36">
              <div className="flex items-center justify-between text-[#777777] text-[11px]">
                <span>شناسه:</span>
                <span className="font-mono font-bold text-[#242424]">PO-8842-TX</span>
              </div>
              <div className="flex items-center justify-between text-[#777777] text-[11px]">
                <span>تاریخ:</span>
                <span className="font-mono text-[#242424]">22 آبان 1403</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#777777]">
              <span className="font-semibold text-[#242424]">اقلام سفارش</span>
              <span className="font-mono">{cartItems.length > 0 ? cartItems.length : 5} قلم کالا</span>
            </div>

            <div className="divide-y divide-[#E8E6E3] border-t border-b border-[#E8E6E3]">
              {cartItems.length > 0 ? (
                cartItems.map((item) => {
                  const rowTotal = item.product.id === 'prod-1' ? 185000 * 50 * item.quantity : item.product.unitPrice * item.quantity;
                  return (
                    <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="font-medium text-[#242424]">{item.product.name}</div>
                        <div className="text-[10px] text-[#777777]">
                          <span className="font-mono">{item.quantity}</span> {item.product.unit}
                        </div>
                      </div>
                      <div className="text-left font-mono font-bold text-[#242424]">
                        {formatPrice(rowTotal)} <span className="font-sans text-[9px] font-normal text-[#777777]">تومان</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="py-2.5 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-medium text-[#242424]">گوشت برگر 140 گرمی</div>
                      <div className="text-[10px] text-[#777777]">30 کیلوگرم (بسته‌بندی وکیوم)</div>
                    </div>
                    <div className="text-left font-mono font-bold text-[#242424]">
                      73,500,000 <span className="font-sans text-[9px] font-normal text-[#777777]">تومان</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-medium text-[#242424]">پنیر چدار ورقی ورام</div>
                      <div className="text-[10px] text-[#777777]">1 حلقه کامل (وزن خالص 38.5 کیلو)</div>
                    </div>
                    <div className="text-left font-mono font-bold text-[#242424]">
                      53,900,000 <span className="font-sans text-[9px] font-normal text-[#777777]">تومان</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-[#FAF9F7] border border-[#E8E6E3] rounded p-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[#777777]">
              <span>جمع ارزش اقلام:</span>
              <span className="font-mono text-[#242424] font-medium">
                {formatPrice(invoiceSubtotal)} تومان
              </span>
            </div>

            <div className="flex items-center justify-between text-[#777777]">
              <span>مالیات ارزش افزوده (9٪):</span>
              <span className="font-mono text-[#242424] font-medium">
                {formatPrice(invoiceTax)} تومان
              </span>
            </div>

            <div className="flex items-center justify-between text-[#777777]">
              <span>کرایه ناوگان حمل زنجیره سرد (-18°C):</span>
              <span className="text-emerald-800 font-medium text-[11px]">
                رایگان (قرارداد زنجیره)
              </span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="pt-1 flex items-baseline justify-between border-t border-[#E8E6E3]">
            <div>
              <span className="text-xs font-bold text-[#242424]">مبلغ کل قابل پرداخت</span>
              <p className="text-[10px] text-[#777777]">شامل کلیه کسورات و حمل</p>
            </div>
            <div className="text-left">
              <span className="font-mono text-base md:text-lg font-black text-[#530201]">
                {formatPrice(invoiceTotal)}
              </span>
              <span className="text-[10px] text-[#777777] mr-1">تومان</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handlePlaceOrder}
              className="w-full h-10 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Lock size={14} />
              <span>پرداخت و اتصال به درگاه</span>
            </button>

            <button
              onClick={() => setCurrentView('cart')}
              className="w-full py-1.5 text-[11px] text-[#777777] hover:text-[#242424] flex items-center justify-center gap-1 transition-colors"
            >
              <span>بازگشت به سبد</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
