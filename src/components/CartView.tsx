import React from 'react';
import { Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/mockData';

export const CartView: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartTotal,
    cartUniqueCount,
    setCurrentView,
    branch,
  } = useApp();

  const getItemRowTotal = (item: typeof cartItems[0]) => {
    if (item.product.id === 'prod-1') {
      return 185000 * 50 * item.quantity;
    }
    return item.product.unitPrice * item.quantity;
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-14 text-center space-y-3 bg-white border border-[#E8E6E3] rounded-md max-w-md mx-auto my-6 p-6">
        <div className="w-12 h-12 rounded-full bg-[#FAF9F7] text-[#777777] mx-auto flex items-center justify-center">
          <ShoppingBag size={22} />
        </div>
        <h2 className="text-sm md:text-base font-bold text-[#242424]">
          سبد خرید شعبه {branch.name} خالی است
        </h2>
        <p className="text-[11px] text-[#777777]">
          برای ثبت سفارش روزانه می‌توانید اقلام مورد نیاز را از کاتالوگ اضافه نمایید.
        </p>
        <button
          onClick={() => setCurrentView('catalog')}
          className="mt-1 px-4 py-2 bg-[#530201] text-white rounded text-xs font-semibold hover:bg-[#400101] transition-colors"
        >
          مشاهده کاتالوگ
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-base md:text-lg font-bold text-[#242424]">
            سبد خرید شعبه
          </h1>
          <span className="px-2 py-0.5 bg-[#FAF9F7] border border-[#E8E6E3] text-[#777777] rounded text-[11px] font-mono">
            {cartUniqueCount} قلم کالا
          </span>
        </div>

        <p className="text-[11px] text-[#777777]">
          {branch.name} (کد {branch.code}) · {branch.deliveryShift}
        </p>
      </div>

      {/* Grid: Table (col-span-8) & Summary (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Table */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white border border-[#E8E6E3] rounded-md overflow-hidden">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 px-4 py-2.5 bg-[#FAF9F7] text-[11px] font-medium text-[#777777] border-b border-[#E8E6E3]">
              <div className="col-span-5">محصول</div>
              <div className="col-span-2 text-left">قیمت واحد</div>
              <div className="col-span-2 text-center">تعداد</div>
              <div className="col-span-3 text-left">مجموع (تومان)</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-[#E8E6E3]">
              {cartItems.map((item) => {
                const rowTotal = getItemRowTotal(item);
                return (
                  <div
                    key={item.product.id}
                    className="p-3 sm:px-4 sm:py-3 sm:grid sm:grid-cols-12 sm:items-center gap-2 space-y-2 sm:space-y-0 hover:bg-[#FAF9F7] transition-colors"
                  >
                    {/* Col 5: Product */}
                    <div className="sm:col-span-5 flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded object-cover border border-[#E8E6E3] shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="text-xs font-semibold text-[#242424] truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] text-[#777777] truncate">
                          {item.product.unit}
                        </p>
                      </div>
                    </div>

                    {/* Col 2: Unit Price */}
                    <div className="sm:col-span-2 text-right sm:text-left text-xs font-mono">
                      <span className="sm:hidden text-[10px] text-[#777777] ml-1">واحد:</span>
                      <span className="text-[#242424]">{formatPrice(item.product.unitPrice)}</span>
                    </div>

                    {/* Col 2: Stepper */}
                    <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                      <div className="flex items-center border border-[#E8E6E3] rounded bg-white h-7 px-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-5 h-full flex items-center justify-center text-[#530201] font-bold text-xs hover:bg-[#FAF9F7]"
                        >
                          +
                        </button>
                        <span className="w-6 text-center font-mono font-medium text-xs text-[#242424]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-5 h-full flex items-center justify-center text-[#530201] font-bold text-xs hover:bg-[#FAF9F7]"
                        >
                          -
                        </button>
                      </div>
                    </div>

                    {/* Col 3: Row Total */}
                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-2 text-xs">
                      <div className="font-mono font-bold text-[#242424]">
                        {formatPrice(rowTotal)}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#777777] hover:text-red-700 p-1 transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-[#FAF9F7] border-t border-[#E8E6E3] flex items-center justify-between text-xs">
              <button
                onClick={clearCart}
                className="text-[#777777] hover:text-red-700 flex items-center gap-1 transition-colors text-[11px]"
              >
                <Trash2 size={12} />
                <span>خالی کردن سبد</span>
              </button>

              <button
                onClick={() => setCurrentView('catalog')}
                className="text-[#530201] font-semibold hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>افزودن اقلام بیشتر</span>
                <ChevronLeft size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E8E6E3] rounded-md p-4 space-y-3.5 sticky top-16 shadow-2xs">
            <h2 className="text-xs font-bold text-[#242424] pb-2 border-b border-[#E8E6E3]">
              خلاصه صورت‌حساب
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#777777]">
                <span>جمع اقلام ({cartUniqueCount} قلم):</span>
                <span className="font-mono text-[#242424] font-medium">
                  {formatPrice(cartSubtotal)} تومان
                </span>
              </div>

              <div className="flex items-center justify-between text-[#777777]">
                <span>مالیات ارزش افزوده (9٪):</span>
                <span className="font-mono text-[#242424] font-medium">
                  {formatPrice(cartTax)} تومان
                </span>
              </div>

              <div className="flex items-center justify-between text-[#777777]">
                <span>کرایه حمل سردخانه:</span>
                <span className="text-emerald-700 font-medium">رایگان</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-[#E8E6E3] flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#242424]">مبلغ قابل پرداخت:</span>
              <div className="text-right">
                <span className="font-mono text-base font-black text-[#530201]">
                  {formatPrice(cartTotal)}
                </span>
                <span className="text-[10px] text-[#777777] mr-1">تومان</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-1 space-y-1.5">
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full h-9 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>ادامه و تسویه نهایی</span>
                <ChevronLeft size={14} />
              </button>
            </div>

            <div className="pt-2 border-t border-[#FAF9F7] text-center text-[10px] text-[#777777]">
              کسر از حساب اعتباری شعبه · مانده اعتبار کافی
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
