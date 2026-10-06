import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Send, CheckCircle2, ArrowRight, Sparkles, Utensils } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dine-in'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressOrTable, setAddressOrTable] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const packagingFee = items.length > 0 && orderType !== 'dine-in' ? 25 : 0;
  const deliveryFee = orderType === 'delivery' && subtotal < 500 && items.length > 0 ? 40 : 0;
  const grandTotal = subtotal + gst + packagingFee + deliveryFee;

  const handlePlaceOrder = (method: 'whatsapp' | 'direct') => {
    const generatedId = `AHF-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedId);

    if (method === 'whatsapp') {
      const itemsList = items
        .map((i) => `• ${i.dish.name} x ${i.quantity} (₹${i.dish.price * i.quantity})`)
        .join('\n');

      const messageText = `*Namaskaram Andhra Home Foods!* 🙏\nI would like to place an order:\n\n*Order Ref:* ${generatedId}\n*Order Type:* ${orderType.toUpperCase()}\n*Name:* ${customerName || 'Guest'}\n*Phone:* ${customerPhone || 'Not provided'}\n${
        orderType === 'dine-in' ? `*Table / Hall:* ${addressOrTable || 'Walk-in'}` : `*Address:* ${addressOrTable || 'Takeaway counter'}`
      }\n\n*Items:*\n${itemsList}\n\n*Subtotal:* ₹${subtotal}\n*GST (5%):* ₹${gst}\n${
        packagingFee ? `*Packaging:* ₹${packagingFee}\n` : ''
      }${deliveryFee ? `*Delivery:* ₹${deliveryFee}\n` : ''}*Total Amount:* ₹${grandTotal}\n${
        specialNote ? `\n*Note:* ${specialNote}` : ''
      }\n\nPlease confirm preparation and estimated time.`;

      const whatsappUrl = `https://wa.me/919849012345?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClearCart();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E3D6C3] text-left animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E3D6C3] bg-[#F7F2E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#991B1B]" />
            <h2 className="font-serif text-lg font-bold text-[#2C1810]">
              Your Order Tray
            </h2>
            <span className="text-xs font-mono text-[#8C6B58] bg-[#E8DAC6] px-2 py-0.5 rounded-full font-bold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#E8DAC6] text-[#4A2E18] transition-colors cursor-pointer"
            aria-label="Close Order Tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        {isSubmitted ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B45309]">
                Order Confirmed · {orderNumber}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2C1810]">
                Mee Vindu Tayaravutondi!
              </h3>
              <p className="text-xs text-[#6B4B3E]">
                Your meal is being prepared with pure ingredients and warm homestyle care.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF6EE] border border-[#E3D6C3] w-full text-left text-xs space-y-1.5 text-[#4A2E18]">
              <div className="flex justify-between">
                <span className="text-[#8C6B58]">Mode:</span>
                <span className="font-bold uppercase text-[#2C1810]">{orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6B58]">Amount Paid / Payable:</span>
                <span className="font-bold text-[#991B1B]">₹{grandTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6B58]">Estimated Prep Time:</span>
                <span className="font-semibold text-emerald-800">25–35 minutes</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C6B58]">
              Our captain will call {customerPhone || RESTAURANT_INFO.phone} with real-time updates.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-[#991B1B] hover:bg-[#7F1D1D] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Order More Dishes
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#F4E9D8] text-[#B45309] flex items-center justify-center">
              <Utensils className="w-8 h-8 opacity-70" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C1810]">Your tray is empty</h3>
            <p className="text-xs text-[#6B4B3E] max-w-xs">
              Explore our Specialities or grand Andhra Thali to start your homestyle feast.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-[#991B1B] text-white rounded-md hover:bg-[#7F1D1D] cursor-pointer"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Order Mode Switcher */}
            <div className="bg-[#FAF6EE] p-1.5 rounded-lg border border-[#E3D6C3] grid grid-cols-3 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-1.5 rounded font-medium transition-colors cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#2C1810] text-white shadow-xs'
                    : 'text-[#6B4B3E] hover:text-[#2C1810]'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-1.5 rounded font-medium transition-colors cursor-pointer ${
                  orderType === 'pickup'
                    ? 'bg-[#2C1810] text-white shadow-xs'
                    : 'text-[#6B4B3E] hover:text-[#2C1810]'
                }`}
              >
                Takeaway
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`py-1.5 rounded font-medium transition-colors cursor-pointer ${
                  orderType === 'dine-in'
                    ? 'bg-[#2C1810] text-white shadow-xs'
                    : 'text-[#6B4B3E] hover:text-[#2C1810]'
                }`}
              >
                Dine-in Order
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block">
                Selected Dishes
              </span>

              {items.map((item) => (
                <div
                  key={item.dish.id}
                  className="p-3 rounded-lg bg-white border border-[#E3D6C3] shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-2.5 h-2.5 rounded-xs border p-0.5 flex items-center justify-center shrink-0 ${
                          item.dish.isPureVeg ? 'border-emerald-600' : 'border-red-700'
                        }`}
                      >
                        <div
                          className={`w-1 h-1 rounded-full ${
                            item.dish.isPureVeg ? 'bg-emerald-600' : 'bg-red-700'
                          }`}
                        />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#2C1810] truncate">
                        {item.dish.name}
                      </h4>
                    </div>

                    <div className="text-xs text-[#8C6B58] font-mono mt-0.5">
                      ₹{item.dish.price} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#D9C4A5] rounded-md bg-[#FAF6EE]">
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, -1)}
                        className="p-1 hover:bg-[#E8DAC6] text-[#4A2E18] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-bold text-[#2C1810]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, 1)}
                        className="p-1 hover:bg-[#E8DAC6] text-[#4A2E18] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.dish.id)}
                      className="p-1.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Details Form */}
            <div className="space-y-3 pt-2 border-t border-[#E8DFD1]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block">
                {orderType === 'dine-in' ? 'Table & Contact' : 'Delivery & Contact'}
              </span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
                />
                <input
                  type="tel"
                  placeholder="Mobile (10 digits)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
                />
              </div>

              <input
                type="text"
                placeholder={
                  orderType === 'dine-in'
                    ? 'Table Number (or mention Walk-in Hall)'
                    : orderType === 'pickup'
                    ? 'Pickup Time (e.g. In 20 minutes)'
                    : 'Complete Delivery Address & Landmark'
                }
                value={addressOrTable}
                onChange={(e) => setAddressOrTable(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
              />

              <input
                type="text"
                placeholder="Special Cooking Note (e.g., Less spicy, Extra ghee, No onions)"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
              />
            </div>

            {/* Bill Summary */}
            <div className="p-3.5 rounded-lg bg-[#FAF6EE] border border-[#E3D6C3] text-xs space-y-1.5 text-[#5C3D2E]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono font-medium text-[#2C1810]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant GST (5%):</span>
                <span className="font-mono font-medium text-[#2C1810]">₹{gst}</span>
              </div>
              {packagingFee > 0 && (
                <div className="flex justify-between">
                  <span>Eco-Packaging:</span>
                  <span className="font-mono font-medium text-[#2C1810]">₹{packagingFee}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span className="font-mono font-medium text-[#2C1810]">₹{deliveryFee}</span>
                </div>
              )}
              {subtotal >= 500 && orderType === 'delivery' && (
                <div className="text-[11px] text-emerald-700 font-medium">
                  ✓ Free Delivery Applied (Orders over ₹500)
                </div>
              )}

              <div className="pt-2 border-t border-[#E8DAC6] flex justify-between items-center text-sm font-bold text-[#2C1810]">
                <span>To Pay:</span>
                <span className="font-serif text-lg text-[#991B1B]">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        )}

        {/* Drawer Footer Actions */}
        {!isSubmitted && items.length > 0 && (
          <div className="p-5 border-t border-[#E3D6C3] bg-[#F7F2E8] space-y-2">
            <button
              onClick={() => handlePlaceOrder('whatsapp')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Order via WhatsApp (Instant Dispatch)</span>
            </button>

            <button
              onClick={() => handlePlaceOrder('direct')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2C1810] hover:bg-[#1B1009] text-white rounded-md text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <span>Confirm Order (Pay on Delivery / Cash)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
