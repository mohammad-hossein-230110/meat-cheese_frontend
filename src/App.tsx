import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DashboardView } from './components/DashboardView';
import { CatalogView } from './components/CatalogView';
import { CartView } from './components/CartView';
import { CheckoutInvoiceView } from './components/CheckoutInvoiceView';
import { PaymentGatewayView } from './components/PaymentGatewayView';
import { PaymentSuccessView } from './components/PaymentSuccessView';
import { PaymentFailedView } from './components/PaymentFailedView';
import { BranchInfoView } from './components/BranchInfoView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LoginView } from './components/LoginView';
import { OwnerLoginView } from './components/OwnerLoginView';
import { OwnerOrdersView } from './components/OwnerOrdersView';
import { ArtisanMenuView } from './components/menu/ArtisanMenuView';

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isLoggedIn,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useApp();

  // Standalone Menu section (completely isolated from owner & branch portal)
  if (currentView === 'menu') {
    return <ArtisanMenuView onSwitchToB2B={() => setCurrentView('catalog')} />;
  }

  // Owner dedicated screens
  if (currentView === 'owner-login') {
    return <OwnerLoginView />;
  }

  if (currentView === 'owner-orders') {
    return <OwnerOrdersView />;
  }

  // If user is logged out or visiting login
  if (!isLoggedIn || currentView === 'login') {
    return <LoginView />;
  }

  // Render current screen content
  const renderScreen = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'catalog':
        return <CatalogView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutInvoiceView />;
      case 'payment-gateway':
        return <PaymentGatewayView />;
      case 'payment-success':
        return <PaymentSuccessView />;
      case 'payment-failed':
        return <PaymentFailedView />;
      case 'branch-info':
        return <BranchInfoView />;
      default:
        return <DashboardView />;
    }
  };

  // Standard Responsive Full Layout (Mobile-first with scaling to full Desktop)
  return (
    <div className="min-h-screen bg-[#F8F7F5] flex overflow-x-hidden" dir="rtl">
      {/* Mobile Sliding Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-xl">
            <Sidebar isMobileDrawer />
          </div>
        </div>
      )}

      {/* Persistent Desktop Sidebar (On RIGHT side in RTL as first flex item) */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Workspace (On LEFT side in RTL as second flex item) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Header */}
        <Header />

        {/* Viewport Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderScreen()}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />

      {/* Product Detail Modal */}
      <ProductDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
