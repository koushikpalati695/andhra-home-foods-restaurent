import { useEffect } from 'react';
import { Check, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  onViewCart?: () => void;
}

export function Toast({ message, onClose, onViewCart }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#2C1810] text-[#FDFBF7] px-4 py-3 rounded-lg shadow-xl border border-[#D97706]/40 flex items-center gap-3 text-xs max-w-sm">
        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5" />
        </div>

        <div className="flex-1 truncate">
          <span className="font-semibold text-white">{message}</span>
        </div>

        {onViewCart && (
          <button
            onClick={onViewCart}
            className="text-[11px] font-bold text-[#FDE047] hover:underline whitespace-nowrap cursor-pointer"
          >
            View Tray
          </button>
        )}

        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-0.5"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
