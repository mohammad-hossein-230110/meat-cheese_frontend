import React from 'react';
import { Menu, ShoppingBag, ChevronLeft, UtensilsCrossed } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartUniqueCount,
    cartTotal,
    setMobileMenuOpen,
    branch,
  } = useApp();

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'داشبورد';
      case 'catalog':
        return 'کاتالوگ اقلام';
      case 'cart':
        return 'سبد خرید';
      case 'checkout':
        return 'فاکتور تسویه';
      case 'payment-gateway':
        return 'درگاه پرداخت';
      case 'payment-success':
        return 'رسید پرداخت';
      case 'payment-failed':
        return 'خطای پرداخت';
      case 'branch-info':
        return 'اطلاعات شعبه';
      case 'owner-orders':
        return 'سفارش‌های شعب (مدیریت کل)';
      case 'owner-login':
        return 'ورود مدیریت مرکزی';
      default:
        return 'سامانه تأمین';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#E8E6E3] px-3.5 md:px-5 py-2.5 select-none">
      <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto">
        {/* Right Zone: Mobile toggle & Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 -mr-1 text-[#242424] hover:bg-[#F1EFEC] rounded transition-colors"
            aria-label="منو"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-1.5">
            <BrandLogo variant="burgundy" size="sm" />
          </div>

          {/* Desktop Direct Nav: Core 3 Sections */}
          <nav className="hidden md:flex items-center gap-1 pr-3 border-r border-[#E8E6E3]">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-[#530201] text-white font-semibold shadow-xs'
                  : 'text-[#555555] hover:text-[#242424] hover:bg-[#F1EFEC]'
              }`}
            >
              سفارش‌ها
            </button>
            <button
              onClick={() => setCurrentView('catalog')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentView === 'catalog'
                  ? 'bg-[#530201] text-white font-semibold shadow-xs'
                  : 'text-[#555555] hover:text-[#242424] hover:bg-[#F1EFEC]'
              }`}
            >
              کاتالوگ محصولات
            </button>
            <button
              onClick={() => setCurrentView('branch-info')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentView === 'branch-info'
                  ? 'bg-[#530201] text-white font-semibold shadow-xs'
                  : 'text-[#555555] hover:text-[#242424] hover:bg-[#F1EFEC]'
              }`}
            >
              پروفایل
            </button>
          </nav>
        </div>

        {/* Left Zone: Cart Trigger + Standalone Menu + Profile Mini */}
        <div className="flex items-center gap-2">
          {/* Standalone Restaurant Menu Link */}
          <button
            onClick={() => setCurrentView('menu')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-[#FAF9F7] hover:bg-[#F1EFEC] text-[#530201] border border-[#E8E6E3] hover:border-[#530201] transition-colors cursor-pointer"
            title="مشاهده منوی رستوران"
          >
            <UtensilsCrossed size={13} className="text-[#9E7D56]" />
            <span className="hidden sm:inline">منوی رستوران</span>
            <span className="sm:hidden">منو</span>
          </button>

          {/* Cart Pill */}
          <button
            onClick={() => setCurrentView('cart')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              currentView === 'cart'
                ? 'bg-[#530201] text-white'
                : 'bg-[#FAF9F7] hover:bg-[#F1EFEC] text-[#242424] border border-[#E8E6E3]'
            }`}
          >
            <ShoppingBag size={14} />
            <span className="font-mono font-bold text-[11px]">{cartUniqueCount}</span>
            <span className="text-current opacity-30">|</span>
            <span className="font-mono font-medium text-[11px]">
              {formatPrice(cartTotal)} <span className="font-sans text-[9px] font-normal opacity-80">تومان</span>
            </span>
          </button>

          {/* User Profile Mini (Quick click to Profile) */}
          <div
            onClick={() => setCurrentView('branch-info')}
            className="hidden sm:flex items-center gap-1.5 pr-2 border-r border-[#E8E6E3] text-right cursor-pointer hover:opacity-80 transition-opacity"
            title="مشاهده پروفایل شعبه"
          >
            <div className="w-6 h-6 rounded bg-[#530201] text-white flex items-center justify-center text-[10px] font-medium">
              ع‌ر
            </div>
            <div>
              <div className="text-[11px] font-medium text-[#242424] leading-tight">{branch.manager}</div>
              <div className="text-[9px] text-[#777777] font-mono leading-tight">کد {branch.code}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
