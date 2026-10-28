import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartOrderItem } from '../../types/menu';

interface ArtisanCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartOrders: CartOrderItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

export const ArtisanCartModal: React.FC<ArtisanCartModalProps> = ({
  isOpen,
  onClose,
  cartOrders,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderSent, setOrderSent] = useState(false);
  const [diningMode, setDiningMode] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('میز ۴');
  const [orderNote, setOrderNote] = useState('');

  if (!isOpen) return null;

  const totalCount = cartOrders.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartOrders.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleCheckout = () => {
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md" dir="rtl">
      {/* Translucent backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Surface */}
      <div 
        className="relative w-full max-w-lg bg-[#181311]/95 border border-white/15 sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col z-10 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#530201] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">سبد سفارش رستوران</div>
              <div className="text-[11px] text-stone-400 font-light">
                {totalCount > 0 ? `${totalCount.toLocaleString('fa-IR')} آیتم انتخاب شده` : 'سبد خالی است'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {orderSent ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-white">سفارش شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                {diningMode === 'dine-in'
                  ? `سفارش برای ${tableNumber} ثبت و مستقیماً به آشپزخانه سرآشپز ارسال شد. آماده‌سازی تازه آغاز گردید.`
                  : 'سفارش بسته‌بندی بیرون‌بر شما در صف آماده‌سازی قرار گرفت و پس از آماده‌سازی به شما تحویل خواهد شد.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setOrderSent(false);
                    onClearCart();
                    onClose();
                  }}
                  className="h-11 px-6 rounded-xl bg-[#530201] hover:bg-[#6c0807] text-white text-xs font-semibold shadow-lg transition-all"
                >
                  تأیید و بازگشت به منو
                </button>
              </div>
            </div>
          ) : cartOrders.length === 0 ? (
            <div className="py-14 text-center text-stone-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-stone-600 mb-2" />
              <p className="text-sm font-medium text-white">سبد سفارش شما خالی است</p>
              <p className="text-xs text-stone-400">لطفاً آیتم‌های مد نظر خود را از منو انتخاب کنید.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Dining Mode selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/10 text-xs font-medium">
                <button
                  onClick={() => setDiningMode('dine-in')}
                  className={`py-2 rounded-lg transition-all ${
                    diningMode === 'dine-in' ? 'bg-[#530201] text-white shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  صرف در سالن ({tableNumber})
                </button>
                <button
                  onClick={() => setDiningMode('takeaway')}
                  className={`py-2 rounded-lg transition-all ${
                    diningMode === 'takeaway' ? 'bg-[#530201] text-white shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  بسته‌بندی بیرون‌بر
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {cartOrders.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          {item.formattedPrice} تومان
                        </div>
                        <div className="text-xs font-bold text-amber-200 mt-1">
                          {(item.price * quantity).toLocaleString('fa-IR')} تومان
                        </div>
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center h-8 bg-black/40 border border-white/10 rounded-lg px-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-white">
                        {quantity.toLocaleString('fa-IR')}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special notes */}
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">یادداشت برای سرآشپز (اختیاری):</label>
                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="مثال: کم‌نمک، بدون پیاز..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-hidden focus:border-[#530201]"
                />
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={onClearCart}
                  className="flex items-center gap-1 text-[11px] text-rose-400 hover:underline"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>خالی‌کردن سبد</span>
                </button>
              </div>

              {/* Price Calculation Box */}
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>جمع کل آیتم‌ها:</span>
                  <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>مالیات و خدمات:</span>
                  <span className="text-emerald-400">رایگان (پذیرایی ویژه)</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm border-t border-white/10 pt-2">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-amber-200 text-base">{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        {!orderSent && cartOrders.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-white/5">
            <button
              onClick={handleCheckout}
              className="w-full h-12 rounded-xl bg-[#530201] hover:bg-[#6c0807] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#530201]/40 active:scale-98"
            >
              <span>تکمیل و پرداخت ({subtotal.toLocaleString('fa-IR')} تومان)</span>
              <ArrowRight className="w-4 h-4 transform -scale-x-100" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
