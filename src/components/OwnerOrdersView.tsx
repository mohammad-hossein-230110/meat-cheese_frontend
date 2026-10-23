import React, { useState } from 'react';
import {
  Building2,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Phone,
  Package,
  Layers,
  BarChart3,
  Sliders,
  Check,
  ShieldCheck,
  FileCheck,
  Bell,
  User,
  ArrowRightLeft,
  X,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { formatPrice } from '../data/mockData';

interface BranchOrderData {
  id: string;
  branchName: string;
  orderNumber: string; // e.g. #1024
  status: 'preparing' | 'pending' | 'delivered';
  statusLabel: string;
  time: string;
  itemCountSummary: string;
  totalAmount: number;
  highlightText: string;
  phone: string;
  manager: string;
  images?: { title: string; url: string }[];
  items?: {
    name: string;
    specs: string;
    qty: string;
    warehouse: string;
  }[];
}

const INITIAL_OWNER_ORDERS: BranchOrderData[] = [
  {
    id: 'ord-1024',
    branchName: 'شعبه سعادت‌آباد',
    orderNumber: '#1024',
    status: 'preparing',
    statusLabel: 'در حال آماده‌سازی',
    time: 'امروز — ساعت 09:30',
    itemCountSummary: '5 قلم کالای اساسی و پروتئینی',
    totalAmount: 214746350,
    highlightText: 'پتی برگر تخصصی، پنیر چدار وارداتی، نان بریوش پخت روز',
    phone: '021-22089450',
    manager: 'آقای شمس',
    images: [
      {
        title: 'پتی برگر',
        url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80',
      },
      {
        title: 'پنیر چدار',
        url: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500&auto=format&fit=crop&q=80',
      },
      {
        title: 'نان بریوش',
        url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
      },
    ],
    items: [
      {
        name: 'گوشت 140 گرمی دست‌چین',
        specs: 'بسته 50 عددی (1,000 عدد پتی برگر تخصصی)',
        qty: '20 عدد',
        warehouse: 'سردخانه زیر صفر',
      },
      {
        name: 'پنیر چدار ورقه‌ای',
        specs: 'کارتن 2 کیلوگرمی وارداتی، ضخامت استاندارد',
        qty: '2 کیلوگرم',
        warehouse: 'یخچال بالای صفر',
      },
      {
        name: 'سس سزار دست‌ساز آرتیزان',
        specs: 'گالن اختصاصی 2.5 لیتری با بچ‌کد روزانه',
        qty: '2 ظرف',
        warehouse: 'بخش سس و چاشنی',
      },
      {
        name: 'نان برگر 11 سانتی بریوش',
        specs: 'کارتن استاندارد پخت سحرگاهی',
        qty: '30 عدد',
        warehouse: 'انبار خشک مرکزی',
      },
      {
        name: 'گوجه گلخانه‌ای صادراتی',
        specs: 'سبد 3 کیلویی دست‌چین سوپرلوکس',
        qty: '3 کیلوگرم',
        warehouse: 'انبار سبزیجات',
      },
    ],
  },
  {
    id: 'ord-1023',
    branchName: 'شعبه فرمانیه (کد 104)',
    orderNumber: '#1023',
    status: 'pending',
    statusLabel: 'در انتظار بررسی',
    time: 'امروز — ساعت 08:15',
    itemCountSummary: '4 قلم کالای پروتئینی و چاشنی',
    totalAmount: 148200000,
    highlightText: 'راسته استیک، فیله مرینیت، چدار کهنه',
    phone: '021-22248890',
    manager: 'علیرضا راد',
    items: [
      {
        name: 'گوشت 200 گرمی پریمیوم',
        specs: 'بسته 40 عددی منجمد IQF',
        qty: '15 عدد',
        warehouse: 'سردخانه زیر صفر',
      },
      {
        name: 'پنیر چدار ورقه‌ای اعلا',
        specs: 'کارتن 2 کیلوگرمی',
        qty: '4 کیلوگرم',
        warehouse: 'یخچال بالای صفر',
      },
      {
        name: 'سس آنتروکت دست‌ساز پاریسی',
        specs: 'ظرف 1 کیلوگرمی',
        qty: '8 ظرف',
        warehouse: 'بخش سس و چاشنی',
      },
      {
        name: 'نان برگر 11 سانتی بریوش',
        specs: 'بسته 20 عددی پخت روز',
        qty: '25 عدد',
        warehouse: 'انبار خشک مرکزی',
      },
    ],
  },
  {
    id: 'ord-1022',
    branchName: 'شعبه شهرک غرب',
    orderNumber: '#1022',
    status: 'preparing',
    statusLabel: 'در حال آماده‌سازی',
    time: 'امروز — ساعت 07:40',
    itemCountSummary: '6 قلم کالای انبار مرکزی',
    totalAmount: 89650000,
    highlightText: 'حواله بارگیری صادر شده است',
    phone: '021-88091234',
    manager: 'کامران یزدانی',
    items: [
      {
        name: 'گوشت 140 گرمی دست‌ساز',
        specs: 'بسته 50 عددی',
        qty: '10 عدد',
        warehouse: 'سردخانه زیر صفر',
      },
      {
        name: 'گوجه فرنگی گلخانه‌ای اعلا',
        specs: 'سبد 3 کیلویی دستچین',
        qty: '6 سبد',
        warehouse: 'انبار سبزیجات',
      },
      {
        name: 'کاهو سالادی پیچ و آیس‌برگ',
        specs: 'کارتن 10 عددی ازن‌شویی',
        qty: '5 کارتن',
        warehouse: 'سردخانه تره‌بار',
      },
    ],
  },
  {
    id: 'ord-1021',
    branchName: 'شعبه نیاوران',
    orderNumber: '#1021',
    status: 'delivered',
    statusLabel: 'تحویل‌شده',
    time: 'امروز — ساعت 06:00 (تحویل گردید)',
    itemCountSummary: '3 پالت تجمیعی باربری اختصاصی',
    totalAmount: 162500000,
    highlightText: 'رسید انباردار با امضای دیجیتال ثبت شد',
    phone: '021-22805566',
    manager: 'مهدی خسروی',
    items: [
      {
        name: 'گوشت برگر 200 گرمی پریمیوم',
        specs: 'بسته 40 عددی',
        qty: '18 عدد',
        warehouse: 'تحویل داده شده',
      },
      {
        name: 'پنیر گودا هلندی اصیل',
        specs: 'قالب 4 کیلوگرمی',
        qty: '3 قالب',
        warehouse: 'تحویل داده شده',
      },
      {
        name: 'روغن سرخ‌کردنی شفاف تخصصی',
        specs: 'حلب 16 لیتری بدون ترانس',
        qty: '6 حلب',
        warehouse: 'تحویل داده شده',
      },
    ],
  },
];

export const OwnerOrdersView: React.FC = () => {
  const { setCurrentView, setUserRole } = useApp();
  const [orders, setOrders] = useState<BranchOrderData[]>(INITIAL_OWNER_ORDERS);
  const [filter, setFilter] = useState<'all' | 'preparing' | 'pending' | 'delivered'>('all');
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({
    'ord-1024': true, // Saadat Abad starts expanded as in reference image
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [contactModalBranch, setContactModalBranch] = useState<BranchOrderData | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'procurement' | 'settings'>('orders');

  const toggleExpand = (id: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleConfirmColdStorage = (id: string, branchName: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === id ? { ...ord, status: 'delivered', statusLabel: 'تأیید بارگیری شد' } : ord
      )
    );
    setToastMessage(`بارگیری سردخانه برای ${branchName} با موفقیت تأیید گردید.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSwitchToBranch = () => {
    setUserRole('branch');
    setCurrentView('dashboard');
  };

  const filteredOrders = orders.filter((ord) => {
    if (filter === 'all') return true;
    return ord.status === filter;
  });

  const getStatusBadge = (status: BranchOrderData['status'], label: string) => {
    switch (status) {
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FFDAD6] text-[#93000A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#93000A]" />
            <span>{label}</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#E9E8E6] text-[#57423F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A716E]" />
            <span>{label}</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Check size={11} strokeWidth={3} />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1C1B] pb-24 md:pb-12" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C0000] text-white px-4 py-2 rounded-lg text-xs font-medium shadow-md flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Contact Branch Modal */}
      {contactModalBranch && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-xl p-5 border border-[#E8E6E3] shadow-lg space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-[#E8E6E3] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#530201]/10 text-[#530201] flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1A1C1B]">{contactModalBranch.branchName}</h3>
                  <span className="text-[10px] text-[#777777]">مسئول: {contactModalBranch.manager}</span>
                </div>
              </div>
              <button
                onClick={() => setContactModalBranch(null)}
                className="p-1 text-[#777777] hover:text-[#1A1C1B]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="bg-[#FAF9F7] p-3 rounded border border-[#E8E6E3] text-xs space-y-1">
              <div className="text-[11px] text-[#777777]">شماره تلفن مستقیم شعبه:</div>
              <div className="font-mono text-sm font-bold text-[#530201]">
                {contactModalBranch.phone}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${contactModalBranch.phone}`}
                className="flex-1 h-9 bg-[#530201] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#400101] transition-colors"
              >
                <Phone size={13} />
                <span>برقراری تماس مستقیم</span>
              </a>
              <button
                onClick={() => setContactModalBranch(null)}
                className="px-3 h-9 border border-[#E8E6E3] text-xs text-[#777777] rounded hover:bg-[#FAF9F7]"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HQ Top App Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8E6E3] px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Right Brand Group */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#530201] text-white flex items-center justify-center font-bold text-xs font-mono tracking-tighter">
              M&C
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <BrandLogo variant="burgundy" size="sm" />
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FAF9F7] border border-[#E8E6E3] text-[#57423F] font-medium font-mono">
                  مرکزی
                </span>
              </div>
              <div className="text-[10px] text-[#777777] font-medium -mt-0.5">
                مدیریت کل شعب
              </div>
            </div>
          </div>

          {/* Left Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSwitchToBranch}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] bg-[#FAF9F7] hover:bg-[#E9E8E6] text-[#530201] border border-[#E8E6E3] rounded transition-colors"
              title="ورود به پنل شعبه فرمانیه"
            >
              <ArrowRightLeft size={12} />
              <span className="hidden sm:inline">مشاهده پنل شعبه</span>
            </button>

            <button
              className="p-1.5 text-[#57423F] hover:bg-[#FAF9F7] rounded relative"
              aria-label="اعلان‌ها"
            >
              <Bell size={18} />
              <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-[#530201]" />
            </button>

            <div className="w-8 h-8 rounded-full bg-[#FAF9F7] border border-[#E8E6E3] text-[#530201] flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-5 space-y-4">
        {/* Title Section matching Image 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#530201]" />
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#1A1C1B]">
                سفارش‌های شعب
              </h1>
            </div>
            <p className="text-xs text-[#777777] mt-1">
              بررسی آنی اقلام ارسالی، اوزان پروتئینی و بارگیری انبار مرکزی
            </p>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#E8E6E3] text-[11px] text-[#57423F] shadow-2xs">
            <Building2 size={13} className="text-[#530201]" />
            <span className="font-bold">4</span>
            <span>شعبه فعال</span>
          </div>
        </div>

        {/* Filter Pills matching Image 1 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-colors ${
              filter === 'all'
                ? 'bg-[#530201] text-white shadow-2xs font-semibold'
                : 'bg-white text-[#57423F] border border-[#E8E6E3] hover:bg-[#FAF9F7]'
            }`}
          >
            <span>همه سفارش‌ها</span>
            <span className="font-mono text-[11px]">4</span>
          </button>

          <button
            onClick={() => setFilter('preparing')}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-colors ${
              filter === 'preparing'
                ? 'bg-[#530201] text-white shadow-2xs font-semibold'
                : 'bg-white text-[#57423F] border border-[#E8E6E3] hover:bg-[#FAF9F7]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#93000A]" />
            <span>در حال آماده‌سازی</span>
            <span className="font-mono text-[11px]">2</span>
          </button>

          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-colors ${
              filter === 'pending'
                ? 'bg-[#530201] text-white shadow-2xs font-semibold'
                : 'bg-white text-[#57423F] border border-[#E8E6E3] hover:bg-[#FAF9F7]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A716E]" />
            <span>در انتظار بررسی</span>
            <span className="font-mono text-[11px]">1</span>
          </button>

          <button
            onClick={() => setFilter('delivered')}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-colors ${
              filter === 'delivered'
                ? 'bg-[#530201] text-white shadow-2xs font-semibold'
                : 'bg-white text-[#57423F] border border-[#E8E6E3] hover:bg-[#FAF9F7]'
            }`}
          >
            <span>تحویل‌شده</span>
            <span className="font-mono text-[11px]">1</span>
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-3.5">
          {filteredOrders.map((order) => {
            const isExpanded = !!expandedOrders[order.id];

            return (
              <div
                key={order.id}
                className="bg-white border border-[#E8E6E3] rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                {/* Order Card Header */}
                <div
                  onClick={() => toggleExpand(order.id)}
                  className="p-4 cursor-pointer hover:bg-[#FAF9F7]/70 transition-colors flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-[#1A1C1B]">
                        {order.branchName}
                      </h2>
                      <span className="font-mono text-[11px] text-[#777777] bg-[#FAF9F7] px-1.5 py-0.2 rounded border border-[#E8E6E3]">
                        {order.orderNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status, order.statusLabel)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(order.id);
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center text-[#777777] hover:bg-[#FAF9F7]"
                        aria-label="تغییر وضعیت نمایش"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#777777] font-mono">
                    <Clock size={12} className="text-[#8A716E]" />
                    <span>{order.time}</span>
                  </div>
                </div>

                {/* Collapsed Brief Bar (when NOT expanded) */}
                {!isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-[#F1EFEC]">
                    <div className="bg-[#FAF9F7] p-2.5 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#57423F] font-medium">
                        {order.itemCountSummary}
                      </span>
                      <span className="font-mono font-bold text-xs text-[#1A1C1B]">
                        {formatPrice(order.totalAmount)} تومان
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#777777] pt-0.5">
                      <div className="flex items-center gap-1.5 truncate max-w-[70%]">
                        <Package size={13} className="text-[#8A716E] shrink-0" />
                        <span className="truncate">{order.highlightText}</span>
                      </div>
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="text-[11px] font-semibold text-[#530201] hover:underline shrink-0"
                      >
                        مشاهده سفارش
                      </button>
                    </div>
                  </div>
                )}

                {/* Expanded Detailed View matching Image 1 */}
                {isExpanded && (
                  <div className="px-4 pb-5 space-y-4 border-t border-[#F1EFEC]">
                    {/* Food Vitrine Thumbnail Grid (3 photos) if available */}
                    {order.images && order.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 pt-3">
                        {order.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#E8E6E3] group"
                          >
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 text-center">
                              <span className="text-[10px] font-medium text-white shadow-xs">
                                {img.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Specimen Items Table */}
                    {order.items && order.items.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-[#777777] px-1 pb-1 font-medium border-b border-[#E8E6E3]">
                          <span>شرح اقلام سفارش‌شده</span>
                          <span>مقدار دقیق بارنامه</span>
                        </div>

                        <div className="divide-y divide-[#F1EFEC]">
                          {order.items.map((it, idx) => (
                            <div
                              key={idx}
                              className="py-2.5 flex items-start justify-between gap-2 text-xs"
                            >
                              <div className="space-y-0.5">
                                <div className="font-bold text-[#1A1C1B] text-[11px]">
                                  {it.name}
                                </div>
                                <div className="text-[10px] text-[#777777]">
                                  {it.specs}
                                </div>
                              </div>

                              <div className="text-left shrink-0">
                                <div className="font-bold font-mono text-xs text-[#1A1C1B]">
                                  {it.qty}
                                </div>
                                <div className="text-[9px] text-[#8A716E] font-medium">
                                  {it.warehouse}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Total Pod */}
                    <div className="bg-[#FAF9F7] border border-[#E8E6E3] rounded-lg p-3 flex items-center justify-between">
                      <span className="text-xs text-[#777777]">مبلغ کل فاکتور رسمی:</span>
                      <div className="text-left font-mono font-black text-sm md:text-base text-[#1A1C1B]">
                        {formatPrice(order.totalAmount)}{' '}
                        <span className="text-[10px] font-normal text-[#777777]">تومان</span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleConfirmColdStorage(order.id, order.branchName)}
                        className="h-10 bg-[#530201] hover:bg-[#400101] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <ShieldCheck size={16} />
                        <span>تأیید بارگیری سردخانه</span>
                      </button>

                      <button
                        onClick={() => setContactModalBranch(order)}
                        className="h-10 bg-white hover:bg-[#FAF9F7] text-[#1A1C1B] border border-[#E8E6E3] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone size={14} className="text-[#530201]" />
                        <span>تماس با شعبه</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Owner Fixed Bottom Navigation matching Image 1 */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E6E3] px-3 py-1.5 shadow-xs safe-area-bottom">
        <div className="max-w-md mx-auto flex items-center justify-around text-center">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'orders' ? 'text-[#530201] font-bold' : 'text-[#777777] hover:text-[#1A1C1B]'
            }`}
          >
            <Package size={18} />
            <span className="text-[9px] mt-0.5">سفارش‌ها</span>
            {activeTab === 'orders' && <span className="w-1 h-1 rounded-full bg-[#530201] mt-0.5" />}
          </button>

          <button
            onClick={() => {
              setActiveTab('inventory');
              setToastMessage('نمای وضعیت موجودی انبارهای شعب');
              setTimeout(() => setToastMessage(null), 2000);
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'inventory' ? 'text-[#530201] font-bold' : 'text-[#777777] hover:text-[#1A1C1B]'
            }`}
          >
            <Layers size={18} />
            <span className="text-[9px] mt-0.5">موجودی شعب</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('procurement');
              setToastMessage('گزارشات تجمیعی تدارکات و تأمین');
              setTimeout(() => setToastMessage(null), 2000);
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'procurement' ? 'text-[#530201] font-bold' : 'text-[#777777] hover:text-[#1A1C1B]'
            }`}
          >
            <BarChart3 size={18} />
            <span className="text-[9px] mt-0.5">تدارکات</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              setToastMessage('تنظیمات سامانه مدیریت کل');
              setTimeout(() => setToastMessage(null), 2000);
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'settings' ? 'text-[#530201] font-bold' : 'text-[#777777] hover:text-[#1A1C1B]'
            }`}
          >
            <Sliders size={18} />
            <span className="text-[9px] mt-0.5">تنظیمات</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
