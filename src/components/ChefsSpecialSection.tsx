import { useState } from 'react';
import { Sparkles, Check, Plus, Heart, Utensils, Award, Info } from 'lucide-react';
import { THALI_COMPONENTS, ALL_MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';
import { FoodImage } from './FoodImage';

interface ChefsSpecialSectionProps {
  onAddToCart: (dish: MenuItem) => void;
}

export function ChefsSpecialSection({ onAddToCart }: ChefsSpecialSectionProps) {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);
  const [isAdded, setIsAdded] = useState(false);

  const thaliDish = ALL_MENU_ITEMS.find((d) => d.id === 'meals-special-thali') || ALL_MENU_ITEMS[0];

  const handleOrderThali = () => {
    onAddToCart(thaliDish);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <section id="chefs-special" className="py-20 lg:py-28 bg-[#1B1009] text-[#FDFBF7] relative overflow-hidden">
      {/* Traditional background texture and subtle lighting */}
      <div className="absolute inset-0 bg-leaf-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#B45309]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 rounded-full bg-[#991B1B]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
            <Award className="w-4 h-4 text-[#FDE047]" />
            <span>The Crown Jewel of Andhra Cuisine</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FDFBF7] tracking-tight">
            Chef's Special – Andhra Special Thali
          </h2>

          <p className="text-base text-[#D4C3B3] leading-relaxed">
            A complete Andhra dining experience containing steaming rice, golden dal, rich curries, seasonal vegetable dishes, freshly ground chutneys, iconic pickle, aromatic sambar, pepper rasam, cooling curd, and other traditional accompaniments served in time-honored order.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Grand Image Presentation */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D97706]/40 shadow-2xl bg-[#0F0804] group">
              <FoodImage
                src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80"
                alt="Chef's Special Andhra Special Thali on Fresh Banana Leaf"
                className="w-full h-96 sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Overlay Badge and Action */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-left">
                <div>
                  <span className="text-xs font-semibold text-[#FDE047] uppercase tracking-wider block mb-1">
                    Authentic Plantain Leaf Bhojanam
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    14 Heritage Delicacies
                  </div>
                  <div className="text-xs text-stone-300 mt-1">
                    Served with unadulterated pure cow ghee & hot Sona Masoori rice
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="text-right mb-2">
                    <span className="text-xs text-stone-300 block">Feast Price</span>
                    <span className="font-serif text-2xl font-bold text-[#FDE047]">₹420</span>
                  </div>
                  <button
                    onClick={handleOrderThali}
                    className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#F59E0B] text-[#1B1009] hover:bg-[#D97706] hover:text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Order</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Try Our Special Thali</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Thali Course Breakdown */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="border-b border-[#3D2517] pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F59E0B]">
                Interactive Dining Guide
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFBF7] mt-1">
                The Sacred Anatomy of an Andhra Meal
              </h3>
              <p className="text-xs text-[#BFA898] mt-1">
                In an authentic Andhra home, every item on the leaf has its appointed place and course. Click any dish below to understand its flavor role.
              </p>
            </div>

            {/* Selected Component Detail Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#26160C] border border-[#B45309]/30 text-left shadow-inner">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
                  Course: {THALI_COMPONENTS[selectedComponent].role}
                </span>
                <span className="font-serif text-xs text-[#EAD8BF] font-medium">
                  {THALI_COMPONENTS[selectedComponent].telugu}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white">
                {THALI_COMPONENTS[selectedComponent].name}
              </h4>
              <p className="text-sm text-[#D4C3B3] mt-1.5 leading-relaxed">
                {THALI_COMPONENTS[selectedComponent].desc}
              </p>
            </div>

            {/* Thali Item Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
              {THALI_COMPONENTS.map((item, idx) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedComponent(idx)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all duration-150 cursor-pointer ${
                    selectedComponent === idx
                      ? 'bg-[#991B1B] border-[#F59E0B] text-white shadow-xs font-semibold'
                      : 'bg-[#22130A] border-[#382012] text-[#D4C3B3] hover:bg-[#2C190F] hover:text-white'
                  }`}
                >
                  <span className="block font-medium truncate">{item.name}</span>
                  <span className="text-[10px] text-[#A89182] block truncate">{item.role}</span>
                </button>
              ))}
            </div>

            {/* CTA action bottom */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleOrderThali}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-[#1B1009] bg-[#F59E0B] hover:bg-[#D97706] hover:text-white rounded-md transition-colors cursor-pointer shadow-md"
              >
                <Utensils className="w-4 h-4" />
                <span>Try Our Special Thali Now</span>
              </button>

              <div className="text-xs text-[#BFA898] text-center sm:text-left">
                Available daily for lunch & dinner in dining hall and takeaway feast packs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
