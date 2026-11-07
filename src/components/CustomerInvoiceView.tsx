import React from 'react';
import { CheckCircle2, ChevronLeft, Printer, Download, MapPin, Phone, ShieldCheck, Clock, Receipt, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits, formatPersianPrice } from '../utils/formatters';

export const CustomerInvoiceView: React.FC = () => {
  const { setCurrentView } = useApp();

  const invoice = {
    orderNumber: 'MC-2408',
    trackingCode: 'TRK-98321045',
    referenceNumber: '7284019245',
    date: '۱۶ آبان ۱۴۰۳ - ساعت ۱۴:۱۵',
    customerName: 'علیرضا راد',
    customerPhone: '۰۹۱۲۱۲۳۴۵۶۷',
    deliveryAddress: 'تهران، الهیه، خیابان فرشته (فیاضی)، خیابان مریم شرقی، پلاک ۲۴، واحد ۶',
    deliveryType: 'پیک اکسپرس گرم با باکس عایق حرارتی',
    paymentMethod: 'درگاه آنلاین شاپرک (پرداخت موفق)',
    items: [
      {
        name: 'برگر ۲۰۰ گرمی اسمش',
        category: 'برگرهای دست‌ساز',
        unitPrice: 245000,
        quantity: 2,
        total: 490000,
      },
      {
        name: 'ساندویچ پاسترامی نیویورکی',
        category: 'ساندویچ‌های آرتیزان',
        unitPrice: 290000,
        quantity: 1,
        total: 290000,
      },
      {
        name: 'سالاد سزار فیله گریل‌شده',
        category: 'سالادها',
        unitPrice: 195000,
        quantity: 1,
        total: 195000,
      },
    ],
    itemsTotal: 975000,
    packagingFee: 35000,
    deliveryFee: 45000,
    loyaltyDiscount: 50000,
    grandTotal: 1005000,
    earnedPoints: 100,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#121010] text-[#f7f5f2] flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white" dir="rtl">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#1c1817]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 py-3 print:hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shrink-0">
              M&amp;C
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-[#f7f5f2] truncate">جزئیات سفارش و فاکتور</h1>
              <p className="text-[10px] text-[#a8a09b] truncate">کد پیگیری: {invoice.orderNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors whitespace-nowrap shrink-0"
              title="چاپ فاکتور"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">چاپ</span>
            </button>
            <button
              onClick={() => setCurrentView('customer-orders')}
              className="flex items-center gap-1 text-xs text-[#f7f5f2] bg-[#6b0d0c] px-2.5 sm:px-3 py-1.5 rounded-lg shadow-burgundy-glow transition-all whitespace-nowrap shrink-0"
            >
              <span>تاریخچه سفارش‌ها</span>
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Invoice Card Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 my-4 space-y-5">
        {/* Success Alert Banner */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:hidden">
          <div className="flex items-start gap-2.5 text-emerald-400 min-w-0">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            <div className="min-w-0 space-y-1">
              <span className="font-bold text-xs sm:text-sm text-emerald-300 block leading-snug">
                سفارش شما با موفقیت ثبت و پرداخت گردید
              </span>
              <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                سرآشپز سفارش شما را دریافت کرده و هم‌اکنون در مرحله آماده‌سازی قرار دارد.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center text-[11px] font-mono text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded whitespace-nowrap shrink-0">
            تحویل تقریبی: ۳۰ الی ۴۰ دقیقه
          </span>
        </div>

        {/* The Invoice Document */}
        <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          {/* Subtle Burgundy Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#530201] via-[#6b0d0c] to-[#ffb4ab]" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif-brand text-lg font-bold text-[#f7f5f2] tracking-wider">
                  MEAT &amp; CHEESE
                </span>
                <span className="text-[10px] font-semibold text-[#ffb4ab] bg-[#241f1e] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
                  فاکتور الکترونیک
                </span>
              </div>
              <p className="text-xs text-[#a8a09b]">
                رستوران MEAT &amp; CHEESE
              </p>
              <p className="text-[11px] text-[#7d7570]">
                تهران، خیابان فرشته، پلاک ۲۸ · تلفن: ۰۲۱-۲۲۰۰۴۵۸۰
              </p>
            </div>

            <div className="bg-[#241f1e] p-3 rounded-lg border border-[rgba(255,255,255,0.06)] text-xs space-y-1 sm:min-w-44 font-mono">
              <div className="flex justify-between text-[#a8a09b]">
                <span className="font-sans">شماره سفارش:</span>
                <span className="font-bold text-[#f7f5f2]">{invoice.orderNumber}</span>
              </div>
              <div className="flex justify-between text-[#a8a09b]">
                <span className="font-sans">کد پیگیری:</span>
                <span className="text-[#ffb4ab]">{invoice.trackingCode}</span>
              </div>
              <div className="flex justify-between text-[#a8a09b]">
                <span className="font-sans">کد مرجع RRN:</span>
                <span className="text-[#f7f5f2]">{invoice.referenceNumber}</span>
              </div>
              <div className="flex justify-between text-[#a8a09b]">
                <span className="font-sans">زمان ثبت:</span>
                <span className="text-[#f7f5f2] font-sans text-[10px]">{invoice.date}</span>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#241f1e]/40 p-4 rounded-lg border border-[rgba(255,255,255,0.06)]">
            <div className="space-y-1">
              <span className="text-[#7d7570] block">اطلاعات خریدار:</span>
              <p className="font-semibold text-[#f7f5f2]">{invoice.customerName}</p>
              <p className="text-[#a8a09b] font-mono">{invoice.customerPhone}</p>
              <p className="text-[#a8a09b]">روش پرداخت: {invoice.paymentMethod}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#7d7570] block">اطلاعات تحویل و نشانی:</span>
              <p className="text-[#f7f5f2] leading-relaxed">{invoice.deliveryAddress}</p>
              <p className="text-[11px] text-emerald-400">{invoice.deliveryType}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#f7f5f2]">اقلام سفارش</h3>
            <div className="border border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden overflow-x-auto">
              <div className="min-w-[460px]">
                <div className="grid grid-cols-12 bg-[#241f1e] px-4 py-2.5 text-[11px] font-semibold text-[#a8a09b] border-b border-[rgba(255,255,255,0.06)]">
                  <div className="col-span-6">عنوان خوراک</div>
                  <div className="col-span-2 text-center">تعداد</div>
                  <div className="col-span-2 text-left">قیمت واحد</div>
                  <div className="col-span-2 text-left">مجموع</div>
                </div>

                <div className="divide-y divide-[rgba(255,255,255,0.04)] text-xs">
                  {invoice.items.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 px-4 py-3 items-center">
                      <div className="col-span-6">
                        <div className="font-semibold text-[#f7f5f2]">{toPersianDigits(row.name)}</div>
                        <div className="text-[10px] text-[#7d7570]">{row.category}</div>
                      </div>
                      <div className="col-span-2 text-center font-bold text-[#f7f5f2]">
                        {toPersianDigits(row.quantity)}
                      </div>
                      <div className="col-span-2 text-left text-[#a8a09b] whitespace-nowrap">
                        {formatPersianPrice(row.unitPrice)}
                      </div>
                      <div className="col-span-2 text-left font-bold text-[#f7f5f2] whitespace-nowrap">
                        {formatPersianPrice(row.total)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Ledger */}
          <div className="bg-[#241f1e] p-4 rounded-lg border border-[rgba(255,255,255,0.06)] space-y-2 text-xs">
            <div className="flex justify-between text-[#a8a09b]">
              <span>جمع اقلام منو:</span>
              <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(invoice.itemsTotal)} تومان</span>
            </div>
            <div className="flex justify-between text-[#a8a09b]">
              <span>هزینه بسته‌بندی:</span>
              <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(invoice.packagingFee)} تومان</span>
            </div>
            <div className="flex justify-between text-[#a8a09b]">
              <span>هزینه پیک اکسپرس:</span>
              <span className="font-bold text-[#f7f5f2]">{formatPersianPrice(invoice.deliveryFee)} تومان</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>تخفیف باشگاه مشتریان:</span>
              <span>- {formatPersianPrice(invoice.loyaltyDiscount)} تومان</span>
            </div>
            <div className="pt-2 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-baseline font-bold text-sm">
              <span className="text-[#f7f5f2]">مبلغ کل پرداخت‌شده:</span>
              <span className="text-base font-bold text-[#ffb4ab]">
                {formatPersianPrice(invoice.grandTotal)} تومان
              </span>
            </div>
          </div>

          {/* Loyalty Banner */}
          <div className="p-3.5 bg-[#6b0d0c]/15 border border-[#6b0d0c]/30 rounded-lg text-xs text-[#ffb4ab] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab] shrink-0" />
              <span className="leading-relaxed">پاداش سفارش: شما ۱۰۰ امتیاز در باشگاه مشتریان کسب کردید.</span>
            </div>
            <button
              onClick={() => setCurrentView('customer-loyalty')}
              className="self-start sm:self-center text-xs font-bold text-white hover:underline whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>مشاهده باشگاه</span>
              <span>←</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570] print:hidden">
        MEAT &amp; CHEESE RESTAURANT · فاکتور معتبر الکترونیکی صادره از سرور مرکزی © ۱۴۰۳
      </footer>
    </div>
  );
};
