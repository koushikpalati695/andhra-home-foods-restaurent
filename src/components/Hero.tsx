import { ArrowRight, Sparkles, Utensils, Award, Clock } from 'lucide-react';
import { FoodImage } from './FoodImage';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export function Hero({ onExploreMenu, onOrderNow }: HeroProps) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F9F5EC] via-[#FDFBF7] to-[#F7F2E8] border-b border-[#E8DFD1]">
      {/* Decorative Traditional Andhra Pattern Accents */}
      <div className="absolute inset-0 bg-kolam-subtle opacity-60 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B45309]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-[#991B1B]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Subtle editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
              <span className="w-6 h-[1.5px] bg-[#991B1B]" />
              <span>Tradition · Freshness · Homestyle</span>
            </div>

            {/* Main Brand Title & Tagline as mandated */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C1810] tracking-tight leading-[1.12]">
                ANDHRA HOME FOODS
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#991B1B] font-medium tracking-wide">
                “Authentic Andhra Taste, Just Like Home”
              </p>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-[#5C3D2E] leading-relaxed max-w-2xl">
              Experience the rich flavors of Andhra cuisine with traditional recipes, fresh ingredients, and the warmth of homemade food.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-md shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 text-[#FDE047]" />
              </button>

              <button
                onClick={onOrderNow}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#2C1810] bg-[#F4E9D8] hover:bg-[#EAD8BF] border border-[#D9C4A5] rounded-md shadow-xs transition-all duration-200 cursor-pointer active:scale-98"
              >
                <Utensils className="w-4 h-4 text-[#B45309]" />
                <span>Order Now</span>
              </button>
            </div>

            {/* Trust and Heritage Markers - Unboxed clean metadata per constitution */}
            <div className="pt-6 border-t border-[#E8DFD1]/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#2C1810]">
                  100%
                </div>
                <div className="text-xs text-[#6B4B3E] font-medium mt-0.5">
                  Desi Ghee & Fresh Herbs
                </div>
              </div>
              <div className="border-l border-[#E8DFD1] pl-4">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#2C1810]">
                  14+
                </div>
                <div className="text-xs text-[#6B4B3E] font-medium mt-0.5">
                  Thali Delicacies
                </div>
              </div>
              <div className="border-l border-[#E8DFD1] pl-4">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#2C1810]">
                  4.9★
                </div>
                <div className="text-xs text-[#6B4B3E] font-medium mt-0.5">
                  Over 1,200+ Reviews
                </div>
              </div>
            </div>
          </div>

          {/* Right Showcase Card - Traditional Thali Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold frame border */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#B45309]/30 via-[#D97706]/10 to-[#991B1B]/20 blur-sm pointer-events-none" />

              <div className="relative rounded-xl overflow-hidden bg-[#24140D] border-2 border-[#D97706]/40 shadow-2xl group">
                <FoodImage
                  src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80"
                  alt="Authentic Andhra Special Thali Bhojanam"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle scrim gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Card overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FDE047]">
                      Chef's Signature Feast
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-sm border border-emerald-500/40">
                      Served Daily
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                    Andhra Special Bhojanam
                  </h3>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                    Steamed Sona Masoori rice, Muddapappu, aromatic ghee, spicy Avakaya, Gongura pachadi, and 10 traditional accompaniments.
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/20">
                    <span className="font-serif text-lg font-bold text-[#FDE047]">
                      ₹420 <span className="text-xs font-normal text-stone-300">/ Unlimited Feast</span>
                    </span>
                    <button
                      onClick={onOrderNow}
                      className="text-xs font-semibold bg-[#F59E0B] text-[#2C1810] hover:bg-[#D97706] hover:text-white px-3 py-1.5 rounded-md transition-colors shadow-xs cursor-pointer"
                    >
                      Order Thali
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating decorative badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#FDFBF7] border border-[#D9C4A5] rounded-lg shadow-lg p-3 flex items-center gap-3 max-w-[210px] hidden sm:flex">
                <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#2C1810] leading-tight">Banana Leaf Dining</p>
                  <p className="text-[10px] text-[#6B4B3E]">Traditional Bhojanam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
