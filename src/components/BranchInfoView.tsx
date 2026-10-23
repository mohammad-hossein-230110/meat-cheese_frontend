import React from 'react';
import { Phone, MapPin, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BranchInfoView: React.FC = () => {
  const { branch, setCurrentView } = useApp();

  const proteinPercent = Math.round((branch.usedProteinQuotaKg / branch.proteinQuotaKg) * 100);
  const cheesePercent = Math.round((branch.usedCheeseQuotaKg / branch.cheeseQuotaKg) * 100);

  return (
    <div className="space-y-4 pb-20 md:pb-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#777777] mb-0.5">
            <span>تدارکات</span>
            <ChevronLeft size={12} />
            <span className="text-[#242424] font-medium">مشخصات شعبه</span>
          </div>
          <h1 className="text-base md:text-lg font-bold text-[#242424]">
            اطلاعات شعبه و سهمیه‌ها
          </h1>
        </div>

        <button
          onClick={() => setCurrentView('catalog')}
          className="text-xs font-semibold text-[#530201] hover:underline"
        >
          ثبت سفارش جدید
        </button>
      </div>

      {/* Main Info Card */}
      <div className="bg-white border border-[#E8E6E3] rounded-md p-5 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6E3] pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#530201] text-white flex items-center justify-center font-bold text-sm font-mono">
              {branch.code}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-[#242424]">{branch.name}</h2>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-50 text-emerald-800 font-medium">
                  شعبه فعال
                </span>
              </div>
              <p className="text-[11px] text-[#777777]">سرپرست تدارکات: {branch.manager}</p>
            </div>
          </div>

          <div className="text-right text-xs bg-[#FAF9F7] border border-[#E8E6E3] p-2 rounded text-[11px]">
            <span className="text-[#777777]">شیفت ارسال: </span>
            <span className="font-medium text-[#530201]">{branch.deliveryShift}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-[#FAF9F7] p-3 rounded border border-[#E8E6E3] space-y-0.5">
            <span className="text-[#777777] flex items-center gap-1 text-[11px]">
              <MapPin size={13} className="text-[#530201]" />
              آدرس تحویل:
            </span>
            <p className="text-[#242424] pr-4 text-[11px] leading-relaxed">{branch.address}</p>
          </div>

          <div className="bg-[#FAF9F7] p-3 rounded border border-[#E8E6E3] space-y-0.5">
            <span className="text-[#777777] flex items-center gap-1 text-[11px]">
              <Phone size={13} className="text-[#530201]" />
              شماره تماس مستقیم:
            </span>
            <p className="text-[#242424] font-mono pr-4 text-[11px]">{branch.phone}</p>
          </div>
        </div>

        {/* Quotas */}
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-bold text-[#242424]">سهمیه‌های مصوب هفتگی:</h3>

          {/* Protein */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#242424]">سهمیه برگر و پروتئین:</span>
              <span className="font-mono text-[#777777]">
                {branch.usedProteinQuotaKg} از {branch.proteinQuotaKg} کیلوگرم ({proteinPercent}٪)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F1EFEC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#530201] rounded-full"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
          </div>

          {/* Cheese */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#242424]">سهمیه پنیر چدار و فرآورده‌ها:</span>
              <span className="font-mono text-[#777777]">
                {branch.usedCheeseQuotaKg} از {branch.cheeseQuotaKg} کیلوگرم ({cheesePercent}٪)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F1EFEC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9E7D56] rounded-full"
                style={{ width: `${cheesePercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
