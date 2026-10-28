import React, { useState } from 'react';
import { Search, ShoppingBag, ChevronLeft, Check, X, Filter, UtensilsCrossed } from 'lucide-react';
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

  // Enhanced search filtering by name, category label, category key, SKU, and description
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) {
      return matchesCategory;
    }

    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.categoryLabel.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="space-y-4 pb-24 md:pb-20 max-w-6xl mx-auto" dir="rtl">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#2C0000] text-white px-3.5 py-1.5 rounded text-xs font-medium shadow-md flex items-center gap-1.5 animate-bounce">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* View Switcher Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white border border-[#E8E6E3] rounded-lg shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#530201] px-2.5 py-1 bg-[#530201]/10 rounded border border-[#530201]/20">
            بخش کاتالوگ تأمین شعب (B2B)
          </span>
          <span className="text-[11px] text-[#777777] hidden sm:inline">
            شعبه {branch.name} · سفارش‌گذاری مواد اولیه
          </span>
        </div>
        <button
          onClick={() => setCurrentView('menu')}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#530201] hover:bg-[#FAF9F7] border border-[#530201]/30 rounded transition-colors cursor-pointer"
        >
          <UtensilsCrossed size={13} className="text-[#9E7D56]" />
          <span>مشاهده منوی دیجیتال مشتریان رستوران</span>
          <ChevronLeft size={13} />
        </button>
      </div>

      {/* Prominent Search & Filter Section */}
      <div className="bg-white border border-[#E8E6E3] rounded-lg p-4 shadow-2xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-base md:text-lg font-bold text-[#242424]">
              کاتالوگ مواد اولیه و اقلام مصرفی
            </h1>
            <p className="text-xs text-[#777777] mt-0.5">
              جستجو و فیلتر میان اقلام استاندارد جهت ثبت سفارش روزانه
            </p>
          </div>

          {/* Search Result Counter */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono font-medium text-[#242424] bg-[#FAF9F7] px-2.5 py-1 rounded border border-[#E8E6E3]">
              {filteredProducts.length} از {PRODUCTS.length} قلم کالا
            </span>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو بر اساس نام کالا، دسته‌بندی (مثلاً: پروتئین، پنیر، سس)، کد کالا..."
            className="w-full bg-[#FAF9F7] hover:bg-white focus:bg-white border-2 border-[#E8E6E3] focus:border-[#530201] rounded-lg h-11 pr-10 pl-10 text-xs sm:text-sm text-[#242424] placeholder-[#777777] focus:outline-none transition-all shadow-inner"
          />
          {/* Search Icon */}
          <div className="absolute right-3 top-3 text-[#777777] pointer-events-none">
            <Search size={18} className="text-[#530201]" />
          </div>

          {/* Clear Search Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="پاک‌کردن جستجو"
              className="absolute left-3 top-3 text-[#777777] hover:text-[#530201] p-0.5 rounded transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          <span className="text-xs text-[#777777] font-medium ml-1 shrink-0">دسته‌بندی:</span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#530201] text-white shadow-xs'
                    : 'bg-[#FAF9F7] text-[#555555] hover:text-[#242424] hover:bg-white border border-[#E8E6E3]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Search & Category Feedback Filter Tag */}
        {(searchQuery.trim() || activeCategory !== 'all') && (
          <div className="flex items-center justify-between text-xs bg-[#FAF9F7] border border-[#E8E6E3] px-3 py-2 rounded-md">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#777777]">فیلترهای فعال:</span>
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#530201]/10 text-[#530201] rounded border border-[#530201]/20 font-medium">
                  جستجو: «{searchQuery}»
                  <X size={12} className="cursor-pointer hover:opacity-75" onClick={() => setSearchQuery('')} />
                </span>
              )}
              {activeCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-200 text-[#242424] rounded border border-stone-300 font-medium">
                  دسته‌بندی: {categories.find(c => c.id === activeCategory)?.label}
                  <X size={12} className="cursor-pointer hover:opacity-75" onClick={() => setActiveCategory('all')} />
                </span>
              )}
            </div>
            <button
              onClick={handleClearFilters}
              className="text-[11px] text-[#530201] hover:underline font-medium shrink-0"
            >
              پاک‌کردن همه فیلترها
            </button>
          </div>
        )}
      </div>

      {/* Product Grid or Empty Search State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#E8E6E3] rounded-lg p-12 text-center my-6 space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F7] border border-[#E8E6E3] flex items-center justify-center mx-auto text-[#530201]">
            <Filter size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#242424]">
            کالایی مطابق با جستجوی شما یافت نشد
          </h3>
          <p className="text-xs text-[#777777] max-w-sm mx-auto leading-relaxed">
            {searchQuery 
              ? `هیچ کالایی برای عبارت «${searchQuery}» پیدا نشد. املای کلمات را بررسی کنید یا عبارت عمومی‌تری مانند «برگر» یا «سس» وارد نمایید.`
              : 'در این دسته‌بندی در حال حاضر کالایی موجود نیست.'}
          </p>
          <div className="pt-2">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold transition-colors shadow-xs"
            >
              مشاهده تمامی کالاهای کاتالوگ
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredProducts.map((prod) => {
            const qty = quantities[prod.id] || 1;
            return (
              <div
                key={prod.id}
                className="bg-white border border-[#E8E6E3] rounded-md overflow-hidden flex flex-col justify-between hover:border-[#530201]/30 transition-all group shadow-2xs"
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
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      {prod.storageTemp}
                    </div>
                    <div className="absolute top-2 left-2 font-mono text-[9px] bg-white/90 text-[#242424] px-1 py-0.5 rounded">
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
                      title="افزایش تعداد"
                    >
                      +
                    </button>
                    <span className="w-5 text-center font-mono font-medium text-xs text-[#242424]">
                      {qty}
                    </span>
                    <button
                      onClick={() => handleQtyChange(prod.id, -1)}
                      className="w-5 h-full flex items-center justify-center text-[#530201] font-bold text-xs hover:bg-[#F1EFEC] transition-colors"
                      title="کاهش تعداد"
                    >
                      -
                    </button>
                  </div>

                  <button
                    onClick={() => handleAdd(prod)}
                    className="flex-1 h-7 bg-[#530201] hover:bg-[#400101] text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    <span>افزودن</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
                className="h-8 px-3.5 bg-[#530201] hover:bg-[#400101] text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
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
