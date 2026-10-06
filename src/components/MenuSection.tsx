import { useState, useMemo } from 'react';
import { Search, Plus, Check, Filter, Utensils, Star, Flame, Eye, Leaf } from 'lucide-react';
import { ALL_MENU_ITEMS } from '../data/restaurantData';
import { FoodCategory, MenuItem } from '../types';
import { FoodImage } from './FoodImage';

interface MenuSectionProps {
  onAddToCart: (dish: MenuItem) => void;
  onSelectDish: (dish: MenuItem) => void;
}

export function MenuSection({ onAddToCart, onSelectDish }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [spiceFilter, setSpiceFilter] = useState<number | 'all'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'veg', label: 'Veg Dishes' },
    { id: 'non-veg', label: 'Non-Veg Specialties' },
    { id: 'meals', label: 'Traditional Meals' },
    { id: 'desserts-beverages', label: 'Sweets & Coolers' },
  ];

  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Pure veg toggle
      if (pureVegOnly && !item.isPureVeg) {
        return false;
      }
      // Spice level filter
      if (spiceFilter !== 'all' && item.spiceLevel !== spiceFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTelugu = item.teluguName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSpecialty = item.specialty.toLowerCase().includes(query);
        const matchesIngredients = item.keyIngredients?.some((i) => i.toLowerCase().includes(query));
        return matchesName || matchesTelugu || matchesDesc || matchesSpecialty || matchesIngredients;
      }
      return true;
    });
  }, [activeCategory, pureVegOnly, spiceFilter, searchQuery]);

  const handleAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setJustAddedId(dish.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#F7F2E8] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
            <span>Homestyle Recipes</span>
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight">
            Our Traditional Menu
          </h2>

          <p className="text-base text-[#6B4B3E]">
            Explore our curated selection of authentic Andhra dishes prepared fresh with time-tested spices and homestyle love.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#FDFBF7] p-4 sm:p-6 rounded-xl border border-[#E3D6C3] shadow-xs mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6B58]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g., Gongura, Pappu, Gutti Vankaya, Biryani)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] placeholder-[#8C6B58] focus:outline-hidden focus:ring-1 focus:ring-[#991B1B] focus:border-[#991B1B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C6B58] hover:text-[#2C1810]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Toggles */}
            <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3 text-xs">
              {/* Pure Veg Toggle */}
              <button
                onClick={() => setPureVegOnly(!pureVegOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md font-semibold border transition-all cursor-pointer ${
                  pureVegOnly
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-500 shadow-xs'
                    : 'bg-white text-[#5C3D2E] border-[#D9C4A5] hover:border-emerald-600'
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-xs border border-emerald-600 p-0.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </div>
                <span>Pure Veg Only</span>
              </button>

              {/* Spice Filter Dropdown */}
              <div className="flex items-center gap-1 bg-white border border-[#D9C4A5] rounded-md p-1">
                <span className="text-[11px] text-[#8C6B58] px-2 font-medium flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#991B1B]" /> Spice:
                </span>
                <button
                  onClick={() => setSpiceFilter('all')}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    spiceFilter === 'all'
                      ? 'bg-[#991B1B] text-white font-medium'
                      : 'text-[#5C3D2E] hover:text-[#2C1810]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSpiceFilter(1)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    spiceFilter === 1
                      ? 'bg-[#991B1B] text-white font-medium'
                      : 'text-[#5C3D2E] hover:text-[#2C1810]'
                  }`}
                >
                  Mild
                </button>
                <button
                  onClick={() => setSpiceFilter(2)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    spiceFilter === 2
                      ? 'bg-[#991B1B] text-white font-medium'
                      : 'text-[#5C3D2E] hover:text-[#2C1810]'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setSpiceFilter(3)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    spiceFilter === 3
                      ? 'bg-[#991B1B] text-white font-medium'
                      : 'text-[#5C3D2E] hover:text-[#2C1810]'
                  }`}
                >
                  Hot 🌶️
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs: Interactive segmented controls conforming to zero-pill discipline */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-[#E8DFD1] no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#2C1810] text-[#FDFBF7] shadow-xs'
                    : 'bg-[#F2E8D9] text-[#4A2E18] hover:bg-[#E8DAC6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-[#FDFBF7] rounded-xl border border-dashed border-[#D9C4A5]">
            <Utensils className="w-10 h-10 text-[#B45309] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#2C1810]">No dishes match your filter</h3>
            <p className="text-xs text-[#6B4B3E] mt-1">Try resetting the search keyword or spice preference.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setPureVegOnly(false);
                setSpiceFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-[#991B1B] text-white rounded-md hover:bg-[#7F1D1D]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => {
              const isAdded = justAddedId === dish.id;

              return (
                <div
                  key={dish.id}
                  className="group bg-[#FDFBF7] rounded-xl overflow-hidden border border-[#E3D6C3] hover:border-[#B45309]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Image Area */}
                    <div
                      onClick={() => onSelectDish(dish)}
                      className="relative h-48 cursor-pointer overflow-hidden bg-[#24140D]"
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
                          <span>View Details</span>
                        </span>
                      </div>

                      {dish.portionSize && (
                        <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-stone-200">
                          {dish.portionSize}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {dish.teluguName && (
                            <span className="text-[11px] font-medium text-[#B45309] block">
                              {dish.teluguName}
                            </span>
                          )}
                          <h3
                            onClick={() => onSelectDish(dish)}
                            className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#991B1B] transition-colors cursor-pointer"
                          >
                            {dish.name}
                          </h3>
                        </div>

                        <span className="font-serif text-lg font-bold text-[#2C1810] shrink-0">
                          ₹{dish.price}
                        </span>
                      </div>

                      <p className="text-xs text-[#5C3D2E] mt-2 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>

                      {/* Specialty note */}
                      <div className="mt-3 text-xs text-[#7F1D1D] bg-[#FDF2F2] p-2 rounded border border-[#FECACA]/60 leading-snug">
                        <span className="font-semibold">Specialty: </span>
                        {dish.specialty}
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#F2E8D9]">
                    <div className="flex items-center gap-2 text-[11px] text-[#8C6B58]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-mono font-semibold text-[#2C1810]">
                        {dish.rating.toFixed(1)}
                      </span>
                      <span>({dish.reviewsCount})</span>
                    </div>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
                      }`}
                      aria-label={`Add ${dish.name} to order`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
