export type ScreenView = 
  | 'login'
  | 'dashboard'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'payment-gateway'
  | 'payment-success'
  | 'payment-failed'
  | 'branch-info'
  | 'owner-login'
  | 'owner-orders';

export type UserRole = 'branch' | 'owner';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'all' | 'protein' | 'vegetables' | 'sauces' | 'cheese' | 'bakery' | 'apparel';
  categoryLabel: string;
  unit: string;
  unitPrice: number; // in Tomans
  cartonPrice?: number;
  cartonCount?: number;
  weightGrams?: number;
  description: string;
  storageTemp: string;
  inStock: boolean;
  image: string;
  specs?: string[];
  maxWeeklyQuota?: number;
}

export interface CartItem {
  product: Product;
  quantity: number; // Number of units/cartons
}

export interface OrderItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'in_transit' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid_online' | 'branch_credit' | 'cycle_settlement' | 'failed' | 'processing';

export interface Order {
  id: string;
  orderNumber: string; // e.g. MC-104-9842
  trackingCode?: string; // TRK-98321045
  rrn?: string; // 7284019245
  branchId: string;
  branchName: string;
  createdAt: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  deliveryStatus: OrderStatus;
  items: OrderItem[];
  driverName?: string;
  driverPhone?: string;
  truckPlate?: string;
  currentTemp?: string;
  estimatedDelivery?: string;
}

export interface BranchProfile {
  id: string;
  code: string;
  name: string;
  manager: string;
  phone: string;
  address: string;
  proteinQuotaKg: number;
  usedProteinQuotaKg: number;
  cheeseQuotaKg: number;
  usedCheeseQuotaKg: number;
  creditBalance: number;
  deliveryShift: string;
}
