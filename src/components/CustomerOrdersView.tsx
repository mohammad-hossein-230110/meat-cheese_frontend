import React, { useState } from 'react';
import { Package, Clock, CheckCircle2, ChevronLeft, ArrowRight, Eye, Calendar, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits, formatPersianPrice } from '../utils/formatters';

interface CustomerOrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'preparing' | 'in_transit' | 'cancelled';
  statusText: string;
  itemsSummary: string;
  itemsCount: number;
  totalPrice: number;
  deliveryAddress: string;
}

export const CustomerOrdersView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'delivered'>('all');

  const orders: CustomerOrderRecord[] = [
    {
      id: 'ord-101',
      orderNumber: 'MC-2408',
      date: 'امروز، ساعت ۱۳:۴۵',
      status: 'in_transit',
      statusText: 'پیک در مسیر تحویل',
      itemsSummary: 'برگر ۲۰۰ گرمی اسمش (۲ عدد) + ساندویچ پاسترامی نیویورکی (۱ عدد)',
      itemsCount: 3,
      totalPrice: 780000,
      deliveryAddress: 'الهیه، خیابان فرشته، پلاک ۲۴، واحد ۶',
    },
    {
      id: 'ord-102',
      orderNumber: 'MC-2395',
      date: 'دیروز، ساعت ۲۰:۱۵',
      status: 'delivered',
      statusText: 'تحویل داده شد',
      itemsSummary: 'ریب‌آی ایج خشک ۳۵ روزه + سالاد سزار فیله گریل‌شده + اکسیر بهارنارنج',
      itemsCount: 3,
      totalPrice: 1220000,
      deliveryAddress: 'الهیه، خیابان فرشته، پلاک ۲۴، واحد ۶',
    },
    {
      id: 'ord-103',
      orderNumber: 'MC-2350',
      date: '۴ آبان ۱۴۰۳، ساعت ۲۱:۳۰',
      status: 'delivered',
      statusText: 'تحویل داده شد',
      itemsSummary: 'تخته گرند اپیکیورین + برگر بیکن دودی افرا (۲ عدد) + لیموناد دودی',
      itemsCount: 4,
      totalPrice: 1560000,
      deliveryAddress: 'الهیه، خیابان فرشته، پلاک ۲۴، واحد ۶',
    },
  ];

  const filteredOrders = orders.filter((o) => {
    if (filter === 'all') return true;
    if (filter === 'ongoing') return o.status === 'preparing' || o.status === 'in_transit';
    if (filter === 'delivered') return o.status === 'delivered';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#121010] text-[#f7f5f2] flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#1c1817]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shrink-0">
              M&amp;C
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-[#f7f5f2] truncate">تاریخچه سفارش‌ها</h1>
              <p className="text-[10px] text-[#a8a09b] truncate">لیست و وضعیت سفارش‌های شما</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setCurrentView('customer-profile')}
              className="text-[11px] sm:text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              پروفایل من
            </button>
            <button
              onClick={() => setCurrentView('menu')}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-[#f7f5f2] bg-[#6b0d0c] px-2.5 sm:px-3 py-1.5 rounded-lg shadow-burgundy-glow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>منوی رستوران</span>
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 my-4 space-y-5">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.08)] pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              filter === 'all'
                ? 'bg-[#6b0d0c] text-white shadow-sm'
                : 'bg-[#1c1817] text-[#a8a09b] hover:text-white border border-[rgba(255,255,255,0.06)]'
            }`}
          >
            همه سفارش‌ها ({orders.length})
          </button>
          <button
            onClick={() => setFilter('ongoing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              filter === 'ongoing'
                ? 'bg-[#6b0d0c] text-white shadow-sm'
                : 'bg-[#1c1817] text-[#a8a09b] hover:text-white border border-[rgba(255,255,255,0.06)]'
            }`}
          >
            سفارش‌های در حال انجام (۱)
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              filter === 'delivered'
                ? 'bg-[#6b0d0c] text-white shadow-sm'
                : 'bg-[#1c1817] text-[#a8a09b] hover:text-white border border-[rgba(255,255,255,0.06)]'
            }`}
          >
            تحویل‌شده‌ها (۲)
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isOngoing = order.status === 'in_transit' || order.status === 'preparing';
            return (
              <div
                key={order.id}
                className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 hover:border-[rgba(255,255,255,0.16)] transition-all space-y-4 shadow-lg"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#241f1e] flex items-center justify-center text-[#ffb4ab]">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#f7f5f2]">
                          کد سفارش: {toPersianDigits(order.orderNumber)}
                        </span>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                            isOngoing
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20 animate-pulse'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {order.statusText}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7d7570] flex items-center gap-1 mt-0.5">
                        <Calendar size={12} />
                        {toPersianDigits(order.date)}
                      </span>
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-base font-bold text-[#ffb4ab]">
                      {formatPersianPrice(order.totalPrice)}
                    </span>
                    <span className="text-[11px] text-[#a8a09b] mr-1">تومان</span>
                  </div>
                </div>

                {/* Items & Address */}
                <div className="space-y-1.5 text-xs text-[#a8a09b]">
                  <p className="text-[#f7f5f2] font-medium leading-relaxed">
                    {order.itemsSummary}
                  </p>
                  <p className="text-[11px] text-[#7d7570]">
                    مقصد تحویل: {order.deliveryAddress}
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-[11px] text-[#ffb4ab] flex items-center gap-1">
                    <Sparkles size={13} className="shrink-0" />
                    <span>+۴۵ امتیاز وفاداری ثبت شد</span>
                  </span>

                  <button
                    onClick={() => setCurrentView('customer-invoice')}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241f1e] hover:bg-[#2c2929] text-xs text-[#f7f5f2] font-medium border border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer whitespace-nowrap self-stretch sm:self-auto shrink-0"
                  >
                    <Eye size={14} className="text-[#a8a09b]" />
                    <span>مشاهده فاکتور و جزئیات</span>
                    <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570]">
        MEAT &amp; CHEESE RESTAURANT · آرشیو الکترونیک سفارشات اعضا © ۱۴۰۳
      </footer>
    </div>
  );
};
