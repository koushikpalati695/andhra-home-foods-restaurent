import { Star, Quote, CheckCircle, ThumbsUp } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/restaurantData';

export function ReviewsSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#F7F2E8] border-b border-[#E8DFD1] relative overflow-hidden">
      <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
            <span>Guest Experiences</span>
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight">
            Customer Reviews
          </h2>

          <p className="text-base text-[#6B4B3E]">
            Read what our patrons love about our traditional Andhra spice secrets, warm hospitality, and homestyle dining.
          </p>
        </div>

        {/* 4 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[#FDFBF7] border border-[#E3D6C3] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Rating Stars & Dine Type */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-[#8C6B58] bg-[#F2E8D9] px-2 py-0.5 rounded-sm">
                    {rev.dineType}
                  </span>
                </div>

                {/* Comment with Quote icon */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-[#E8DAC6] mb-1.5 opacity-60" />
                  <p className="text-xs text-[#4A2E18] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Author & Favorite Dish */}
              <div className="mt-5 pt-4 border-t border-[#E8DAC6]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#2C1810] leading-snug">
                      {rev.name}
                    </h3>
                    <p className="text-[11px] text-[#8C6B58]">{rev.location}</p>
                  </div>
                </div>

                <div className="mt-2.5 text-[11px] text-[#991B1B] font-medium flex items-center gap-1.5">
                  <ThumbsUp className="w-3 h-3 text-[#991B1B] shrink-0" />
                  <span className="truncate">Favorite: {rev.favoriteDish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adjacency Trust Quote */}
        <div className="mt-12 p-4 rounded-lg bg-[#FDFBF7] border border-[#D9C4A5] max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-serif text-sm font-bold text-[#2C1810]">
              Loved by over 25,000+ Andhra food enthusiasts
            </div>
            <div className="text-xs text-[#6B4B3E]">
              Average 4.9/5 across Swiggy, Zomato, and Google Maps dining reviews.
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-300">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>100% Genuine Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
