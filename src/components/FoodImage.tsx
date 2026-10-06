import { useState } from 'react';
import { Flame, UtensilsCrossed } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  isPureVeg?: boolean;
  spiceLevel?: 1 | 2 | 3;
}

export function FoodImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  isPureVeg,
  spiceLevel,
}: FoodImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#24140D] flex items-center justify-center ${containerClassName}`}>
      {/* Background warm shimmer while loading or as fallback foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D2012] via-[#2A160D] to-[#1A0D07]" />

      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
        />
      )}

      {/* Styled Fallback Container if image fails or before load */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#4A2616] via-[#2E180E] to-[#1F1009] text-[#F3E8DC]">
          <div className="w-12 h-12 rounded-full bg-[#991B1B]/30 border border-[#D97706]/40 flex items-center justify-center mb-2 shadow-inner">
            <UtensilsCrossed className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <span className="font-serif text-sm font-semibold tracking-wide text-[#FDE047] line-clamp-2 px-2">
            {alt}
          </span>
          <span className="text-[11px] text-[#D4A373] mt-1 tracking-wider uppercase">
            Andhra Home Foods
          </span>
        </div>
      )}

      {/* Subtle indicator pill / emblem overlay */}
      {(isPureVeg !== undefined || spiceLevel !== undefined) && (
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
          {isPureVeg !== undefined && (
            <div
              className={`w-4 h-4 rounded-xs border p-0.5 bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs ${
                isPureVeg ? 'border-emerald-600' : 'border-red-700'
              }`}
              title={isPureVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isPureVeg ? 'bg-emerald-600' : 'bg-red-700'
                }`}
              />
            </div>
          )}
          {spiceLevel && spiceLevel >= 2 && (
            <div
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-black/60 backdrop-blur-xs text-amber-400 text-[10px] font-medium border border-amber-500/30"
              title={`Spice Level: ${spiceLevel === 3 ? 'Andhra Fiery' : 'Medium Spice'}`}
            >
              <Flame className="w-2.5 h-2.5 fill-red-500 text-red-500 inline" />
              <span>{spiceLevel === 3 ? 'Andhra Hot' : 'Medium'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
