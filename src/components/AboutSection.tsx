import { Sparkles, Utensils, Heart, Award, ShieldCheck, Flame } from 'lucide-react';
import { RESTAURANT_INFO, HIGHLIGHTS } from '../data/restaurantData';
import { FoodImage } from './FoodImage';

export function AboutSection() {
  const iconMap: Record<string, React.ReactNode> = {
    'Authentic Andhra Recipes': <Award className="w-5 h-5 text-[#B45309]" />,
    'Fresh Ingredients': <Sparkles className="w-5 h-5 text-emerald-700" />,
    'Traditional Cooking': <Flame className="w-5 h-5 text-[#991B1B]" />,
    'Homestyle Taste': <Heart className="w-5 h-5 text-[#B45309]" />,
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F7F2E8] border-b border-[#E8DFD1] relative overflow-hidden">
      <div className="absolute inset-0 bg-kolam-subtle opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Storytelling Collage */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#D9C4A5] bg-[#24140D]">
                <FoodImage
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Traditional Indian kitchen and dining heritage"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-serif text-lg font-bold text-[#FDE047]">
                    Handcrafted in Clay & Brass
                  </p>
                  <p className="text-xs text-stone-200">
                    Preserving the age-old cooking techniques of rural Andhra households.
                  </p>
                </div>
              </div>

              {/* Offset secondary image */}
              <div className="absolute -bottom-8 -right-6 w-44 sm:w-56 h-40 sm:h-48 rounded-lg overflow-hidden shadow-2xl border-4 border-[#FDFBF7] bg-[#24140D] hidden sm:block">
                <FoodImage
                  src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80"
                  alt="Avakaya and traditional spices"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
              <span className="w-6 h-[1.5px] bg-[#991B1B]" />
              <span>Our Heritage & Philosophy</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] tracking-tight">
              About Andhra Home Foods
            </h2>

            {/* Exact required explanation */}
            <p className="text-base sm:text-lg text-[#4A2E18] leading-relaxed font-sans font-normal">
              {RESTAURANT_INFO.aboutDescription}
            </p>

            <p className="text-sm text-[#6B4B3E] leading-relaxed">
              From the vibrant spice corridors of Guntur and the piquant tamarind curries of coastal Nellore to the rustic ragi staples of Rayalaseema, our kitchen honors the depth and diversity of Andhra Pradesh. We grind our own podis, sun-cure our own avakaya pickles, and simmer dals until they achieve the velvety warmth of a mother’s cooking.
            </p>

            {/* 4 Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg bg-[#FDFBF7] border border-[#E3D6C3] shadow-xs flex items-start gap-3.5"
                >
                  <div className="p-2 rounded-md bg-[#F4E9D8] shrink-0 mt-0.5">
                    {iconMap[item.title] || <ShieldCheck className="w-5 h-5 text-[#991B1B]" />}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#2C1810]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B4B3E] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
