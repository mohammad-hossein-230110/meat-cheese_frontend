import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '../../types/menu';

interface ArtisanMenuItemCardProps {
  item: MenuItem;
  currentQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const ArtisanMenuItemCard: React.FC<ArtisanMenuItemCardProps> = ({
  item,
  currentQuantity,
  onAddToCart,
  onOpenDetails,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const badgeClass = item.badgeType === 'burgundy'
    ? 'bg-[#530201]/90 text-amber-100 border-white/20'
    : item.badgeType === 'amber'
    ? 'bg-amber-900/80 text-amber-200 border-amber-500/30'
    : 'bg-black/60 text-stone-200 border-white/20';

  return (
    <article
      data-purpose="product-card"
      onClick={() => onOpenDetails(item)}
      className="unified-glass-card group cursor-pointer"
    >
      {/* Dish Image with Overlay Badge */}
      <div className="relative w-full aspect-[4/3] sm:h-56 overflow-hidden bg-stone-900">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Top-Right Badge (RTL First Side) */}
        {item.badgeLabel && (
          <span className={`absolute top-3.5 right-3.5 px-3 py-1 rounded-md text-[11px] font-semibold backdrop-blur-md border shadow-md ${badgeClass}`}>
            {item.badgeLabel}
          </span>
        )}

        {/* Quantity Indicator if in cart */}
        {currentQuantity > 0 && (
          <span className="absolute top-3.5 left-3.5 w-6 h-6 rounded-full bg-[#530201] border border-white/30 text-white font-bold text-xs flex items-center justify-center shadow-lg">
            {currentQuantity.toLocaleString('fa-IR')}
          </span>
        )}
      </div>

      {/* Frosted Glass Information Panel (FLAT TOP EDGE - Absolutely NO top rounded corners) */}
      <div className="card-info-flat-top flex-1 p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-amber-100/90 transition-colors">
            {item.name}
          </h2>
          <p className="text-xs text-stone-300/85 font-light leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer Info: Price & Add Button */}
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10">
          {/* Price Box */}
          <div className="flex flex-col">
            <span className="text-[10px] text-[#a89f91] mb-0.5 font-normal">قیمت نهایی</span>
            <span className="text-sm sm:text-base font-bold text-stone-100 tracking-tight">
              {item.formattedPrice} <span className="text-[11px] font-normal text-stone-400">تومان</span>
            </span>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddClick}
            className={`inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold shadow-md border border-white/15 active:scale-95 transition-all ${
              justAdded
                ? 'bg-neutral-800 text-emerald-400 border-emerald-500/40'
                : 'bg-[#530201] hover:bg-[#6c0807] text-white shadow-[#530201]/30'
            }`}
          >
            {justAdded ? (
              <>
                <span>اضافه شد</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </>
            ) : (
              <>
                <span>افزودن</span>
                <Plus className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
