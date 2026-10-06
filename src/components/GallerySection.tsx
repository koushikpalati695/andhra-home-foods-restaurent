import { useState } from 'react';
import { Eye, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryImage } from '../types';
import { FoodImage } from './FoodImage';

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterTabs = ['All', 'Thali', 'Specialities', 'Desserts', 'Dining Ambiance'];

  const displayedImages = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = displayedImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % displayedImages.length;
    setSelectedImage(displayedImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = displayedImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + displayedImages.length) % displayedImages.length;
    setSelectedImage(displayedImages[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FDFBF7] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
            <span>Visual Feast</span>
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight">
            Culinary & Ambiance Gallery
          </h2>

          <p className="text-base text-[#6B4B3E]">
            A glimpse into our traditional banana-leaf feasts, slow-simmered regional gravies, crispy fry dishes, and welcoming South Indian dining room.
          </p>
        </div>

        {/* Filter buttons conforming to zero-pill interactive tab rules */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tab
                  ? 'bg-[#991B1B] text-white shadow-xs'
                  : 'bg-[#F2E8D9] text-[#4A2E18] hover:bg-[#E8DAC6]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-xl overflow-hidden bg-[#24140D] border border-[#E3D6C3] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-4/3"
            >
              <FoodImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Information overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-left text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-[#FDE047] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
                {item.teluguTitle && (
                  <p className="text-xs text-[#EAD8BF] font-serif">{item.teluguTitle}</p>
                )}
                <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1F120A] rounded-2xl overflow-hidden border border-[#D97706]/40 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer hidden sm:flex"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer hidden sm:flex"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-[#0F0804]">
              <FoodImage
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Footer */}
            <div className="p-6 bg-[#26160C] border-t border-[#3D2517]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase text-[#FDE047] tracking-wider">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.teluguTitle && (
                    <p className="text-xs text-[#EAD8BF] font-serif">{selectedImage.teluguTitle}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-[#D4C3B3] mt-2 leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
