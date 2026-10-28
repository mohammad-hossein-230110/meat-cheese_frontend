import React, { useState, useMemo } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Phone, Clock, Award, ChevronLeft, Search, UtensilsCrossed } from 'lucide-react';
import { ARTISAN_MENU_ITEMS, MENU_CATEGORIES } from '../../data/menuData';
import { MenuItem, MenuCategoryType, CartOrderItem } from '../../types/menu';
import { ArtisanMenuItemCard } from './ArtisanMenuItemCard';
import { ArtisanItemModal } from './ArtisanItemModal';
import { ArtisanCartModal } from './ArtisanCartModal';

interface ArtisanMenuViewProps {
  onSwitchToB2B?: () => void;
}

export const ArtisanMenuView: React.FC<ArtisanMenuViewProps> = ({ onSwitchToB2B }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('burgers');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<'about' | 'gallery' | 'contact' | null>(null);

  // Initial cart matching exactly the user's template:
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
      
      // If there is an active search query, allow searching across all categories if user wants
      const matchesCategory = query ? true : item.category === activeCategory;
      
      if (!query) {
        return item.category === activeCategory;
      }

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(query)) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.ingredients && item.ingredients.some((ing) => ing.toLowerCase().includes(query))) ||
        (item.badgeLabel && item.badgeLabel.toLowerCase().includes(query));

      return matchesSearch && matchesCategory;
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
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-[#530201] selection:text-white bg-[#0d0b0b] text-[#F8F7F5]" dir="rtl">
      {/* Background Ambience with Soft Atmospheric Warm Lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASDnHEbGfEuX9jnYI_MD4hx84yy6pLoqe-nKGYpY0SKsOR0CT809xXXFmZrDZ6pZaKbdunulb9oSL60ICmIN2oohUsS8dUUgSoFm23vAjkYr5GTJ6ff8KSWDELMvPBHkSJcxieLTzF_kHC81W1dtt_mcNW6uZQm97BIvdemb7aJ28Eom0yfNc-XszMr-GNSoU_TRPwokjYokv1BrB90ekO5sfuivfp_Pvf7viT3ns"
          alt="Atmospheric Steakhouse"
          className="w-full h-full object-cover object-center filter blur-md scale-105 opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c]/85 via-[#120e0e]/80 to-[#0a0808]/95" />
        {/* Soft warm radial glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#530201]/15 rounded-full blur-[120px]" />
      </div>

      {/* Main Container (Mobile-first at 390px, responsive up to desktop 1240px) */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Top Navigation Bar (Slim Frosted Glass) */}
        <header className="sticky top-3 z-50 mt-3 w-full">
          <nav className="w-full rounded-2xl bg-[#1b1717]/80 backdrop-blur-xl border border-white/10 px-4 py-3 flex items-center justify-between shadow-2xl transition-all">
            
            {/* Logo Wordmark */}
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveCategory('burgers')}>
              <div className="w-8 h-8 rounded-lg bg-[#530201] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-md border border-white/10">
                M&amp;C
              </div>
              <span className="font-serif-brand tracking-widest text-base sm:text-lg font-bold text-white group-hover:text-amber-100 transition-colors uppercase">
                MEAT &amp; CHEESE
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <button
                onClick={() => {
                  setActiveCategory('burgers');
                  setMenuSearchQuery('');
                }}
                className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                صفحه اصلی
              </button>
              <button
                onClick={() => setMenuSearchQuery('')}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#530201] text-white shadow-md border border-white/10"
              >
                منوی رستوران
              </button>
              <button
                onClick={() => setActiveInfoModal('about')}
                className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                درباره ما
              </button>
              <button
                onClick={() => setActiveInfoModal('gallery')}
                className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                گالری
              </button>
              <button
                onClick={() => setActiveInfoModal('contact')}
                className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                تماس با ما
              </button>

              {/* Direct Switcher to B2B Catalog */}
              {onSwitchToB2B && (
                <button
                  onClick={onSwitchToB2B}
                  className="mr-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="ورود به سامانه تأمین و سفارش‌گذاری اقلام شعب"
                >
                  <UtensilsCrossed size={13} className="text-amber-400" />
                  <span>کاتالوگ اقلام شعب (B2B)</span>
                </button>
              )}
            </div>

            {/* Right Side: Cart Quick Button & Mobile Menu Trigger */}
            <div className="flex items-center gap-2">
              <button
                id="cartBtn"
                onClick={() => setIsCartOpen(true)}
                aria-label="سبد خرید"
                className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white active:scale-95 transition-transform"
              >
                <ShoppingBag className="w-5 h-5 text-stone-200" />
                {totalCartCount > 0 && (
                  <span
                    id="cartCount"
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#530201] text-white text-[11px] font-bold rounded-full flex items-center justify-center border border-white/20 shadow-md animate-in zoom-in"
                  >
                    {totalCartCount.toLocaleString('fa-IR')}
                  </span>
                )}
              </button>

              {/* Mobile Drawer Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white active:scale-95 transition-transform"
                aria-label="منوی موبایل"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </nav>

          {/* Mobile Drawer Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#1b1717]/95 backdrop-blur-2xl border border-white/10 space-y-2.5 shadow-2xl animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => {
                  setActiveCategory('burgers');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right px-3 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/5"
              >
                صفحه اصلی
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-right px-3 py-2 rounded-xl text-sm font-semibold text-white bg-[#530201]"
              >
                منوی رستوران
              </button>
              {onSwitchToB2B && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchToB2B();
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-xl text-sm font-bold text-amber-200 bg-amber-500/15 border border-amber-500/30 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <UtensilsCrossed size={14} className="text-amber-400" />
                    کاتالوگ تأمین مواد اولیه شعب (B2B)
                  </span>
                  <ChevronLeft size={16} />
                </button>
              )}
              <button
                onClick={() => {
                  setActiveInfoModal('about');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right px-3 py-2 rounded-xl text-sm font-medium text-white/80 hover:bg-white/5"
              >
                درباره ما
              </button>
              <button
                onClick={() => {
                  setActiveInfoModal('gallery');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right px-3 py-2 rounded-xl text-sm font-medium text-white/80 hover:bg-white/5"
              >
                گالری تصاویر
              </button>
              <button
                onClick={() => {
                  setActiveInfoModal('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-right px-3 py-2 rounded-xl text-sm font-medium text-white/80 hover:bg-white/5"
              >
                تماس و رزرو میز
              </button>
            </div>
          )}
        </header>

        {/* Menu Header (Centered, Clean & Luxurious) */}
        <section className="mt-8 mb-5 sm:mt-10 sm:mb-6 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs tracking-wider text-amber-200/90 uppercase shadow-sm mb-3">
            <span className="text-amber-400 text-xs">★</span>
            <span className="font-medium">PREMIUM DINING MENU</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            منو
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            طعم‌های اصیل، با بهترین مواد اولیه
          </p>
        </section>

        {/* Menu Search Bar (Prominent Glassmorphism Search Bar) */}
        <section className="max-w-md mx-auto w-full mb-6 px-1">
          <div className="relative w-full group">
            <input
              type="text"
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              placeholder="جستجو در منو (نام غذا، برگر، ساندویچ، سالاد، ترکیبات...)"
              className="w-full rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white/15 border-2 border-white/20 focus:border-[#530201] px-4 py-3 pr-11 pl-10 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none transition-all backdrop-blur-xl shadow-lg"
            />
            {/* Search Icon */}
            <Search className="w-5 h-5 text-amber-200/80 group-focus-within:text-white absolute right-3.5 top-3.5 pointer-events-none transition-colors" />
            
            {/* Clear Button */}
            {menuSearchQuery && (
              <button
                type="button"
                onClick={() => setMenuSearchQuery('')}
                className="absolute left-3.5 top-3 text-stone-400 hover:text-white p-0.5 rounded transition-colors"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {menuSearchQuery.trim() && (
            <div className="flex items-center justify-between mt-2 text-[11px] text-stone-300 px-2">
              <span>نتایج جستجو برای: «{menuSearchQuery}» ({filteredItems.length} غذا یافت شد)</span>
              <button
                onClick={() => setMenuSearchQuery('')}
                className="text-amber-200 hover:underline"
              >
                پاک‌کردن
              </button>
            </div>
          )}
        </section>

        {/* Menu Categories (Segmented Glass Tabs - Horizontally Scrollable on Mobile) */}
        <section className="mb-8 w-full">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-1 gap-2 sm:gap-3 px-1">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id && !menuSearchQuery.trim();
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as MenuCategoryType);
                    setMenuSearchQuery('');
                  }}
                  className={`category-btn whitespace-nowrap px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-[#530201] text-white shadow-lg shadow-[#530201]/40 border border-white/20 font-semibold'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 backdrop-blur-md font-medium'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* MENU ITEM CARDS SECTION */}
        {/* Mobile: 1 Column (390px friendly) | Tablet: 2 Columns | Desktop: 3 Columns */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl glass-card p-10 text-center my-6 max-w-md mx-auto space-y-3">
            <Search className="w-10 h-10 text-stone-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">غذایی مطابق با جستجوی شما یافت نشد</h3>
            <p className="text-xs text-stone-400">
              لطفاً نام غذا یا ماده اولیه دیگری را جستجو نمایید یا فیلتر را پاک کنید.
            </p>
            <button
              onClick={() => {
                setMenuSearchQuery('');
                setActiveCategory('burgers');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#530201] text-white text-xs font-semibold"
            >
              مشاهده منوی برگرها
            </button>
          </div>
        ) : (
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pb-16">
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

        {/* Bottom Sticky Quick Bar for Cart (Matches user's mobile screenshot) */}
        <aside className="fixed bottom-3 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
          <div className="w-full max-w-[420px] rounded-2xl glass-cart-bar p-3 px-4 flex items-center justify-between gap-3 shadow-2xl pointer-events-auto">
            {/* Cart summary status */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="w-9 h-9 rounded-xl bg-[#530201] border border-white/20 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[11px] text-stone-300">
                  <span className="font-bold text-white">
                    {totalCartCount.toLocaleString('fa-IR')} آیتم
                  </span>
                  <span>در سبد سفارش</span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white">
                  {totalCartAmount.toLocaleString('fa-IR')} <span className="text-[10px] font-normal text-stone-400">تومان</span>
                </div>
              </div>
            </div>

            {/* Action checkout button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#530201] hover:bg-[#6c0807] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-[#530201]/40 active:scale-95 transition-all border border-white/15"
            >
              <span>تکمیل و پرداخت</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Minimal Elegant Footer (Directly from user's snippet) */}
        <footer className="mt-auto pt-10 pb-8 border-t border-white/10 text-center px-4 max-w-4xl mx-auto w-full">
          {/* Brandmark with ruby point */}
          <div className="flex items-center justify-center gap-2 mb-2 font-serif-brand text-stone-200 text-sm tracking-widest font-semibold">
            <span>MEAT &amp; CHEESE RESTAURANT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#530201] inline-block shadow-sm" />
          </div>
          {/* Subtitle description */}
          <p className="text-[11px] text-stone-400 mb-2 leading-relaxed">
            تجربه غذایی آرتیزان با استانداردهای بین‌المللی پذیرایی و تأمین تازه
          </p>
          {/* Copyright */}
          <p className="text-[10px] text-stone-500 font-light">
            © ۱۴۰۳ تمامی حقوق محفوظ است
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

      {/* Info Modals (About Us, Gallery, Contact) */}
      {activeInfoModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir="rtl">
          <div className="relative w-full max-w-md rounded-2xl bg-[#181311]/95 border border-white/15 p-6 shadow-2xl text-stone-200 space-y-4">
            <button
              onClick={() => setActiveInfoModal(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-amber-200">
              <Award className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">درباره رستوران MEAT &amp; CHEESE</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              رستوران میت اند چیز تلفیقی از قصابی آرتیزان، اتاق‌های ایجینگ گوشت تحت کنترل برودتی نمک هیمالیا و انبار پنیرهای کهنه‌شده طبیعی است. ما بر این باوریم که هر تکه گوشت و هر گرم پنیر داستانی از اصالت، زمان و مهارت سرآشپز را بازگو می‌کند.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-400 space-y-1">
              <div>• گوشت‌های ایج‌شده خشک تا ۳۵ روز در سالن اختصاصی</div>
              <div>• نان‌های خمیرترش و بریوش پخت روزانه</div>
              <div>• پنیرهای دست‌ساز طبیعی و بدون افزودنی صنعتی</div>
            </div>
          </div>
        </div>
      )}

      {activeInfoModal === 'gallery' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir="rtl">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#181311]/95 border border-white/15 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveInfoModal(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-bold text-white text-base">گالری فضای رستوران و کات‌ها</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASDnHEbGfEuX9jnYI_MD4hx84yy6pLoqe-nKGYpY0SKsOR0CT809xXXFmZrDZ6pZaKbdunulb9oSL60ICmIN2oohUsS8dUUgSoFm23vAjkYr5GTJ6ff8KSWDELMvPBHkSJcxieLTzF_kHC81W1dtt_mcNW6uZQm97BIvdemb7aJ28Eom0yfNc-XszMr-GNSoU_TRPwokjYokv1BrB90ekO5sfuivfp_Pvf7viT3ns"
                alt="سالن رستوران"
                className="w-full h-32 rounded-xl object-cover border border-white/10"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2GvEX3Tv2SA8C6zpfxBdkWFbdYBxN2NZe3SwPFb35TqRVMyFGfAf6mxmYEow0m_jAx_4yTJ8HM5ODYy7EpMLKip12LWhDaaq1ocwDPOZJcw8faUHy71kelmQwiE6l0Sd587tCdPbMS7cl1CNWq2Ks-8nDbZDYc7nHqwAlcTRX9wK67IkZiWmDOyUf_3buulJxfQmbi__WDrkLcP3eXxnWsB2T4hsBiX1ifoTlQw"
                alt="برگر اسمش"
                className="w-full h-32 rounded-xl object-cover border border-white/10"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE5bO6eQgRnSrntozVVClTWEZpO8Ec33Lv4f_G9ruKXGNrSOHTrL7rS--_BbPJZr4mU_Qjd-66An_DQWg2QpxH97E2g2F16V2c7D50dB-2KIBxKk5fqqvoQa7geuob2HPiJyln36CqYggT-YdVfsdepExK_3QrgH2g9xhZzaTX_Tqcx1bZk7pcnpDlRAKdXyFFbJxBLtTr7hKEVtxKmbkD9sJstMY3rEQmN9Ald48"
                alt="پاسترامی"
                className="w-full h-32 rounded-xl object-cover border border-white/10"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4mn_zDdPrc-eaKoJj73Jk_GLFHp0N6aGvVaA6gHWUv4TyXyT6pBEzNiVZ81tgMroCSqWJPvzLEEj-nUJBB4rWQ4fmqNpbb_7uTjYvmqUoyBfV3pEAPnimuFGJbkIE9dywXqKwKwI-PiUo3JuzGUeRP8iSbJ6frCAmqrcpBhp731-cYSk8PMN48VgGzqun0LMFvAEBu1akFoq-c0zmROFslUDn4k2yx1r51NGMmyo"
                alt="سالاد سزار"
                className="w-full h-32 rounded-xl object-cover border border-white/10"
              />
            </div>
          </div>
        </div>
      )}

      {activeInfoModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir="rtl">
          <div className="relative w-full max-w-md rounded-2xl bg-[#181311]/95 border border-white/15 p-6 shadow-2xl text-stone-200 space-y-4">
            <button
              onClick={() => setActiveInfoModal(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-bold text-white text-base">اطلاعات تماس و رزرو میز</h3>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#530201] shrink-0 mt-0.5" />
                <span>تهران، خیابان فرشته، پلاک ۲۸، مجموعه بوتیک داینینگ میت اند چیز</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#530201] shrink-0" />
                <span dir="ltr">+98 (21) 2200 4580</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#530201] shrink-0" />
                <span>ساعات سرویس‌دهی: همه روزه از ۱۲:۰۰ ظهر الی ۲۳:۴۵ شب</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
