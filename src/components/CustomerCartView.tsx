import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, MapPin, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTISAN_MENU_ITEMS } from '../data/menuData';
import { toPersianDigits, formatPersianPrice } from '../utils/formatters';

export const CustomerCartView: React.FC = () => {
  const { setCurrentView } = useApp();

  // User cart state
  const [cartList, setCartList] = useState([
    {
      item: ARTISAN_MENU_ITEMS[0], // Smash burger 245,000
      quantity: 2,
    },
    {
      item: ARTISAN_MENU_ITEMS[3], // Pastrami 290,000
      quantity: 1,
    },
    {
      item: ARTISAN_MENU_ITEMS[6], // Caesar salad 195,000
      quantity: 1,
    },
  ]);


  const updateQuantity = (itemId: string, delta: number) => {
    setCartList((prev) =>
      prev
        .map((entry) => {
          if (entry.item.id === itemId) {
            const newQty = entry.quantity + delta;
            return newQty > 0 ? { ...entry, quantity: newQty } : null;
          }
          return entry;
        })
        .filter(Boolean) as typeof cartList
    );
  };

  const removeItem = (itemId: string) => {
    setCartList((prev) => prev.filter((entry) => entry.item.id !== itemId));
  };

  const subtotal = cartList.reduce((acc, row) => acc + row.item.price * row.quantity, 0);
  const packagingFee = subtotal > 0 ? 35000 : 0;
  const deliveryFee = subtotal > 0 ? 45000 : 0;
  const grandTotal = subtotal + packagingFee + deliveryFee;

  return (
    <div className="min-h-screen bg-[#121010] text-[#f7f5f2] flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white" dir="rtl">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#1c1817]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shrink-0">
              M&amp;C
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-[#f7f5f2] truncate">سبد خرید من</h1>
              <p className="text-[10px] text-[#a8a09b] truncate">رستوران MEAT &amp; CHEESE</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('menu')}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>افزودن خوراک بیشتر</span>
            <ChevronLeft size={14} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 my-4">
        {cartList.length === 0 ? (
          <div className="rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#241f1e] text-[#a8a09b] flex items-center justify-center mx-auto">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-base font-bold text-[#f7f5f2]">سبد خرید شما در حال حاضر خالی است</h2>
            <p className="text-xs text-[#a8a09b]">
              جهت انتخاب برگرهای دست‌ساز، ساندویچ‌های آرتیزان و کات‌های استیک به منو مراجعه کنید.
            </p>
            <button
              onClick={() => setCurrentView('menu')}
              className="px-5 py-2.5 rounded-lg bg-[#6b0d0c] hover:bg-[#85221c] text-white text-xs font-semibold shadow-burgundy-glow transition-all"
            >
              مشاهده منوی رستوران
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Items List */}
              <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl divide-y divide-[rgba(255,255,255,0.06)] overflow-hidden shadow-lg">
                {cartList.map(({ item, quantity }) => (
                  <div key={item.id} className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-[rgba(255,255,255,0.1)] shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#f7f5f2] truncate">{toPersianDigits(item.name)}</h3>
                        <p className="text-xs font-semibold text-[#f7f5f2]">
                          {formatPersianPrice(item.price)} <span className="text-[10px] font-normal text-[#a8a09b]">تومان</span>
                        </p>
                        <span className="inline-block text-[10px] text-[#ffb4ab] bg-[#241f1e] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
                          {item.badgeLabel || 'دست‌پخت آرتیزان'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-[rgba(255,255,255,0.04)] sm:border-0">
                      {/* Stepper */}
                      <div className="flex items-center h-8 bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg px-1 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-full flex items-center justify-center text-[#f7f5f2] hover:text-[#ffb4ab]"
                          title="افزایش"
                        >
                          <Plus size={14} />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-[#f7f5f2]">
                          {toPersianDigits(quantity)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-full flex items-center justify-center text-[#a8a09b] hover:text-[#f7f5f2]"
                          title="کاهش"
                        >
                          <Minus size={14} />
                        </button>
                      </div>

                      {/* Row price */}
                      <div className="text-left font-bold text-xs sm:text-sm text-[#f7f5f2] min-w-20">
                        {formatPersianPrice(item.price * quantity)}{' '}
                        <span className="text-[10px] font-normal text-[#a8a09b]">تومان</span>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#7d7570] hover:text-[#ffb4ab] p-1.5 transition-colors shrink-0"
                        title="حذف خوراک"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Column (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 space-y-4 sticky top-20 shadow-xl">
                <h2 className="text-sm font-bold text-[#f7f5f2] pb-2 border-b border-[rgba(255,255,255,0.06)]">
                  خلاصه فاکتور سفارش
                </h2>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#a8a09b]">
                    <span>جمع اقلام ({toPersianDigits(cartList.length)} نوع غذا):</span>
                    <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(subtotal)} تومان</span>
                  </div>

                  <div className="flex items-center justify-between text-[#a8a09b]">
                    <span>هزینه بسته‌بندی:</span>
                    <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(packagingFee)} تومان</span>
                  </div>

                  <div className="flex items-center justify-between text-[#a8a09b]">
                    <span>هزینه پیک اکسپرس:</span>
                    <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(deliveryFee)} تومان</span>
                  </div>

                  <div className="flex items-center justify-between text-[#a8a09b]">
                    <span>امتیاز باشگاه مشتریان:</span>
                    <span className="text-[#ffb4ab] font-medium">+۴۸ امتیاز</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(255,255,255,0.08)] flex items-baseline justify-between">
                  <span className="text-xs font-bold text-[#f7f5f2]">مبلغ نهایی:</span>
                  <div className="text-left">
                    <span className="text-lg font-bold text-[#ffb4ab]">
                      {formatPersianPrice(grandTotal)}
                    </span>
                    <span className="text-[10px] text-[#a8a09b] mr-1">تومان</span>
                  </div>
                </div>

                {/* Next Step CTA */}
                <button
                  onClick={() => setCurrentView('customer-address')}
                  className="w-full h-11 bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2] rounded-lg text-xs font-semibold shadow-burgundy-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>انتخاب آدرس و ادامه تسویه</span>
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570]">
        MEAT &amp; CHEESE · پشتیبانی سفارشات: ۰۲۱-۲۲۰۰۴۵۸۰ © ۱۴۰۳
      </footer>
    </div>
  );
};
