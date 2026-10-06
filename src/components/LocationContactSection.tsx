import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, ExternalLink, Calendar, MessageSquare, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationContactProps {
  onOrderNow: () => void;
  onOpenReservation: () => void;
}

export function LocationContactSection({ onOrderNow, onOpenReservation }: LocationContactProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(RESTAURANT_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F7F2E8] border-b border-[#E8DFD1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#991B1B]">
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
            <span>Hospitality & Location</span>
            <span className="w-5 h-[1.5px] bg-[#991B1B]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight">
            Visit Andhra Home Foods
          </h2>

          <p className="text-base text-[#6B4B3E]">
            Step into our warm dining hall for plantain-leaf Bhojanam, or reach out to pre-order feast packs for family gatherings and celebrations.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Contact Cards, Address, Hours */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-left">
            <div className="p-6 sm:p-8 rounded-xl bg-[#FDFBF7] border border-[#E3D6C3] shadow-xs space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F4E9D8] border border-[#D9C4A5] flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-[#991B1B]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2C1810]">
                    Restaurant Location
                  </h3>
                  <p className="text-sm text-[#5C3D2E] mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-[#8C6B58] mt-1">
                    Landmark: Near Peddamma Temple Metro Station & Andhra Cultural Association.
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8DAC6]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F4E9D8] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#B45309]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B58]">
                      Telephone
                    </h4>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="text-sm font-semibold text-[#2C1810] hover:text-[#991B1B] block mt-0.5"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="text-[11px] text-[#B45309] hover:underline mt-0.5 block cursor-pointer"
                    >
                      {copiedPhone ? 'Copied to clipboard!' : 'Copy number'}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F4E9D8] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#B45309]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6B58]">
                      Email Inquiries
                    </h4>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className="text-sm font-semibold text-[#2C1810] hover:text-[#991B1B] block mt-0.5 truncate"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                    <span className="text-[11px] text-[#8C6B58] block mt-0.5">
                      Catering & bulk feasts
                    </span>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-[#E8DAC6]">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#991B1B]" />
                  <h4 className="font-serif text-base font-bold text-[#2C1810]">
                    Opening Hours
                  </h4>
                </div>
                <div className="space-y-2 text-xs text-[#4A2E18]">
                  {RESTAURANT_INFO.openingHours.map((slot) => (
                    <div
                      key={slot.days}
                      className="flex items-center justify-between p-2 rounded-md bg-[#FAF6EE] border border-[#E8DAC6]"
                    >
                      <span className="font-semibold text-[#2C1810]">{slot.days}</span>
                      <span className="text-[#6B4B3E]">
                        Lunch: {slot.lunch} · Dinner: {slot.dinner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Call-to-Actions as mandated */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOrderNow}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-md transition-colors cursor-pointer shadow-xs active:scale-98"
                >
                  <Utensils className="w-4 h-4 text-[#FDE047]" />
                  <span>Order Now</span>
                </button>

                <button
                  onClick={onOpenReservation}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#2C1810] bg-[#F4E9D8] hover:bg-[#EAD8BF] border border-[#D9C4A5] rounded-md transition-colors cursor-pointer active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-[#B45309]" />
                  <span>Reserve Table</span>
                </button>

                <a
                  href={`https://wa.me/919849012345?text=${encodeURIComponent(
                    'Namaskaram! I would like to inquire about dining and ordering at Andhra Home Foods.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-md transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Mockup Section */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 rounded-xl overflow-hidden border border-[#D9C4A5] shadow-xs bg-[#E5E0D8] relative min-h-[360px] flex flex-col">
              {/* Simulated stylized Google Map canvas */}
              <div className="relative flex-1 bg-[#EBE7DF] overflow-hidden flex items-center justify-center">
                {/* Visual Map Grid representation */}
                <div className="absolute inset-0 bg-kolam-subtle opacity-70" />
                <div className="absolute top-1/3 left-0 right-0 h-4 bg-[#DFD9CE] rotate-6 border-y border-[#D0C7B8]" />
                <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-[#DFD9CE] -rotate-12 border-x border-[#D0C7B8]" />
                <div className="absolute top-1/2 left-0 right-0 h-8 bg-[#DFD9CE] -rotate-3 border-y border-[#D0C7B8]" />
                <div className="absolute top-0 bottom-0 left-2/3 w-8 bg-[#DFD9CE] rotate-6 border-x border-[#D0C7B8]" />

                {/* Simulated Green Park Area */}
                <div className="absolute top-8 right-12 w-32 h-28 bg-[#D8E6D3] rounded-2xl border border-[#C5D8BF] opacity-80" />
                <div className="absolute bottom-10 left-10 w-40 h-24 bg-[#D8E6D3] rounded-3xl border border-[#C5D8BF] opacity-80" />

                {/* Central Restaurant Marker Pin */}
                <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                  <div className="p-3 bg-[#991B1B] text-white rounded-full shadow-2xl border-2 border-white ring-4 ring-[#991B1B]/30">
                    <Utensils className="w-6 h-6 text-[#FDE047]" />
                  </div>
                  <div className="mt-2 bg-[#2C1810] text-[#FDFBF7] text-xs font-serif font-bold px-3 py-1 rounded shadow-lg border border-[#D97706]/40 whitespace-nowrap">
                    Andhra Home Foods
                  </div>
                  <div className="text-[10px] text-[#2C1810] font-sans font-medium bg-white/90 px-2 py-0.5 rounded shadow-xs mt-0.5">
                    Road No. 36, Jubilee Hills
                  </div>
                </div>

                {/* Map Control Bar Top */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded shadow-md border border-stone-200 text-xs text-stone-700 font-medium flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#991B1B]" />
                  <span>Jubilee Hills, Hyderabad</span>
                </div>

                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium px-3.5 py-2 rounded-md shadow-md border border-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </div>

              {/* Map Footer Bar with Parking & Transit Info */}
              <div className="p-4 bg-[#FDFBF7] border-t border-[#D9C4A5] text-left grid grid-cols-2 gap-3 text-xs text-[#5C3D2E]">
                <div>
                  <span className="font-bold text-[#2C1810] block">Valet Parking:</span>
                  <span>Complimentary valet parking available at restaurant entrance.</span>
                </div>
                <div>
                  <span className="font-bold text-[#2C1810] block">Metro Transit:</span>
                  <span>2-minute walk from Peddamma Temple Metro Station (Blue Line).</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
