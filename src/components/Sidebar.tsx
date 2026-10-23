import React from 'react';
import {
  LayoutDashboard,
  Layers,
  ShoppingCart,
  Building2,
  LogOut,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { BrandPattern } from './BrandPattern';
import { ScreenView } from '../types';

interface SidebarProps {
  isMobileDrawer?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileDrawer = false }) => {
  const {
    currentView,
    setCurrentView,
    cartUniqueCount,
    setMobileMenuOpen,
    setIsLoggedIn,
    branch,
  } = useApp();

  const navItems: { id: ScreenView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={15} /> },
    { id: 'catalog', label: 'کاتالوگ و ثبت سفارش', icon: <Layers size={15} /> },
    { id: 'cart', label: 'سبد خرید', icon: <ShoppingCart size={15} />, badge: cartUniqueCount },
    { id: 'branch-info', label: 'اطلاعات شعبه', icon: <Building2 size={15} /> },
  ];

  const handleNavClick = (view: ScreenView) => {
    setCurrentView(view);
    if (isMobileDrawer) {
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    if (isMobileDrawer) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <aside
      className={`relative flex flex-col justify-between bg-[#2C0000] text-white/90 select-none overflow-hidden h-full ${
        isMobileDrawer ? 'w-full' : 'w-64 shrink-0 border-l border-white/10'
      }`}
    >
      {/* Brand Identity Pattern subtle watermark in sidebar */}
      <BrandPattern variant="watermark" opacity={0.04} invert />

      {/* Top Section */}
      <div className="relative z-10 flex flex-col">
        {/* Brand Header */}
        <div className="pt-6 pb-5 px-5 border-b border-white/10 flex flex-col items-center text-center relative">
          {isMobileDrawer && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute left-3 top-4 p-1.5 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors"
              aria-label="بستن منو"
            >
              <X size={18} />
            </button>
          )}

          {/* Replaced MEAT & CHEESE with User's Brand Logo */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="flex flex-col items-center focus:outline-none group"
          >
            <BrandLogo variant="light" size="md" />
            <span className="text-[10px] tracking-wider text-[#E4C8B5] mt-1.5 font-normal opacity-85">
              سامانه تدارکات و تأمین زنجیره
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-2.5 space-y-1" dir="rtl">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all duration-150 ${
                  isActive
                    ? 'bg-[#530201] text-white font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5 font-normal'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-white/50'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white text-[#530201] font-bold'
                        : 'bg-white/15 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 p-3.5 border-t border-white/10 space-y-2.5">
        {/* Branch Info Card */}
        <div className="bg-black/20 rounded p-2.5 text-right">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-medium text-white">{branch.name}</span>
            </div>
            <span className="text-[9px] font-mono text-white/60 bg-white/10 px-1 py-0.2 rounded">
              کد {branch.code}
            </span>
          </div>
          <p className="text-[10px] text-white/50">مدیر شعبه: {branch.manager}</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-white/50 hover:text-white hover:bg-white/5 rounded transition-colors"
        >
          <LogOut size={12} />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
};
