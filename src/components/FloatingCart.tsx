import React from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, toggleCart } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';

const FloatingCart: React.FC = () => {
  const $cartItems = useStore(cartItems);
  const count = $cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (count === 0) return null;

  return (
    <button
      onClick={toggleCart}
      className="md:hidden fixed bottom-8 right-6 z-[90] bg-[#3B2D20] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 animate-fade-in"
      aria-label="View Cart"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-[#7A5633] text-white text-[10px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold border-2 border-[#3B2D20]">
          {count}
        </span>
      </div>
    </button>
  );
};

export default FloatingCart;
