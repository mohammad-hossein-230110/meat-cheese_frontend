import React, { useState, useMemo } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, ChevronLeft, Search, UtensilsCrossed } from 'lucide-react';
import { ARTISAN_MENU_ITEMS, MENU_CATEGORIES } from '../../data/menuData';
import { MenuItem, MenuCategoryType, CartOrderItem } from '../../types/menu';
import { ArtisanMenuItemCard } from './ArtisanMenuItemCard';
import { ArtisanItemModal } from './ArtisanItemModal';
import { ArtisanCartModal } from './ArtisanCartModal';
import { useApp } from '../../context/AppContext';
import { toPersianDigits, formatPersianPrice } from '../../utils/formatters';

interface ArtisanMenuViewProps {
  onSwitchToB2B?: () => void;
}

export const ArtisanMenuView: React.FC<ArtisanMenuViewProps> = ({ onSwitchToB2B }) => {
  const { setCurrentView } = useApp();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('burgers');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initial cart:
  // Smash Burger (245,000) + Pastrami Sandwich (290,000) + Caesar Salad (195,000) = 3 items, 730,000 Tomans
  const [cartOrders, setCartOrders] = useState<CartOrderItem[]>(() => {
    const smash = ARTISAN_MENU_ITEMS.find((i) => i.id === 'menu-brg-smash');
    const pastrami = ARTISAN_MENU_ITEMS.find((i) => i.id === 'menu-snd-pastrami');
    const caesar = ARTISAN_MENU_ITEMS.find((i) => i.id === 'menu-sld-caesar');
    const initial: CartOrderItem[] = [];
    if (smash) initial.push({ item: smash, quantity: 1 });
    if (pastrami) initial.push({ item: pastrami, quantity: 1 });
    if (caesar) initial.push({ item: caesar, quantity: 1 });
    return initial;
  });

  // Filtered menu items by category AND search query
  const filteredItems = useMemo(() => {
    return ARTISAN_MENU_ITEMS.filter((item) => {
      const query = menuSearchQuery.trim().toLowerCase();
      
      if (!query) {
        return item.category === activeCategory;
      }

      // When searching, match across all items or active category
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(query)) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.ingredients && item.ingredients.some((ing) => ing.toLowerCase().includes(query))) ||
        (item.badgeLabel && item.badgeLabel.toLowerCase().includes(query));

      return matchesSearch;
    });
  }, [activeCategory, menuSearchQuery]);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartOrders((prev) => {
      const existing = prev.find((o) => o.item.id === item.id);
      if (existing) {
        return prev.map((o) => (o.item.id === item.id ? { ...o, quantity: o.quantity + 1 } : o));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartOrders((prev) => {
      const existing = prev.find((o) => o.item.id === itemId);
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((o) => o.item.id !== itemId);
      }
      return prev.map((o) => (o.item.id === itemId ? { ...o, quantity: newQty } : o));
    });
  };

  const getItemQuantity = (itemId: string): number => {
    const item = cartOrders.find((o) => o.item.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalCartCount = cartOrders.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartOrders.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white bg-[#121010] text-[#f7f5f2]" dir="rtl">
      {/* Background Ambience with Soft Atmospheric Warm Lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASDnHEbGfEuX9jnYI_MD4hx84yy6pLoqe-nKGYpY0SKsOR0CT809xXXFmZrDZ6pZaKbdunulb9oSL60ICmIN2oohUsS8dUUgSoFm23vAjkYr5GTJ6ff8KSWDELMvPBHkSJcxieLTzF_kHC81W1dtt_mcNW6uZQm97BIvdemb7aJ28Eom0yfNc-XszMr-GNSoU_TRPwokjYokv1BrB90ekO5sfuivfp_Pvf7viT3ns"
          alt="Atmospheric Steakhouse"
          className="w-full h-full object-cover object-center filter blur-md scale-105 opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/90 via-[#151313]/85 to-[#100e0e]/95" />
        {/* Soft warm radial glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6b0d0c]/12 rounded-full blur-[140px]" />
      </div>

      {/* Main Container (Mobile-first single column at 390px, responsive up to 1240px) */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Top Navigation Bar (Obsidian Reserve Header) */}
        <header className="sticky top-3 z-50 mt-3 w-full">
          <nav className="w-full rounded-lg bg-[#1c1817]/90 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] px-4 py-3 flex items-center justify-between shadow-lg transition-all">
            
            {/* Logo Wordmark */}
            <div className="flex items-center gap-2 group cursor-pointer min-w-0" onClick={() => { setActiveCategory('burgers'); setMenuSearchQuery(''); }}>
              <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shadow-sm border border-white/10 shrink-0">
                M&amp;C
              </div>
              <span className="font-serif-brand tracking-widest text-sm sm:text-base md:text-lg font-bold text-[#f7f5f2] group-hover:text-[#ffb4ab] transition-colors uppercase whitespace-nowrap truncate">
                MEAT &amp; CHEESE
              </span>
            </div>

            {/* Desktop Navigation Links (Concise Core Navigation: منوی رستوران، سفارش‌ها، پروفایل) */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
              <button
                onClick={() => setMenuSearchQuery('')}
                className="px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold bg-[#6b0d0c] text-[#f7f5f2] shadow-sm border border-white/10 whitespace-nowrap cursor-pointer"
              >
                منوی رستوران
              </button>
              <button
                onClick={() => setCurrentView('customer-orders')}
                className="px-3 py-1.5 rounded-md text-xs sm:text-sm text-[#a8a09b] hover:text-[#f7f5f2] hover:bg-[#241f1e] transition-all whitespace-nowrap cursor-pointer"
              >
                سفارش‌ها
              </button>
              <button
                onClick={() => setCurrentView('customer-profile')}
                className="px-3 py-1.5 rounded-md text-xs sm:text-sm text-[#a8a09b] hover:text-[#f7f5f2] hover:bg-[#241f1e] transition-all whitespace-nowrap cursor-pointer"
              >
                پروفایل
              </button>

              {/* Direct Switcher to B2B Catalog */}
              {onSwitchToB2B && (
                <button
                  onClick={onSwitchToB2B}
                  className="mr-1 px-3 py-1.5 rounded-md text-xs font-semibold text-[#f77569] bg-[#6b0d0c]/20 hover:bg-[#6b0d0c]/30 border border-[#6b0d0c]/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                  title="ورود به سامانه تأمین و کاتالوگ محصولات شعب"
                >
                  <UtensilsCrossed size={13} className="text-[#f77569]" />
                  <span>کاتالوگ محصولات</span>
                </button>
              )}
            </div>

            {/* Right Side: Cart Quick Button & Mobile Menu Trigger */}
            <div className="flex items-center gap-2">
              <button
                id="cartBtn"
                onClick={() => setCurrentView('customer-cart')}
                aria-label="سبد خرید"
                className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#241f1e] hover:bg-[#2c2929] border border-[rgba(255,255,255,0.08)] text-[#f7f5f2] active:scale-95 transition-transform cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#f7f5f2]" />
                {totalCartCount > 0 && (
                  <span
                    id="cartCount"
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#6b0d0c] text-[#f7f5f2] text-[11px] font-bold rounded-full flex items-center justify-center border border-white/20 shadow-sm animate-in zoom-in"
                  >
                    {toPersianDigits(totalCartCount)}
                  </span>
                )}
              </button>

              {/* Mobile & Tablet Drawer Trigger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#241f1e] hover:bg-[#2c2929] border border-[rgba(255,255,255,0.08)] text-[#f7f5f2] active:scale-95 transition-transform cursor-pointer"
                aria-label="منوی سایت"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </nav>

          {/* Mobile Drawer Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 p-3 rounded-lg bg-[#1c1817]/95 backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] space-y-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-right px-3 py-2 rounded-md text-sm font-semibold text-[#f7f5f2] bg-[#6b0d0c] cursor-pointer"
              >
                منوی رستوران
              </button>
              <button
                onClick={() => {
                  setCurrentView('customer-cart');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right px-3 py-2 rounded-md text-sm font-medium text-[#f7f5f2] hover:bg-[#241f1e] flex items-center justify-between cursor-pointer"
              >
                <span>سبد خرید من</span>
                <span className="text-xs text-[#ffb4ab] font-medium">
                  {totalCartCount > 0 ? `${toPersianDigits(totalCartCount)} آیتم` : ''}
                </span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('customer-orders');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right px-3 py-2 rounded-md text-sm font-medium text-[#f7f5f2] hover:bg-[#241f1e] cursor-pointer"
              >
                سفارش‌ها
              </button>
              <button
                onClick={() => {
                  setCurrentView('customer-profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right px-3 py-2 rounded-md text-sm font-medium text-[#f7f5f2] hover:bg-[#241f1e] cursor-pointer"
              >
                پروفایل
              </button>
              {onSwitchToB2B && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchToB2B();
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-md text-sm font-bold text-[#f77569] bg-[#6b0d0c]/20 border border-[#6b0d0c]/30 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <UtensilsCrossed size={14} className="text-[#f77569]" />
                    کاتالوگ محصولات
                  </span>
                  <ChevronLeft size={16} />
                </button>
              )}
            </div>
          )}
        </header>

        {/* Menu Header */}
        <section className="mt-6 mb-5 sm:mt-8 sm:mb-6 text-center max-w-lg mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f7f5f2] tracking-tight">
            منوی رستوران
          </h1>
        </section>

        {/* User Search Bar for Menu Page (Prominent, Responsive & RTL-Aligned) */}
        <section className="max-w-xl mx-auto w-full mb-6 px-1">
          <div className="relative w-full group">
            <input
              type="text"
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              placeholder="جستجو در منو (نام غذا، برگر، ساندویچ، سالاد، ترکیبات...)"
              className="w-full rounded-lg bg-[#1c1817] hover:bg-[#241f1e] focus:bg-[#241f1e] border border-[rgba(255,255,255,0.08)] focus:border-[#6b0d0c] focus:ring-1 focus:ring-[#6b0d0c]/30 px-4 py-3.5 pr-11 pl-10 text-xs sm:text-sm text-[#f7f5f2] placeholder-[#7d7570] focus:outline-none transition-all shadow-md"
            />
            {/* Search Icon (RTL Right) */}
            <div className="absolute right-3.5 top-3.5 text-[#a8a09b] group-focus-within:text-[#ffb4ab] pointer-events-none transition-colors">
              <Search className="w-5 h-5" />
            </div>
            
            {/* Clear Button (RTL Left) */}
            {menuSearchQuery && (
              <button
                type="button"
                onClick={() => setMenuSearchQuery('')}
                className="absolute left-3.5 top-3 text-[#a8a09b] hover:text-[#f7f5f2] p-0.5 rounded transition-colors"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Result Banner */}
          {menuSearchQuery.trim() && (
            <div className="flex items-center justify-between mt-2.5 text-xs text-[#a8a09b] bg-[#1c1817] border border-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-md">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6b0d0c]" />
                <span>
                  نتایج جستجو برای: <strong className="text-[#f7f5f2]">«{menuSearchQuery}»</strong> ({toPersianDigits(filteredItems.length)} عنوان خوراک)
                </span>
              </div>
              <button
                onClick={() => setMenuSearchQuery('')}
                className="text-[#ffb4ab] hover:underline font-medium"
              >
                پاک‌کردن فیلتر
              </button>
            </div>
          )}
        </section>

        {/* Menu Categories (Segmented Pills Strip - Horizontally Scrollable on Mobile) */}
        <section className="mb-8 w-full">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-1 gap-2 sm:gap-2.5 px-1">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id && !menuSearchQuery.trim();
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as MenuCategoryType);
                    setMenuSearchQuery('');
                  }}
                  className={`category-btn whitespace-nowrap px-4 py-2 rounded-lg text-xs sm:text-sm transition-all duration-150 active:scale-95 ${
                    isActive
                      ? 'bg-[#6b0d0c] text-[#f7f5f2] shadow-burgundy-glow border border-white/15 font-semibold'
                      : 'bg-[#1c1817] hover:bg-[#241f1e] text-[#a8a09b] hover:text-[#f7f5f2] border border-[rgba(255,255,255,0.08)] font-medium'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* MENU ITEM CARDS SECTION */}
        {/* Mobile: 1 Column | Tablet: 2 Columns | Desktop: 3 Columns */}
        {filteredItems.length === 0 ? (
          <div className="rounded-lg bg-[#1c1817] border border-[rgba(255,255,255,0.08)] p-10 text-center my-6 max-w-md mx-auto space-y-3">
            <Search className="w-10 h-10 text-[#7d7570] mx-auto" />
            <h3 className="text-sm font-semibold text-[#f7f5f2]">غذایی مطابق با عبارت جستجو شده یافت نشد</h3>
            <p className="text-xs text-[#a8a09b]">
              لطفاً نام غذا، کات گوشت یا ترکیبات دیگری را جستجو کنید یا فیلتر را پاک نمایید.
            </p>
            <button
              onClick={() => {
                setMenuSearchQuery('');
                setActiveCategory('burgers');
              }}
              className="mt-2 px-4 py-2 rounded-md bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2] text-xs font-semibold"
            >
              مشاهده منوی برگرها
            </button>
          </div>
        ) : (
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pb-20">
            {filteredItems.map((item) => (
              <ArtisanMenuItemCard
                key={item.id}
                item={item}
                currentQuantity={getItemQuantity(item.id)}
                onAddToCart={handleAddToCart}
                onOpenDetails={(item) => setSelectedItemForModal(item)}
              />
            ))}
          </main>
        )}

        {/* Bottom Sticky Quick Bar for Cart (Fixed 16px above bottom, Inset Margin) */}
        <aside className="fixed bottom-4 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
          <div className="w-full max-w-[420px] rounded-xl glass-cart-bar p-3 px-4 flex items-center justify-between gap-3 shadow-2xl pointer-events-auto">
            {/* Cart summary status */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentView('customer-cart')}
            >
              <div className="w-9 h-9 rounded-lg bg-[#6b0d0c] border border-white/10 flex items-center justify-center text-[#f7f5f2] shadow-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[11px] text-[#a8a09b]">
                  <span className="font-bold text-[#f7f5f2]">
                    {toPersianDigits(totalCartCount)} آیتم
                  </span>
                  <span>در سبد سفارش</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#f7f5f2]">
                  {formatPersianPrice(totalCartAmount)} <span className="text-[10px] font-normal text-[#a8a09b]">تومان</span>
                </div>
              </div>
            </div>

            {/* Action checkout button */}
            <button
              onClick={() => setCurrentView('customer-cart')}
              className="inline-flex items-center gap-1.5 bg-[#6b0d0c] hover:bg-[#85221c] text-[#f7f5f2] text-xs font-semibold px-4 py-2.5 rounded-lg shadow-burgundy-glow active:scale-95 transition-all border border-white/10 cursor-pointer"
            >
              <span>مشاهده سبد و تسویه</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Footer */}
        <footer className="mt-auto pt-10 pb-8 border-t border-[rgba(255,255,255,0.06)] text-center px-4 max-w-4xl mx-auto w-full">
          {/* Brandmark with ruby point */}
          <div className="flex items-center justify-center gap-2 mb-2 font-serif-brand text-[#f7f5f2] text-sm tracking-widest font-semibold">
            <span>MEAT &amp; CHEESE RESTAURANT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6b0d0c] inline-block shadow-sm" />
          </div>
          {/* Address and phone */}
          <p className="text-[11px] text-[#a8a09b] mb-2 leading-relaxed">
            تهران، خیابان فرشته، پلاک ۲۸ · تلفن رزرو و سفارشات: ۰۲۱-۲۲۰۰۴۵۸۰
          </p>
          {/* Copyright */}
          <p className="text-[10px] text-[#7d7570] font-light">
            © ۱۴۰۳ کلیه حقوق محفوظ است
          </p>
        </footer>

      </div>

      {/* Cart & Checkout Modal */}
      <ArtisanCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartOrders={cartOrders}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCartOrders([])}
      />

      {/* Item Detail Modal */}
      <ArtisanItemModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        currentQuantity={selectedItemForModal ? getItemQuantity(selectedItemForModal.id) : 0}
        onUpdateQuantity={(delta) => {
          if (selectedItemForModal) {
            if (delta > 0) {
              handleAddToCart(selectedItemForModal);
            } else {
              handleUpdateQuantity(selectedItemForModal.id, -1);
            }
          }
        }}
      />
    </div>
  );
};
