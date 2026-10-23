import React, { useState } from 'react';
import { Search, ShoppingBag, ChevronLeft, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, formatPrice } from '../data/mockData';
import { Product } from '../types';

export const CatalogView: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    addToCart,
    openProductDetail,
    cartUniqueCount,
    cartTotal,
    setCurrentView,
    branch,
  } = useApp();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'همه اقلام' },
    { id: 'protein', label: 'پروتئین و برگر' },
    { id: 'vegetables', label: 'تره‌بار تازه' },
    { id: 'sauces', label: 'سس‌های اختصاصی' },
    { id: 'cheese', label: 'پنیرها' },
    { id: 'bakery', label: 'نان تازه' },
    { id: 'apparel', label: 'لباس و ملزومات' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.includes(searchQuery) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAdd = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    setToastMessage(`${product.name} (${qty} واحد) اضافه شد`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <div className="space-y-4 pb-24 md:pb-20 max-w-6xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#2C0000] text-white px-3 py-1.5 rounded text-[11px] font-medium shadow-sm flex items-center gap-1.5 animate-bounce">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base md:text-lg font-bold text-[#242424]">
              کاتالوگ مواد اولیه و اقلام مصرفی
            </h1>
            <p className="text-[11px] text-[#777777] mt-0.5">
              اقلام استاندارد تایید شده جهت سفارش روزانه شعبه {branch.name}
            </p>
          </div>

          {/* Minimal Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام کالا یا کد..."
              className="w-full bg-white border border-[#E8E6E3] rounded h-9 pr-8 pl-3 text-xs text-[#242424] placeholder-[#777777] focus:outline-none focus:border-[#530201] transition-colors"
            />
            <Search size={14} className="absolute right-2.5 top-2.5 text-[#777777]" />
          </div>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#530201] text-white'
                    : 'bg-white text-[#777777] hover:text-[#242424] border border-[#E8E6E3]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid - Minimal & Modern */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredProducts.map((prod) => {
          const qty = quantities[prod.id] || 1;
          return (
            <div
              key={prod.id}
              className="bg-white border border-[#E8E6E3] rounded-md overflow-hidden flex flex-col justify-between hover:border-[#530201]/30 transition-all group"
            >
              <div>
                {/* Image */}
                <div
                  onClick={() => openProductDetail(prod)}
                  className="relative h-36 sm:h-44 bg-[#F1EFEC] overflow-hidden cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">
                    {prod.storageTemp}
                  </div>
                  <div className="absolute top-2 left-2 font-mono text-[9px] bg-white/90 text-[#242424] px-1 py-0.2 rounded">
                    {prod.sku}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 space-y-1">
                  <span className="text-[10px] text-[#777777] block">{prod.categoryLabel}</span>
                  <h3
                    onClick={() => openProductDetail(prod)}
                    className="text-xs sm:text-sm font-semibold text-[#242424] hover:text-[#530201] transition-colors cursor-pointer line-clamp-1"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-[10px] text-[#777777]">
                    واحد: <span className="text-[#242424]">{prod.unit}</span>
                  </p>

                  <div className="pt-1.5 flex items-baseline justify-between border-t border-[#F1EFEC]">
                    <span className="text-[10px] text-[#777777]">قیمت مصوب:</span>
                    <span className="font-mono text-xs font-bold text-[#242424]">
                      {formatPrice(prod.unitPrice)}{' '}
                      <span className="text-[9px] font-sans font-normal text-[#777777]">تومان</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimal Bottom Stepper & Add */}
              <div className="p-2.5 bg-[#FAF9F7] border-t border-[#E8E6E3] flex items-center gap-1.5">
                <div className="flex items-center border border-[#E8E6E3] rounded bg-white h-7 px-1">
                  <button
                    onClick={() => handleQtyChange(prod.id, 1)}
                    className="w-5 h-full flex items-center justify-center text-[#530201] font-bold text-xs hover:bg-[#F1EFEC] transition-colors"
                  >
                    +
                  </button>
                  <span className="w-5 text-center font-mono font-medium text-xs text-[#242424]">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleQtyChange(prod.id, -1)}
                    className="w-5 h-full flex items-center justify-center text-[#530201] font-bold text-xs hover:bg-[#F1EFEC] transition-colors"
                  >
                    -
                  </button>
                </div>

                <button
                  onClick={() => handleAdd(prod)}
                  className="flex-1 h-7 bg-[#530201] hover:bg-[#400101] text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag size={12} />
                  <span>افزودن</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar */}
      {cartUniqueCount > 0 && (
        <div className="fixed bottom-14 md:bottom-4 left-4 right-4 md:left-8 md:right-72 z-30">
          <div className="bg-white border border-[#E8E6E3] rounded-md p-2.5 px-4 shadow-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#530201] text-white flex items-center justify-center">
                <ShoppingBag size={15} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#242424]">
                  سبد خرید: <span className="font-mono">{cartUniqueCount}</span> قلم
                </div>
                <div className="text-[10px] text-[#777777]">
                  تحویل شیفت صبح فردا
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left hidden xs:block">
                <span className="font-mono text-xs md:text-sm font-bold text-[#242424]">
                  {formatPrice(cartTotal)} تومان
                </span>
              </div>

              <button
                onClick={() => setCurrentView('cart')}
                className="h-8 px-3.5 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>مشاهده سبد</span>
                <ChevronLeft size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
