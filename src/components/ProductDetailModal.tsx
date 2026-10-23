import React, { useState } from 'react';
import { X, ShoppingBag, Snowflake, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const { activeProduct, closeProductDetail, addToCart, branch } = useApp();

  const [quantity, setQuantity] = useState<number>(20);
  const [added, setAdded] = useState<boolean>(false);

  if (!activeProduct) return null;

  const cartonCount = activeProduct.cartonCount || 50;
  const weightGrams = activeProduct.weightGrams || 140;
  const totalUnitsCount = quantity * cartonCount;
  const totalWeightKg = (totalUnitsCount * weightGrams) / 1000;

  const totalPrice =
    activeProduct.id === 'prod-1'
      ? activeProduct.unitPrice * cartonCount * quantity
      : (activeProduct.cartonPrice || activeProduct.unitPrice * cartonCount) * quantity;

  const handleAddToCart = () => {
    addToCart(activeProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeProductDetail();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-[#E8E6E3] rounded-lg shadow-xl overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute left-3 top-3 z-20 w-7 h-7 rounded-full bg-[#FAF9F7] text-[#242424] hover:bg-[#E8E6E3] flex items-center justify-center transition-colors"
          aria-label="بستن"
        >
          <X size={15} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#E8E6E3]">
          {/* Right Column: Info & Calculations */}
          <div className="p-5 md:p-6 space-y-4 order-2 md:order-1">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-[11px] text-[#777777]">
              <span>کاتالوگ</span>
              <ChevronRight size={12} className="rotate-180" />
              <span>{activeProduct.categoryLabel}</span>
              <ChevronRight size={12} className="rotate-180" />
              <span className="text-[#242424] font-medium">{activeProduct.name}</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
              <h2 className="text-base md:text-lg font-bold text-[#242424]">
                {activeProduct.name}
              </h2>
              <p className="text-xs text-[#777777] leading-relaxed">
                {activeProduct.description}
              </p>
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-1.5">
              {activeProduct.specs?.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-[#FAF9F7] text-[#242424] text-[11px] rounded border border-[#E8E6E3]"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Price Box */}
            <div className="p-2.5 bg-[#FAF9F7] border border-[#E8E6E3] rounded space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#777777]">قیمت پایه هر عدد:</span>
                <span className="font-mono font-bold text-[#242424]">
                  {formatPrice(activeProduct.unitPrice)} تومان
                </span>
              </div>
              {activeProduct.cartonPrice && (
                <div className="flex items-center justify-between pt-1 border-t border-[#E8E6E3]">
                  <span className="text-[#777777]">نرخ هر کارتن {cartonCount} عددی:</span>
                  <span className="font-mono font-bold text-[#530201]">
                    {formatPrice(activeProduct.cartonPrice)} تومان
                  </span>
                </div>
              )}
            </div>

            {/* Stepper & Units */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#242424]">تعداد کارتن سفارش:</span>
                <span className="text-[10px] text-[#777777]">حداقل سفارش: 1 کارتن</span>
              </div>

              <div className="flex items-center border border-[#E8E6E3] rounded bg-white h-9 px-2">
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-full flex items-center justify-center text-[#530201] font-bold text-sm hover:bg-[#FAF9F7] rounded"
                >
                  +
                </button>
                <div className="flex-1 text-center font-mono font-bold text-xs text-[#242424]">
                  {quantity} <span className="text-[10px] font-sans font-normal text-[#777777]">بسته</span>
                </div>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-full flex items-center justify-center text-[#530201] font-bold text-sm hover:bg-[#FAF9F7] rounded"
                >
                  -
                </button>
              </div>

              {/* Minimal Metric Strip */}
              <div className="p-2 bg-[#FAF9F7] rounded text-[11px] text-[#242424] flex items-center justify-around font-mono">
                <div>
                  <span className="text-[#777777] font-sans">تعداد: </span>
                  <span className="font-bold">{formatPrice(totalUnitsCount)}</span> عدد
                </div>
                <span>·</span>
                <div>
                  <span className="text-[#777777] font-sans">وزن: </span>
                  <span className="font-bold">{totalWeightKg}</span> کیلوگرم
                </div>
                <span>·</span>
                <span className="text-emerald-700 font-sans">تحویل فردا</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-[#E8E6E3] flex items-baseline justify-between">
              <span className="text-xs text-[#777777]">مبلغ سفارش:</span>
              <div className="text-right">
                <span className="font-mono text-base md:text-lg font-black text-[#530201]">
                  {formatPrice(totalPrice)}
                </span>
                <span className="text-[10px] text-[#777777] mr-1">تومان</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="flex-1 h-9 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {added ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>اضافه شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span>افزودن به سبد</span>
                  </>
                )}
              </button>

              <button
                onClick={closeProductDetail}
                className="px-3 h-9 border border-[#E8E6E3] hover:bg-[#FAF9F7] text-[#242424] rounded text-xs transition-colors"
              >
                بستن
              </button>
            </div>
          </div>

          {/* Left Column: Product Photo */}
          <div className="p-5 md:p-6 flex flex-col justify-between bg-[#FAF9F7] order-1 md:order-2">
            <div className="relative rounded overflow-hidden border border-[#E8E6E3] bg-white h-56 md:h-72 flex items-center justify-center">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>موجود در انبار</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#E8E6E3] flex items-center justify-between text-[11px] text-[#777777]">
              <div className="flex items-center gap-1">
                <Snowflake size={12} className="text-[#530201]" />
                <span className="font-mono">{activeProduct.storageTemp}</span>
              </div>
              <span className="font-mono text-[10px]">{activeProduct.sku}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
