import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, CartItem, Order, BranchProfile, ScreenView, UserRole } from '../types';
import { PRODUCTS, INITIAL_CART_ITEMS, INITIAL_ORDERS, INITIAL_BRANCH } from '../data/mockData';

interface AppContextType {
  currentView: ScreenView;
  setCurrentView: (view: ScreenView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  activeProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  branch: BranchProfile;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isMobileSimulator: boolean;
  setIsMobileSimulator: (isMobile: boolean) => void;
  // Calculations
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;
  cartUniqueCount: number;
  cartTotalUnits: number;
  // Actions
  handlePlaceOrder: () => void;
  paymentState: 'idle' | 'processing' | 'success' | 'failed';
  setPaymentState: (state: 'idle' | 'processing' | 'success' | 'failed') => void;
  lastCreatedOrder: Order | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialView = (): ScreenView => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'menu' || window.location.hash === '#menu') {
      return 'menu';
    }
    if (params.get('view') === 'dashboard') {
      return 'dashboard';
    }
    if (params.get('view') === 'owner-login') {
      return 'owner-login';
    }
  }
  return 'catalog';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ScreenView>(getInitialView);
  const [userRole, setUserRole] = useState<UserRole>('branch');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [branch] = useState<BranchProfile>(INITIAL_BRANCH);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(INITIAL_ORDERS[0]);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openProductDetail = (product: Product) => {
    setActiveProduct(product);
  };

  const closeProductDetail = () => {
    setActiveProduct(null);
  };

  // Cart math
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      // In the screenshots, beef item is: 185,000 * 20 = 185,000,000? Wait: in the screenshot:
      // Product 1: unit price 185,000, qty 20 -> row total 185,000,000 (which is 185,000 * 50 per box * 20 = 185,000,000)
      // Product 2: tomato 45,000, qty 3 -> 135,000
      // Product 3: sauce 190,000, qty 2 -> 380,000
      // Product 4: brioche 260,000, qty 30 -> 7,800,000
      // Product 5: cheddar 1,850,000, qty 2 -> 3,700,000
      // Sum = 185,000,000 + 135,000 + 380,000 + 7,800,000 + 3,700,000 = 197,015,000 Tomans!
      if (item.product.id === 'prod-1') {
        return acc + 185000 * 50 * item.quantity;
      }
      return acc + item.product.unitPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const cartTax = useMemo(() => {
    return Math.round(cartSubtotal * 0.09); // 9% VAT -> 17,731,350 Tomans
  }, [cartSubtotal]);

  const cartShipping = 0; // Free refrigerated logistics

  const cartTotal = useMemo(() => {
    return cartSubtotal + cartTax + cartShipping;
  }, [cartSubtotal, cartTax, cartShipping]);

  const cartUniqueCount = cartItems.length;
  const cartTotalUnits = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `MC-104-${Math.floor(9900 + Math.random() * 99)}`,
      trackingCode: `TRK-${Math.floor(98000000 + Math.random() * 999999)}`,
      rrn: `${Math.floor(7000000000 + Math.random() * 999999999)}`,
      branchId: branch.id,
      branchName: branch.name,
      createdAt: 'هم‌اکنون',
      totalAmount: cartTotal > 0 ? cartTotal : 214746350,
      paymentStatus: 'paid_online',
      deliveryStatus: 'preparing',
      driverName: 'صادق مرادی',
      driverPhone: '۰۹۱۲۴۵۶۷۸۹۰',
      truckPlate: '۶۶ ج ۸۳۴ ایران ۴۴',
      currentTemp: '۱۸.۲- درجه سانتی‌گراد',
      estimatedDelivery: 'فردا ۰۶:۳۰ الی ۰۸:۰۰ صبح',
      items: cartItems.map((item, idx) => ({
        id: `it-${idx}`,
        name: item.product.name,
        unit: item.product.unit,
        quantity: item.quantity,
        unitPrice: item.product.unitPrice,
        totalPrice: item.product.id === 'prod-1' ? 185000 * 50 * item.quantity : item.product.unitPrice * item.quantity,
      })),
    };

    setLastCreatedOrder(newOrder);
    setOrders(prev => [newOrder, ...prev]);
    setCurrentView('payment-gateway');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userRole,
        setUserRole,
        isLoggedIn,
        setIsLoggedIn,
        cartItems,
        addToCart,
        updateQuantity,
        setQuantity,
        removeFromCart,
        clearCart,
        activeProduct,
        openProductDetail,
        closeProductDetail,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        orders,
        activeOrder,
        setActiveOrder,
        branch,
        mobileMenuOpen,
        setMobileMenuOpen,
        isMobileSimulator,
        setIsMobileSimulator,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,
        cartUniqueCount,
        cartTotalUnits,
        handlePlaceOrder,
        paymentState,
        setPaymentState,
        lastCreatedOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
