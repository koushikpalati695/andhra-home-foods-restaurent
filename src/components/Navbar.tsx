import { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Phone, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export function Navbar({ cartCount, onOpenCart, onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Specialities', href: '#specialities' },
    { label: 'Menu', href: '#menu' },
    { label: 'Thali Feast', href: '#chefs-special' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit Us', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFD1]'
          : 'bg-[#FDFBF7]/80 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
          <a
            href="#"
            className="flex items-center gap-2 group text-left focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-full bg-[#991B1B] text-[#FDFBF7] flex items-center justify-center font-display text-lg font-bold shadow-xs group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#3A1D10] group-hover:text-[#991B1B] transition-colors leading-tight">
                Andhra Home Foods
              </span>
              <span className="text-[10px] tracking-wider uppercase font-medium text-[#B45309]">
                Authentic Homestyle Cuisine
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4A2E18]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-[#991B1B] transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#991B1B] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#3A1D10] bg-[#F4E9D8] hover:bg-[#EAD8BF] border border-[#D9C4A5] rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Reserve Table</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer active:scale-95"
              aria-label="View Order Tray"
            >
              <ShoppingBag className="w-4 h-4 text-[#FDE047]" />
              <span className="hidden xs:inline">Order Tray</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#2C1810] text-[11px] font-bold flex items-center justify-center font-mono tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A2E18] hover:text-[#991B1B] hover:bg-[#F4E9D8] rounded-md transition-colors focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E8DFD1] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pt-2 pb-4 border-b border-[#E8DFD1]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#3A1D10] hover:text-[#991B1B] py-2 px-2 rounded-md hover:bg-[#F5ECE0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#3A1D10] bg-[#F4E9D8] border border-[#D9C4A5] rounded-md"
            >
              <Calendar className="w-4 h-4 text-[#B45309]" />
              <span>Book a Table</span>
            </button>
            <a
              href="tel:+919849012345"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#4A2E18] hover:text-[#991B1B] text-center"
            >
              <Phone className="w-4 h-4 text-[#991B1B]" />
              <span>Call: +91 98490 12345</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
