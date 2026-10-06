import { useState } from 'react';
import { Plus, Check, Star, Sparkles, Flame, Eye } from 'lucide-react';
import { SPECIALITY_DISHES } from '../data/restaurantData';
import { MenuItem } from '../types';
import { FoodImage } from './FoodImage';

interface SpecialitySectionProps {
  onAddToCart: (dish: MenuItem) => void;
  onSelectDish: (dish: MenuItem) => void;
}

export function SpecialitySection({ onAddToCart, onSelectDish }: SpecialitySectionProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <section id="specialities" className="py-20 lg:py-28 bg-[#FDFBF7] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
            <span>Signature Creations</span>
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight">
            Our Speciality Dishes
          </h2>

          <p className="text-base text-[#6B4B3E]">
            Hand-picked culinary treasures prepared according to age-old Andhra cooking secrets, celebrating the authentic balance of fiery chillies, tangy gongura, and rich nut masalas.
          </p>
        </div>

        {/* 8 Speciality Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SPECIALITY_DISHES.map((dish) => {
            const isJustAdded = addedId === dish.id;

            return (
              <div
                key={dish.id}
                className="group flex flex-col bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#E3D6C3] hover:border-[#B45309]/50 shadow-xs hover:shadow-xl transition-all duration-300 text-left"
              >
                {/* Image Container with clickable preview */}
                <div
                  onClick={() => onSelectDish(dish)}
                  className="relative aspect-4/3 cursor-pointer overflow-hidden bg-[#24140D]"
                >
                  <FoodImage
                    src={dish.image}
                    alt={dish.name}
                    isPureVeg={dish.isPureVeg}
                    spiceLevel={dish.spiceLevel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-xs font-medium">
                      <Eye className="w-3.5 h-3.5 text-amber-300" />
                      <span>View Story</span>
                    </span>
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-mono text-amber-300 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{dish.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Telugu Name / Category text (no pills per anti-slop rules) */}
                    <div className="text-[11px] font-medium text-[#B45309] tracking-wide mb-1">
                      {dish.teluguName || (dish.isPureVeg ? 'Vegetarian' : 'Non-Vegetarian')}
                    </div>

                    <h3
                      onClick={() => onSelectDish(dish)}
                      className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#991B1B] transition-colors cursor-pointer leading-snug"
                    >
                      {dish.name}
                    </h3>

                    <p className="text-xs text-[#5C3D2E] mt-2 line-clamp-3 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Specialty Box Highlight */}
                    <div className="mt-3.5 p-2.5 rounded-md bg-[#F2E8D9] border-l-2 border-[#991B1B] text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1B] block">
                        Specialty
                      </span>
                      <p className="text-xs text-[#3A1D10] font-medium mt-0.5 leading-snug">
                        {dish.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Price & Add to Order */}
                  <div className="mt-5 pt-3.5 border-t border-[#E3D6C3] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8C6B58] block leading-none">Price</span>
                      <span className="font-serif text-xl font-bold text-[#2C1810] tracking-tight">
                        ₹{dish.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
                        isJustAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
                      }`}
                      aria-label={`Add ${dish.name} to order`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
