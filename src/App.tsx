import { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, ShoppingBag } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SpecialitySection } from './components/SpecialitySection';
import { MenuSection } from './components/MenuSection';
import { ChefsSpecialSection } from './components/ChefsSpecialSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { DishModal } from './components/DishModal';
import { ReservationModal } from './components/ReservationModal';
import { Toast } from './components/Toast';
import { CartItem, MenuItem } from './types';
import { ALL_MENU_ITEMS, RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Start with empty or pre-loaded favorite if desired
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (dish: MenuItem, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { dish, quantity }];
    });
    setToastMessage(`Added "${dish.name}" to Order Tray`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C1810]">
      {/* Sticky Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onOrderNow={() => setIsCartOpen(true)}
        />

        {/* 2. About Us Section */}
        <AboutSection />

        {/* 3. Speciality Dishes Section (8 dishes) */}
        <SpecialitySection
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onSelectDish={(dish) => setSelectedDish(dish)}
        />

        {/* 4. Menu Section (Veg, Non-Veg, Traditional Meals with filters & search) */}
        <MenuSection
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onSelectDish={(dish) => setSelectedDish(dish)}
        />

        {/* 5. Chef's Special – Andhra Special Thali Section */}
        <ChefsSpecialSection
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
        />

        {/* 6. Why Choose Us Section (4 cards) */}
        <WhyChooseUs />

        {/* 7. Customer Reviews Section */}
        <ReviewsSection />

        {/* 8. Gallery Section */}
        <GallerySection />

        {/* 9. Location & Contact Section */}
        <LocationContactSection
          onOrderNow={() => setIsCartOpen(true)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* 10. Footer Section */}
      <Footer onScrollToTop={scrollToTop} />

      {/* Floating Action Controls */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end gap-3 pointer-events-none">
        {/* WhatsApp Quick Inquire Button */}
        <a
          href={`https://wa.me/919849012345?text=${encodeURIComponent(
            'Namaskaram Andhra Home Foods! I would like to inquire about today\'s special meals and booking.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-white"
          aria-label="Chat with Andhra Home Foods on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
        </a>

        {/* Floating Cart Button on mobile if items exist */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto sm:hidden p-3.5 bg-[#991B1B] text-white rounded-full shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center relative border-2 border-white cursor-pointer"
            aria-label="View current cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#FDE047]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F59E0B] text-[#2C1810] text-[10px] font-bold flex items-center justify-center font-mono">
              {totalCartCount}
            </span>
          </button>
        )}

        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto p-3 bg-[#2C1810] hover:bg-[#1B1009] text-[#F3E8DC] rounded-full shadow-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border border-[#D9C4A5]/40"
            aria-label="Scroll back to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Dish Story & Details Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          onViewCart={() => {
            setToastMessage(null);
            setIsCartOpen(true);
          }}
        />
      )}
    </div>
  );
}
