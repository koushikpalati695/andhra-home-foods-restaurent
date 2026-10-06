import { useState } from 'react';
import { X, Calendar, Users, Clock, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('1:00 PM (Lunch)');
  const [guests, setGuests] = useState(4);
  const [seatingType, setSeatingType] = useState('Traditional Plantain Leaf Dining Hall');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Family Lunch / Dinner');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const timeSlots = [
    '12:00 PM (Lunch)',
    '1:00 PM (Lunch)',
    '2:00 PM (Lunch)',
    '7:00 PM (Dinner)',
    '8:00 PM (Dinner)',
    '9:00 PM (Dinner)',
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `AHF-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 text-left"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#D9C4A5] shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E3D6C3] bg-[#F7F2E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#991B1B]" />
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2C1810]">
                Reserve a Traditional Table
              </h2>
              <p className="text-[11px] text-[#6B4B3E]">Andhra Home Foods · Jubilee Hills</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#E8DAC6] text-[#4A2E18] transition-colors cursor-pointer"
            aria-label="Close reservation dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B45309]">
                Confirmation: {bookingRef}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2C1810]">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs text-[#6B4B3E]">
                We look forward to serving you an authentic homestyle Andhra feast.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF6EE] border border-[#E3D6C3] text-left text-xs space-y-2 text-[#4A2E18]">
              <div className="flex justify-between">
                <span className="text-[#8C6B58]">Guest Name:</span>
                <span className="font-bold text-[#2C1810]">{name || 'Guest Patron'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6B58]">Date & Time:</span>
                <span className="font-bold text-[#2C1810]">{date} at {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6B58]">Guests:</span>
                <span className="font-bold text-[#2C1810]">{guests} Persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6B58]">Section:</span>
                <span className="font-medium text-[#2C1810]">{seatingType}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C6B58]">
              A confirmation SMS has been queued for {phone || RESTAURANT_INFO.phone}. Tables are held for 15 minutes past reservation time.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#991B1B] hover:bg-[#7F1D1D] text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block mb-1">
                  Dining Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block mb-1">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block mb-1">
                Preferred Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-1 text-[11px] rounded-md border text-center transition-colors cursor-pointer ${
                      timeSlot === slot
                        ? 'bg-[#991B1B] text-white border-[#991B1B] font-semibold'
                        : 'bg-white border-[#D9C4A5] text-[#4A2E18] hover:bg-[#F4E9D8]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block mb-1">
                Seating Area Preference
              </label>
              <select
                value={seatingType}
                onChange={(e) => setSeatingType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
              >
                <option value="Traditional Plantain Leaf Dining Hall">Traditional Banana Leaf Hall</option>
                <option value="AC Family Dining Section">AC Family Dining Section</option>
                <option value="Private Alcove (Large Group)">Private Alcove (Large Group)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block mb-1">
                  Primary Contact Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sravani Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B58] block mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9C4A5] rounded-md text-[#2C1810] focus:ring-1 focus:ring-[#991B1B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8DFD1]">
              <button
                type="submit"
                className="w-full py-3 bg-[#991B1B] hover:bg-[#7F1D1D] text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer active:scale-98"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
