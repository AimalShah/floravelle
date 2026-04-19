import React from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, toggleCart } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';

interface CartButtonProps {
  dark?: boolean;
  className?: string;
}

const CartButton: React.FC<CartButtonProps> = ({ dark = false, className = "" }) => {
  const $cartItems = useStore(cartItems);
  const count = $cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={toggleCart}
      className={`relative p-2 transition-all hover:scale-110 active:scale-95 ${
        dark ? 'text-[#3B2D20]' : 'text-white'
      } ${className}`}
      aria-label="View Cart"
    >
      <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-[#7A5633] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold border-2 border-[#F0EBE5]">
          {count}
        </span>
      )}
    </button>
  );
};

export default CartButton;
