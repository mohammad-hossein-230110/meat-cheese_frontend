import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '../../types/menu';
import { toPersianDigits, formatPersianPrice } from '../../utils/formatters';

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
  const [imageError, setImageError] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const badgeClass = item.badgeType === 'burgundy'
    ? 'bg-[#6b0d0c] text-[#f7f5f2] border-white/15'
    : item.badgeType === 'amber'
    ? 'bg-[#241f1e] text-[#f77569] border-white/10'
    : 'bg-[#151313]/90 text-[#a8a09b] border-white/10';

  // Fallback image in case external URL fails
  const displayImage = imageError
    ? 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80'
    : item.image;

  return (
    <article
      data-purpose="product-card"
      onClick={() => onOpenDetails(item)}
      className="unified-glass-card group cursor-pointer"
    >
      {/* Dish Image with Overlay Badge */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] min-h-[170px] overflow-hidden bg-[#100e0e]">
        <img
          src={displayImage}
          alt={item.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1817] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Top-Right Badge (RTL First Side) */}
        {item.badgeLabel && (
          <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide border shadow-sm ${badgeClass}`}>
            {item.badgeLabel}
          </span>
        )}

        {/* Quantity Indicator if in cart - in Persian digits */}
        {currentQuantity > 0 && (
          <span className="absolute top-3 left-3 w-6 h-6 rounded-md bg-[#6b0d0c] border border-white/20 text-[#f7f5f2] font-bold text-xs flex items-center justify-center shadow-md">
            {toPersianDigits(currentQuantity)}
          </span>
        )}
      </div>

      {/* Obsidian Reserve Information Panel */}
      <div className="card-info-flat-top flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h2 className="text-base sm:text-lg font-semibold text-[#f7f5f2] tracking-tight group-hover:text-[#ffb4ab] transition-colors line-clamp-1">
              {toPersianDigits(item.name)}
            </h2>
          </div>
          <p className="text-xs text-[#a8a09b] font-normal leading-relaxed line-clamp-2">
            {toPersianDigits(item.description)}
          </p>
        </div>

        {/* Footer Info: Price & Add Button */}
        <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-[rgba(255,255,255,0.06)] gap-2">
          {/* Price Box */}
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#7d7570] mb-0.5 font-normal">قیمت نهایی</span>
            <span className="text-sm sm:text-base font-bold text-[#f7f5f2] tracking-tight whitespace-nowrap">
              {formatPersianPrice(item.price)} <span className="text-[11px] font-normal text-[#a8a09b]">تومان</span>
            </span>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddClick}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-burgundy-glow border border-white/10 active:scale-95 transition-all ${
              justAdded
                ? 'bg-[#241f1e] text-emerald-400 border-emerald-500/30'
                : 'bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2]'
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
