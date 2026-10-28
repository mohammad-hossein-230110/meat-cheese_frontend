import React from 'react';
import { X, Plus, Minus, Clock, Flame, ShieldCheck, Heart } from 'lucide-react';
import { MenuItem } from '../../types/menu';

interface ArtisanItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  currentQuantity: number;
  onUpdateQuantity: (delta: number) => void;
}

export const ArtisanItemModal: React.FC<ArtisanItemModalProps> = ({
  item,
  onClose,
  currentQuantity,
  onUpdateQuantity,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto" dir="rtl">
      <div 
        className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-[#181311]/95 border border-white/15 shadow-2xl my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="بستن"
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative w-full h-64 sm:h-72 bg-stone-900 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181311] via-transparent to-black/30" />

          {item.badgeLabel && (
            <span className="absolute top-4 right-4 px-3 py-1 rounded-md text-xs font-semibold bg-[#530201]/90 text-amber-100 border border-white/20 shadow-md">
              {item.badgeLabel}
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 -mt-4 relative z-10 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.name}
              </h2>
            </div>
            {item.nameEn && (
              <p className="text-xs font-serif-brand text-amber-200/80 tracking-wider mt-0.5">
                {item.nameEn}
              </p>
            )}
            <p className="mt-3 text-sm text-stone-300 leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          {/* Portion info & prep time */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            {item.portionWeight && (
              <div>
                <span className="text-stone-400 block text-[11px]">اندازه و وزن پرس:</span>
                <span className="text-stone-200 font-medium">{item.portionWeight}</span>
              </div>
            )}
            {item.preparationTime && (
              <div>
                <span className="text-stone-400 block text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  زمان آماده‌سازی:
                </span>
                <span className="text-stone-200 font-medium">{item.preparationTime}</span>
              </div>
            )}
          </div>

          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-stone-300 mb-2">ترکیبات و مواد اولیه:</h3>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 text-stone-300 text-xs border border-white/10"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tasting notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-stone-300 mb-2">پروفایل و یادداشت طعمی:</h3>
              <div className="flex flex-wrap gap-2">
                {item.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-amber-300/90 flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#530201]" />
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pairing suggestion */}
          {item.pairingSuggestion && (
            <div className="p-3 rounded-xl bg-[#530201]/20 border border-[#530201]/40 text-xs text-stone-200">
              <span className="font-semibold text-amber-200 block mb-0.5">پیشنهاد سرآشپز:</span>
              <p className="text-stone-300 text-xs">{item.pairingSuggestion}</p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#a89f91] block">قیمت نهایی</span>
              <span className="text-lg font-bold text-white">
                {item.formattedPrice} <span className="text-xs font-normal text-stone-400">تومان</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {currentQuantity > 0 ? (
                <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1 border border-white/15">
                  <button
                    onClick={() => onUpdateQuantity(-1)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-white text-sm">
                    {currentQuantity.toLocaleString('fa-IR')}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(1)}
                    className="w-8 h-8 rounded-lg bg-[#530201] hover:bg-[#6c0807] text-white flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onUpdateQuantity(1)}
                  className="px-6 py-2.5 rounded-xl bg-[#530201] hover:bg-[#6c0807] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#530201]/40 border border-white/20 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن به سبد سفارش</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
