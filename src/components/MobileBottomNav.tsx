import React from 'react';
import { LayoutDashboard, Layers, ShoppingBag, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenView } from '../types';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, cartUniqueCount } = useApp();

  const tabs: { id: ScreenView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={18} /> },
    { id: 'catalog', label: 'کاتالوگ', icon: <Layers size={18} /> },
    { id: 'cart', label: 'سبد خرید', icon: <ShoppingBag size={18} />, badge: cartUniqueCount },
    { id: 'branch-info', label: 'شعبه', icon: <Building2 size={18} /> },
  ];

  // Do not show bottom nav on payment gateway screen for focus
  if (currentView === 'payment-gateway') {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E6E3] px-2 py-1 shadow-2xs safe-area-bottom">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {tabs.map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive ? 'text-[#530201] font-semibold' : 'text-[#777777] hover:text-[#242424]'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -left-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#530201] text-white text-[9px] font-mono flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#530201] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
