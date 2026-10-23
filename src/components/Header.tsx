import React from 'react';
import { Menu, ShoppingBag, ChevronLeft } from 'lucide-react';
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
        {/* Right Zone: Mobile toggle or clean breadcrumb */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 -mr-1 text-[#242424] hover:bg-[#F1EFEC] rounded transition-colors"
            aria-label="منو"
          >
            <Menu size={18} />
          </button>

          {/* Mobile brand icon when sidebar is hidden */}
          <div className="md:hidden flex items-center gap-1.5">
            <BrandLogo variant="burgundy" size="sm" />
          </div>

          {/* Desktop breadcrumb */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#777777]">
            <span>سامانه تأمین</span>
            <ChevronLeft size={12} className="text-[#8a716e]" />
            <span className="text-[#242424] font-medium">{getViewTitle()}</span>
          </div>
        </div>

        {/* Center Zone: Warehouse / Dispatch Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FAF9F7] border border-[#E8E6E3] rounded text-[11px] text-[#242424]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>انبار مرکزی فعال · ارسال روز</span>
        </div>

        {/* Left Zone: Cart Trigger + Manager */}
        <div className="flex items-center gap-2">
          {/* Cart Pill */}
          <button
            onClick={() => setCurrentView('cart')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
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

          {/* User Profile Mini */}
          <div className="hidden md:flex items-center gap-1.5 pr-2 border-r border-[#E8E6E3] text-right">
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
