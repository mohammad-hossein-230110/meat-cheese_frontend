import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartOrderItem } from '../../types/menu';
import { toPersianDigits, formatPersianPrice } from '../../utils/formatters';

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
  const [orderNote, setOrderNote] = useState('');

  if (!isOpen) return null;

  const totalCount = cartOrders.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartOrders.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleCheckout = () => {
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md" dir="rtl">
      {/* Translucent backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Surface - Obsidian Reserve Level 1 */}
      <div 
        className="relative w-full max-w-lg bg-[#1c1817] border border-[rgba(255,255,255,0.1)] sm:rounded-xl rounded-t-xl max-h-[90vh] flex flex-col z-10 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[#241f1e]/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#6b0d0c] text-[#f7f5f2] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#f7f5f2] truncate">سبد سفارش رستوران</div>
              <div className="text-[11px] text-[#a8a09b] font-normal truncate">
                {totalCount > 0 ? `${toPersianDigits(totalCount)} آیتم انتخاب شده` : 'سبد خالی است'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] text-[#a8a09b] hover:text-[#f7f5f2] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {orderSent ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-lg font-bold text-[#f7f5f2]">سفارش شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-[#a8a09b] max-w-sm mx-auto leading-relaxed">
                سفارش شما با موفقیت به ایستگاه آماده‌سازی سرآشپز ارسال شد و پس از بسته‌بندی در باکس حرارتی آرتیزان تحویل خواهد شد.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setOrderSent(false);
                    onClearCart();
                    onClose();
                  }}
                  className="h-11 px-6 rounded-lg bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2] text-xs font-semibold shadow-burgundy-glow transition-all"
                >
                  تأیید و بازگشت به منو
                </button>
              </div>
            </div>
          ) : cartOrders.length === 0 ? (
            <div className="py-14 text-center text-[#a8a09b] space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-[#7d7570] mb-2" />
              <p className="text-sm font-medium text-[#f7f5f2]">سبد سفارش شما خالی است</p>
              <p className="text-xs text-[#a8a09b]">لطفاً آیتم‌های مد نظر خود را از منو انتخاب کنید.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Items List */}
              <div className="space-y-2.5">
                {cartOrders.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-[#241f1e]/80 border border-[rgba(255,255,255,0.06)] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover border border-[rgba(255,255,255,0.08)]"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-[#f7f5f2]">{toPersianDigits(item.name)}</h4>
                        <div className="text-[11px] text-[#a8a09b] mt-0.5">
                          {formatPersianPrice(item.price)} تومان
                        </div>
                        <div className="text-xs font-bold text-[#ffb4ab] mt-0.5">
                          {formatPersianPrice(item.price * quantity)} تومان
                        </div>
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center h-8 bg-[#151313] border border-[rgba(255,255,255,0.08)] rounded-md px-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-[#a8a09b] hover:text-[#f7f5f2] hover:bg-[#241f1e] rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-[#f7f5f2]">
                        {toPersianDigits(quantity)}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#a8a09b] hover:text-[#f7f5f2] hover:bg-[#241f1e] rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special notes */}
              <div>
                <label className="text-[11px] text-[#a8a09b] block mb-1">یادداشت برای سرآشپز (اختیاری):</label>
                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="مثال: کم‌نمک، بدون پیاز..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-[#f7f5f2] placeholder-[#7d7570] focus:outline-none focus:border-[#6b0d0c]"
                />
              </div>

              {/* Clear Cart Button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={onClearCart}
                  className="flex items-center gap-1 text-[11px] text-[#ffb4ab] hover:underline"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>خالی‌کردن سبد</span>
                </button>
              </div>

              {/* Price Calculation Box */}
              <div className="p-3.5 bg-[#241f1e]/90 rounded-lg border border-[rgba(255,255,255,0.06)] space-y-2 text-xs">
                <div className="flex justify-between text-[#a8a09b]">
                  <span>جمع کل اقلام:</span>
                  <span className="text-[#f7f5f2]">{formatPersianPrice(subtotal)} تومان</span>
                </div>
                <div className="flex justify-between text-[#a8a09b]">
                  <span>مالیات و خدمات میزبانی:</span>
                  <span className="text-emerald-400">رایگان (پذیرایی ویژه)</span>
                </div>
                <div className="flex justify-between font-bold text-[#f7f5f2] text-sm border-t border-[rgba(255,255,255,0.06)] pt-2">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-[#ffb4ab] text-base">{formatPersianPrice(subtotal)} تومان</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        {!orderSent && cartOrders.length > 0 && (
          <div className="p-4 border-t border-[rgba(255,255,255,0.06)] bg-[#241f1e]/70">
            <button
              onClick={handleCheckout}
              className="w-full h-12 rounded-lg bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-burgundy-glow active:scale-98"
            >
              <span>تکمیل سفارش ({formatPersianPrice(subtotal)} تومان)</span>
              <ArrowRight className="w-4 h-4 transform -scale-x-100" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
