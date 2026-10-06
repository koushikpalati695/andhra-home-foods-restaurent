import { useState } from 'react';
import { X, Plus, Minus, Star, Flame, Check, Utensils, Heart } from 'lucide-react';
import { MenuItem } from '../types';
import { FoodImage } from './FoodImage';

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number) => void;
}

export function DishModal({ dish, onClose, onAddToCart }: DishModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 text-left"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#D9C4A5] shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-16/10 bg-[#24140D]">
          <FoodImage
            src={dish.image}
            alt={dish.name}
            isPureVeg={dish.isPureVeg}
            spiceLevel={dish.spiceLevel}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-5 right-5 text-white">
            {dish.teluguName && (
              <span className="text-xs font-serif text-[#FDE047] block mb-0.5">
                {dish.teluguName}
              </span>
            )}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              {dish.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Metadata Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1] text-xs">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-[#2C1810]">
                ₹{dish.price}
              </span>
              {dish.portionSize && (
                <span className="text-[#8C6B58] text-[11px]">({dish.portionSize})</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 font-mono text-[#2C1810]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{dish.rating.toFixed(1)}</span>
                <span className="text-[#8C6B58]">({dish.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1 text-[#991B1B] font-medium">
                <Flame className="w-3.5 h-3.5 fill-[#991B1B]" />
                <span>
                  {dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Andhra Hot'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B58] mb-1">
              About This Recipe
            </h4>
            <p className="text-sm text-[#4A2E18] leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Specialty callout */}
          <div className="p-3 rounded-lg bg-[#FAF6EE] border-l-3 border-[#991B1B] text-xs">
            <span className="font-bold text-[#991B1B] block uppercase tracking-wide">
              Culinary Specialty:
            </span>
            <p className="text-[#3A1D10] mt-0.5">{dish.specialty}</p>
          </div>

          {/* Key Ingredients */}
          {dish.keyIngredients && dish.keyIngredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B58] mb-2">
                Key Homestyle Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.keyIngredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs text-[#4A2E18] bg-[#F2E8D9] px-2.5 py-1 rounded-sm"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pairing Recommendation */}
          {dish.pairing && (
            <div className="text-xs text-[#6B4B3E] italic bg-[#FDFBF7] p-2.5 rounded border border-[#E3D6C3]">
              <span className="font-semibold not-italic text-[#2C1810]">Recommended Pairing: </span>
              {dish.pairing}
            </div>
          )}

          {/* Quantity and Add to Tray */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="flex items-center border border-[#D9C4A5] rounded-md bg-[#FAF6EE]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-[#E8DAC6] text-[#4A2E18] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-mono text-sm font-bold text-[#2C1810]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-[#E8DAC6] text-[#4A2E18] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer shadow-md active:scale-98 ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order Tray!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {quantity > 1 ? `(${quantity})` : ''} · ₹{dish.price * quantity}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
