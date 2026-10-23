import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  Plus,
  ChevronLeft,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, formatPrice } from '../data/mockData';
import { BrandPattern } from './BrandPattern';
import { Product } from '../types';

export const DashboardView: React.FC = () => {
  const {
    setCurrentView,
    orders,
    addToCart,
    openProductDetail,
    branch,
    setActiveOrder,
  } = useApp();

  // Local quantities for the 4 quick reorder cards
  const [quickQuantities, setQuickQuantities] = useState<Record<string, number>>({
    'prod-2': 2,
    'prod-4': 3,
    'prod-5': 8,
    'prod-8': 4,
  });

  const [addedToast, setAddedToast] = useState<string | null>(null);

  const handleQuickQtyChange = (prodId: string, delta: number) => {
    setQuickQuantities(prev => ({
      ...prev,
      [prodId]: Math.max(1, (prev[prodId] || 1) + delta),
    }));
  };

  const handleQuickAdd = (product: Product) => {
    const qty = quickQuantities[product.id] || 1;
    addToCart(product, qty);
    setAddedToast(`${product.name} (${qty} واحد) اضافه شد`);
    setTimeout(() => setAddedToast(null), 2000);
  };

  const quickOrderProducts = [
    PRODUCTS[1], // گوشت 200 گرمی
    PRODUCTS[3], // پنیر چدار
    PRODUCTS[4], // نان بریوش
    PRODUCTS[7], // سس انتروکت
  ];

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid_online':
        return (
          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
            تأیید آنلاین
          </span>
        );
      case 'branch_credit':
        return (
          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
            اعتباری شعبه
          </span>
        );
      case 'cycle_settlement':
        return (
          <span className="text-[10px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
            تسویه دوره
          </span>
        );
      default:
        return null;
    }
  };

  const getDeliveryBadge = (status: string) => {
    switch (status) {
      case 'preparing':
        return (
          <span className="text-[10px] text-slate-700 bg-[#F1EFEC] px-1.5 py-0.5 rounded">
            در حال آماده‌سازی
          </span>
        );
      case 'in_transit':
        return (
          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
            ارسال امروز
          </span>
        );
      case 'delivered':
        return (
          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
            تحویل شد
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 pb-20 md:pb-8 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#2C0000] text-white px-3 py-1.5 rounded text-[11px] font-medium shadow-sm flex items-center gap-1.5">
          <Check size={14} className="text-emerald-400" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Sleek Minimalist Welcome Banner */}
      <div className="relative overflow-hidden rounded-md bg-[#530201] text-white p-5 md:p-6 shadow-2xs">
        <BrandPattern variant="overlay" opacity={0.06} invert />

        <div className="relative z-10 space-y-2">
          {/* Top meta */}
          <div className="flex items-center gap-2 text-[10px] text-white/70">
            <span>{branch.name}</span>
            <span>·</span>
            <span>کد {branch.code}</span>
            <span>·</span>
            <span className="font-mono">22 آبان 1403</span>
          </div>

          {/* Headline */}
          <h1 className="text-base md:text-lg font-bold tracking-tight text-white">
            سلام، به پنل تامین {branch.name} خوش آمدید
          </h1>

          {/* User Requested Exact Notice */}
          <p className="text-xs text-white/85 font-light">
            مهلت ثبت سفارش تا ساعت 22 میباشد.
          </p>

          {/* Clean Primary Actions */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              onClick={() => setCurrentView('catalog')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-[#530201] hover:bg-neutral-100 rounded text-xs font-semibold transition-colors"
            >
              <Plus size={14} />
              <span>ثبت سفارش جدید</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Metric Cards (2 Active KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white border border-[#E8E6E3] rounded-md p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#777777] mb-1">
            <span className="text-[11px]">در حال آماده‌سازی</span>
            <Package size={14} />
          </div>
          <div className="my-0.5">
            <span className="text-xl md:text-2xl font-bold font-mono text-[#242424]">1</span>
            <span className="text-[11px] text-[#777777] mr-1">محموله</span>
          </div>
          <div className="text-[10px] text-[#777777] pt-1.5 border-t border-[#F1EFEC]">
            انبار مرکزی کرج
          </div>
        </div>

        <div className="bg-white border border-[#E8E6E3] rounded-md p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#777777] mb-1">
            <span className="text-[11px]">تحویل ماه جاری</span>
            <CheckCircle2 size={14} className="text-emerald-700" />
          </div>
          <div className="my-0.5">
            <span className="text-xl md:text-2xl font-bold font-mono text-[#242424]">18</span>
            <span className="text-[11px] text-[#777777] mr-1">سفارش</span>
          </div>
          <div className="text-[10px] text-[#777777] pt-1.5 border-t border-[#F1EFEC]">
            انطباق کامل کیفی
          </div>
        </div>
      </div>

      {/* Recent Orders Minimal Table */}
      <div className="bg-white border border-[#E8E6E3] rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E8E6E3] flex items-center justify-between">
          <div>
            <h2 className="text-xs md:text-sm font-bold text-[#242424]">آخرین سفارش‌های شعبه</h2>
          </div>
          <button
            onClick={() => setCurrentView('catalog')}
            className="text-[11px] font-medium text-[#530201] hover:underline inline-flex items-center gap-1"
          >
            <span>ثبت سفارش</span>
            <ChevronLeft size={12} />
          </button>
        </div>

        {/* Desktop Table with smaller, refined typography */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#FAF9F7] text-[#777777] font-medium text-[11px]">
              <tr>
                <th className="py-2.5 px-3.5">شماره سفارش</th>
                <th className="py-2.5 px-3.5">تاریخ ثبت</th>
                <th className="py-2.5 px-3.5">مبلغ کل (تومان)</th>
                <th className="py-2.5 px-3.5">وضعیت پرداخت</th>
                <th className="py-2.5 px-3.5">وضعیت ارسال</th>
                <th className="py-2.5 px-3.5 text-center">فاکتور</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E6E3] text-xs">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF9F7] transition-colors">
                  <td className="py-2.5 px-3.5 font-mono text-[#242424]">
                    {ord.orderNumber}
                  </td>
                  <td className="py-2.5 px-3.5 text-[#777777] font-mono text-[11px]">{ord.createdAt}</td>
                  <td className="py-2.5 px-3.5 font-mono font-medium text-[#242424]">
                    {formatPrice(ord.totalAmount)}
                  </td>
                  <td className="py-2.5 px-3.5">{getPaymentBadge(ord.paymentStatus)}</td>
                  <td className="py-2.5 px-3.5">{getDeliveryBadge(ord.deliveryStatus)}</td>
                  <td className="py-2.5 px-3.5 text-center">
                    <button
                      onClick={() => {
                        setActiveOrder(ord);
                        setCurrentView('checkout');
                      }}
                      className="px-2 py-1 text-[11px] text-[#530201] hover:bg-[#530201]/5 rounded border border-[#530201]/20 transition-colors"
                    >
                      مشاهده فاکتور
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-[#E8E6E3]">
          {orders.map((ord) => (
            <div key={ord.id} className="p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-[#242424]">
                  {ord.orderNumber}
                </span>
                <span className="text-[10px] text-[#777777] font-mono">{ord.createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#242424]">
                  {formatPrice(ord.totalAmount)} تومان
                </span>
                <div className="flex items-center gap-1.5">
                  {getPaymentBadge(ord.paymentStatus)}
                  {getDeliveryBadge(ord.deliveryStatus)}
                </div>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    setActiveOrder(ord);
                    setCurrentView('checkout');
                  }}
                  className="w-full py-1 text-[11px] text-center border border-[#530201]/20 text-[#530201] rounded font-medium hover:bg-[#530201]/5 transition-colors"
                >
                  مشاهده فاکتور
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reorder Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs md:text-sm font-bold text-[#242424]">
            سفارش سریع اقلام پرمصرف
          </h2>
          <span className="text-[10px] text-[#777777]">
            نرخ رسمی مصوب
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickOrderProducts.map((prod) => {
            const qty = quickQuantities[prod.id] || 1;
            return (
              <div
                key={prod.id}
                className="bg-white border border-[#E8E6E3] rounded-md overflow-hidden flex flex-col justify-between hover:border-[#530201]/30 transition-all group"
              >
                <div>
                  <div
                    onClick={() => openProductDetail(prod)}
                    className="relative h-32 bg-[#F1EFEC] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                    />
                    <div className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">
                      {prod.storageTemp}
                    </div>
                  </div>

                  <div className="p-2.5 space-y-0.5">
                    <span className="text-[10px] text-[#777777] block">{prod.categoryLabel}</span>
                    <h3
                      onClick={() => openProductDetail(prod)}
                      className="text-xs font-semibold text-[#242424] hover:text-[#530201] transition-colors cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-[10px] text-[#777777]">{prod.unit}</p>

                    <div className="pt-1 font-mono text-[11px] font-bold text-[#242424]">
                      {formatPrice(prod.unitPrice)}{' '}
                      <span className="text-[9px] font-sans font-normal text-[#777777]">تومان</span>
                    </div>
                  </div>
                </div>

                {/* Minimal Stepper + Add */}
                <div className="p-2 border-t border-[#F1EFEC] flex items-center gap-1.5">
                  <div className="flex items-center border border-[#E8E6E3] rounded bg-[#FAF9F7] h-7 px-1">
                    <button
                      onClick={() => handleQuickQtyChange(prod.id, 1)}
                      className="w-5 h-full flex items-center justify-center text-[#530201] font-bold text-xs"
                      aria-label="افزایش"
                    >
                      +
                    </button>
                    <span className="w-5 text-center font-mono font-medium text-xs text-[#242424]">
                      {qty}
                    </span>
                    <button
                      onClick={() => handleQuickQtyChange(prod.id, -1)}
                      className="w-5 h-full flex items-center justify-center text-[#530201] font-bold text-xs"
                      aria-label="کاهش"
                    >
                      -
                    </button>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(prod)}
                    className="flex-1 h-7 bg-[#530201] hover:bg-[#400101] text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center"
                  >
                    <span>افزودن</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
