import React, { useState } from 'react';
import { MapPin, Plus, Check, Trash2, Home, Briefcase, Navigation, ChevronLeft, Phone, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Address {
  id: string;
  title: string;
  type: 'home' | 'work' | 'other';
  fullAddress: string;
  recipientName: string;
  recipientPhone: string;
  unit?: string;
  plaque?: string;
  isDefault: boolean;
}

export const CustomerAddressView: React.FC = () => {
  const { setCurrentView } = useApp();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      title: 'منزل (الهیه)',
      type: 'home',
      fullAddress: 'تهران، الهیه، خیابان فرشته (فیاضی)، خیابان مریم شرقی، پلاک ۲۴، واحد ۶',
      recipientName: 'علیرضا راد',
      recipientPhone: '۰۹۱۲۱۲۳۴۵۶۷',
      unit: '۶',
      plaque: '۲۴',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'دفتر کار (فرمانیه)',
      type: 'work',
      fullAddress: 'تهران، کامرانیه شمالی، مجتمع تجاری روما سنتر، طبقه ۵، واحد ۵۰۲',
      recipientName: 'علیرضا راد',
      recipientPhone: '۰۹۱۲۱۲۳۴۵۶۷',
      unit: '۵۰۲',
      plaque: '۱۸',
      isDefault: false,
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  // New address form state
  const [newTitle, setNewTitle] = useState('');
  const [newFullAddress, setNewFullAddress] = useState('');
  const [newPlaque, setNewPlaque] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [newPhone, setNewPhone] = useState('۰۹۱۲۱۲۳۴۵۶۷');

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      title: newTitle || 'آدرس جدید',
      type: 'other',
      fullAddress: `${newFullAddress}، پلاک ${newPlaque}، واحد ${newUnit}`,
      recipientName: 'علیرضا راد',
      recipientPhone: newPhone,
      unit: newUnit,
      plaque: newPlaque,
      isDefault: false,
    };
    setAddresses((prev) => [newAddr, ...prev]);
    setSelectedAddressId(newAddr.id);
    setShowNewAddressModal(false);
    setNewTitle('');
    setNewFullAddress('');
    setNewPlaque('');
    setNewUnit('');
  };

  const handleProceedToCheckout = () => {
    setCurrentView('customer-checkout');
  };

  return (
    <div className="min-h-screen bg-[#121010] text-[#f7f5f2] flex flex-col justify-between selection:bg-[#6b0d0c] selection:text-white" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#1c1817]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-[#6b0d0c] flex items-center justify-center text-[#f7f5f2] font-bold text-xs tracking-wider shrink-0">
              M&amp;C
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-[#f7f5f2] truncate">انتخاب آدرس تحویل</h1>
              <p className="text-[10px] text-[#a8a09b] truncate">مرحله ۲ از ۳ سفارش</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('customer-cart')}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-[#a8a09b] hover:text-[#f7f5f2] bg-[#241f1e] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>بازگشت به سبد</span>
            <ChevronLeft size={14} />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 my-4 space-y-6">
        {/* Progress Stepper Bar */}
        <div className="flex items-center justify-between text-xs text-[#a8a09b] bg-[#1c1817] p-3 rounded-xl border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold font-mono">
              ✓
            </span>
            <span>سبد خرید</span>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.1)] flex-1 mx-3" />
          <div className="flex items-center gap-2 text-[#ffb4ab] font-bold">
            <span className="w-5 h-5 rounded-full bg-[#6b0d0c] text-white flex items-center justify-center text-[10px] font-bold font-mono">
              ۲
            </span>
            <span>آدرس تحویل</span>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.1)] flex-1 mx-3" />
          <div className="flex items-center gap-2 text-[#7d7570]">
            <span className="w-5 h-5 rounded-full bg-[#241f1e] flex items-center justify-center text-[10px] font-bold font-mono">
              ۳
            </span>
            <span>تسویه نهایی</span>
          </div>
        </div>

        {/* Action: Add new address button */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#f7f5f2]">آدرس‌های ذخیره‌شده شما</h2>
          <button
            onClick={() => setShowNewAddressModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#241f1e] hover:bg-[#2c2929] border border-[rgba(255,255,255,0.1)] text-[#ffb4ab] rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>ثبت آدرس جدید</span>
          </button>
        </div>

        {/* Address List Cards */}
        <div className="space-y-3">
          {addresses.map((addr) => {
            const isSelected = selectedAddressId === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#1c1817] border-[#6b0d0c] shadow-burgundy-glow'
                    : 'bg-[#1c1817]/70 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Radio circle */}
                    <div
                      className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[#6b0d0c] bg-[#6b0d0c] text-white'
                          : 'border-[rgba(255,255,255,0.3)] bg-transparent'
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {addr.type === 'home' ? (
                          <Home size={15} className="text-[#a8a09b] shrink-0" />
                        ) : (
                          <Briefcase size={15} className="text-[#a8a09b] shrink-0" />
                        )}
                        <h3 className="text-sm font-bold text-[#f7f5f2]">{addr.title}</h3>
                        {addr.isDefault && (
                          <span className="text-[10px] text-[#ffb4ab] bg-[#241f1e] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
                            پیش‌فرض
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#a8a09b] leading-relaxed pt-1">
                        {addr.fullAddress}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#7d7570] pt-1.5 font-mono">
                        <span className="flex items-center gap-1 font-sans">
                          <User size={12} />
                          تحویل‌گیرنده: {addr.recipientName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {addr.recipientPhone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shrink-0 font-medium">
                    پوشش اکسپرس ۳۰ دقیقه‌ای
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Delivery Note */}
        <div className="p-4 rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.08)] space-y-2">
          <label className="text-xs font-semibold text-[#f7f5f2] block">
            راهنمای پیک یا زنگ واحد (اختیاری):
          </label>
          <input
            type="text"
            placeholder="مثال: زنگ واحد ۶ کار نمی‌کند، تماس بگیرید یا به لابی تحویل دهید..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#241f1e] border border-[rgba(255,255,255,0.08)] text-xs text-[#f7f5f2] placeholder-[#7d7570] focus:outline-none focus:border-[#6b0d0c]"
          />
        </div>

        {/* Bottom Bar Action */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('customer-cart')}
            className="px-4 py-3 rounded-lg text-xs text-[#a8a09b] hover:text-white border border-[rgba(255,255,255,0.1)] transition-colors"
          >
            مرحله قبل (سبد خرید)
          </button>

          <button
            onClick={handleProceedToCheckout}
            className="flex-1 max-w-sm h-12 bg-[#6b0d0c] hover:bg-[#85221c] text-white rounded-lg text-xs font-bold shadow-burgundy-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>تأیید آدرس و تسویه نهایی</span>
            <ChevronLeft size={16} />
          </button>
        </div>
      </main>

      {/* New Address Modal */}
      {showNewAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir="rtl">
          <div className="relative w-full max-w-lg rounded-xl bg-[#1c1817] border border-[rgba(255,255,255,0.1)] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[#f7f5f2]">افزودن آدرس جدید</h3>
            
            <form onSubmit={handleAddNewAddress} className="space-y-3.5 text-xs">
              <div>
                <label className="text-[#a8a09b] block mb-1">عنوان آدرس (مثلاً خانه، محل کار، ویلا):</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="عنوان آدرس"
                  required
                  className="w-full h-10 px-3 bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#6b0d0c]"
                />
              </div>

              <div>
                <label className="text-[#a8a09b] block mb-1">نشانی دقیق پستی:</label>
                <textarea
                  rows={2}
                  value={newFullAddress}
                  onChange={(e) => setNewFullAddress(e.target.value)}
                  placeholder="خیابان اصلی، کوچه، پلاک..."
                  required
                  className="w-full p-3 bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#6b0d0c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#a8a09b] block mb-1">پلاک:</label>
                  <input
                    type="text"
                    value={newPlaque}
                    onChange={(e) => setNewPlaque(e.target.value)}
                    placeholder="مثال: ۱۲"
                    required
                    className="w-full h-10 px-3 bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#6b0d0c]"
                  />
                </div>
                <div>
                  <label className="text-[#a8a09b] block mb-1">واحد:</label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    placeholder="مثال: ۴"
                    className="w-full h-10 px-3 bg-[#241f1e] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#6b0d0c]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowNewAddressModal(false)}
                  className="px-4 py-2 rounded-lg text-[#a8a09b] hover:text-white"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#6b0d0c] hover:bg-[#85221c] text-white font-semibold"
                >
                  ذخیره آدرس
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 border-t border-[rgba(255,255,255,0.06)] text-center text-[10px] text-[#7d7570]">
        MEAT &amp; CHEESE · ناوگان ارسال اکسپرس با باکس عایق حرارتی © ۱۴۰۳
      </footer>
    </div>
  );
};
