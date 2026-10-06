import { UtensilsCrossed, Heart, ArrowUp, Phone, MapPin, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onScrollToTop: () => void;
}

export function Footer({ onScrollToTop }: FooterProps) {
  const footerLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Specialities', href: '#specialities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#1C1008] text-[#F3E8DC] pt-16 pb-12 border-t border-[#3D2517] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3D2517] text-left">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#991B1B] text-[#FDFBF7] flex items-center justify-center font-display text-lg font-bold shadow-xs">
                <UtensilsCrossed className="w-5 h-5 text-[#FDE047]" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Andhra Home Foods
              </span>
            </div>

            <p className="font-serif italic text-lg text-[#F59E0B]">
              “Authentic Andhra Taste, Just Like Home”
            </p>

            <p className="text-xs text-[#BFA898] leading-relaxed max-w-sm">
              Dedicated to celebrating the rich culinary heritage of Andhra and Rayalaseema. Slow-cooked with cold-pressed oils, hand-pounded masalas, and the comforting spirit of home cooking.
            </p>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-[#2A180E] border border-[#4A2B18] text-[#D4C3B3] hover:text-[#F59E0B] hover:border-[#F59E0B] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-[#2A180E] border border-[#4A2B18] text-[#D4C3B3] hover:text-[#F59E0B] hover:border-[#F59E0B] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-[#2A180E] border border-[#4A2B18] text-[#D4C3B3] hover:text-[#F59E0B] hover:border-[#F59E0B] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base font-bold text-white tracking-wide">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#D4C3B3] hover:text-[#F59E0B] transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-base font-bold text-white tracking-wide">
              Reach Out
            </h3>
            <div className="space-y-3 text-xs text-[#D4C3B3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#A89182]">
              FSSAI Lic. No: 13622014000482 · Halal Certified Poultry · Pure Desi Ghee Preparations
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89182]">
          <p>© {new Date().getFullYear()} Andhra Home Foods. All Rights Reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>Prepared with</span>
            <Heart className="w-3.5 h-3.5 text-[#991B1B] fill-[#991B1B]" />
            <span>in authentic homestyle tradition</span>
          </p>

          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#D4C3B3] hover:text-[#F59E0B] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
