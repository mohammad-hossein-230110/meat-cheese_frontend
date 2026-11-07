import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Award, Package, Heart, LogOut, ChevronLeft, Shield, Edit3, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

export const CustomerProfileView: React.FC = () => {
  const { setCurrentView } = useApp();

  const [profile, setProfile] = useState({
    name: 'علیرضا راد',
    phone: '۰۹۱۲۱۲۳۴۵۶۷',
    email: 'alireza.rad@example.com',
    memberSince: 'اردیبهشت ۱۴۰۲',
    membershipTier: 'عضو پلاتینیوم (VIP)',
    loyaltyPoints: 780,
    totalOrders: 14,
    favoriteDish: 'برگر واگیو با ترافل پکورینو',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: editName,
      email: editEmail,
    }));
    setIsEditing(false);
  };

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
              <h1 className="text-xs sm:text-sm font-bold text-[#f7f5f2] truncate">پروفایل من</h1>
              <p className="text-[10px] text-[#a8a09b] truncate">اطلاعات کاربری و مشخصات تماس</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentView('menu')}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>منوی رستوران</span>
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 my-4 space-y-6">
        {/* User Identity Top Hero Card */}
        <div className="bg-[#1c1817] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 sm:p-7 shadow-2xl relative overflow-hidden">
          {/* Subtle red ambient glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#6b0d0c]/15 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-right">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#530201] via-[#6b0d0c] to-[#ffb4ab] p-0.5 shadow-burgundy-glow">
                <div className="w-full h-full rounded-full bg-[#1c1817] flex items-center justify-center text-xl font-bold text-[#f7f5f2]">
                  ع‌ر
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-lg font-bold text-[#f7f5f2]">{profile.name}</h2>
                  <span className="text-[11px] font-semibold text-[#ffb4ab] bg-[#241f1e] px-2.5 py-0.5 rounded-full border border-[rgba(255,255,255,0.08)]">
                    {profile.membershipTier}
                  </span>
                </div>
                <p className="text-xs text-[#a8a09b] font-mono">{profile.phone}</p>
                <p className="text-[11px] text-[#7d7570]">عضو رسمی از {profile.memberSince}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#241f1e] hover:bg-[#2c2929] border border-[rgba(255,255,255,0.1)] rounded-lg text-xs text-[#a8a09b] hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Edit3 size={14} />
              <span>{isEditing ? 'انصراف از ویرایش' : 'ویرایش مشخصات'}</span>
            </button>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSave} className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[#a8a09b] block mb-1">نام کامل:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-[#f7f5f2]"
                />
              </div>
              <div>
                <label className="text-[#a8a09b] block mb-1">ایمیل:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-[#f7f5f2]"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#6b0d0c] text-white font-semibold text-xs flex items-center gap-1"
                >
                  <Check size={14} />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>
            </form>
          )}

          {/* Stats Bar */}
          <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div 
              onClick={() => setCurrentView('customer-loyalty')}
              className="bg-[#241f1e]/80 hover:bg-[#241f1e] p-2.5 sm:p-3.5 rounded-xl border border-[rgba(255,255,255,0.06)] cursor-pointer hover:border-[#6b0d0c] transition-all flex flex-col items-center justify-center min-w-0"
            >
              <span className="text-[10px] sm:text-xs text-[#a8a09b] block mb-1 truncate w-full font-normal">
                امتیاز باشگاه
              </span>
              <span className="text-xs sm:text-base font-bold text-[#ffb4ab] whitespace-nowrap">
                {toPersianDigits(profile.loyaltyPoints)} <span className="text-[10px] font-normal text-[#a8a09b]">امتیاز</span>
              </span>
            </div>

            <div 
              onClick={() => setCurrentView('customer-orders')}
              className="bg-[#241f1e]/80 hover:bg-[#241f1e] p-2.5 sm:p-3.5 rounded-xl border border-[rgba(255,255,255,0.06)] cursor-pointer hover:border-[#6b0d0c] transition-all flex flex-col items-center justify-center min-w-0"
            >
              <span className="text-[10px] sm:text-xs text-[#a8a09b] block mb-1 truncate w-full font-normal">
                کل سفارش‌ها
              </span>
              <span className="text-xs sm:text-base font-bold text-[#f7f5f2] whitespace-nowrap">
                {toPersianDigits(profile.totalOrders)} <span className="text-[10px] font-normal text-[#a8a09b]">سفارش</span>
              </span>
            </div>

            <div className="bg-[#241f1e]/80 p-2.5 sm:p-3.5 rounded-xl border border-[rgba(255,255,255,0.06)] flex flex-col items-center justify-center min-w-0">
              <span className="text-[10px] sm:text-xs text-[#a8a09b] block mb-1 truncate w-full font-normal">
                سطح عضویت
              </span>
              <span className="text-xs sm:text-base font-bold text-emerald-400 whitespace-nowrap">
                سطح ۳ پلاتین
              </span>
            </div>
          </div>
        </div>

        {/* Action Shortcuts Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Loyalty Club */}
          <div
            onClick={() => setCurrentView('customer-loyalty')}
            className="p-5 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] hover:border-[#6b0d0c] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#6b0d0c]/30 border border-[#6b0d0c]/50 text-[#ffb4ab] flex items-center justify-center">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#f7f5f2] group-hover:text-[#ffb4ab] transition-colors">
                    باشگاه مشتریان MEAT &amp; CHEESE
                  </h3>
                  <p className="text-[11px] text-[#a8a09b]">مشاهده جوایز، تخفیف‌ها و کدهای هدیه</p>
                </div>
              </div>
              <ChevronLeft size={16} className="text-[#a8a09b] group-hover:text-[#f7f5f2]" />
            </div>
          </div>

          {/* Card 2: Orders History */}
          <div
            onClick={() => setCurrentView('customer-orders')}
            className="p-5 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] hover:border-[#6b0d0c] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-[#f7f5f2] flex items-center justify-center">
                  <Package size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#f7f5f2] group-hover:text-[#ffb4ab] transition-colors">
                    تاریخچه سفارش‌ها و فاکتورها
                  </h3>
                  <p className="text-[11px] text-[#a8a09b]">پیگیری سفارش جاری و چاپ فاکتورها</p>
                </div>
              </div>
              <ChevronLeft size={16} className="text-[#a8a09b] group-hover:text-[#f7f5f2]" />
            </div>
          </div>

          {/* Card 3: Saved Addresses */}
          <div
            onClick={() => setCurrentView('customer-address')}
            className="p-5 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] hover:border-[#6b0d0c] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-[#f7f5f2] flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#f7f5f2] group-hover:text-[#ffb4ab] transition-colors">
                    آدرس‌های تحویل من
                  </h3>
                  <p className="text-[11px] text-[#a8a09b]">مدیریت لوکیشن‌های منزل، دفتر و تحویل</p>
                </div>
              </div>
              <ChevronLeft size={16} className="text-[#a8a09b] group-hover:text-[#f7f5f2]" />
            </div>
          </div>

          {/* Card 4: Switch to B2B or Log out */}
          <div
            onClick={() => setCurrentView('customer-auth')}
            className="p-5 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] hover:border-red-500/40 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 flex items-center justify-center">
                  <LogOut size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#f7f5f2] group-hover:text-red-400 transition-colors">
                    خروج از حساب کاربری
                  </h3>
                  <p className="text-[11px] text-[#a8a09b]">تغییر حساب یا ورود به عنوان مهمان</p>
                </div>
              </div>
              <ChevronLeft size={16} className="text-[#a8a09b] group-hover:text-[#f7f5f2]" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570]">
        MEAT &amp; CHEESE RESTAURANT · پرتال اختصاصی اعضای باشگاه مشتریان VIP © ۱۴۰۳
      </footer>
    </div>
  );
};
