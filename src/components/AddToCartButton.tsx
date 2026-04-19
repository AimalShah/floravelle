import React from 'react';
import { addItem } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    subtitle: string;
  };
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = "" }) => {
  return (
    <button
      onClick={() => addItem(product)}
      className={`inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#7A5633] text-white rounded-full hover:bg-[#3B2D20] transition-all duration-300 shadow-md uppercase tracking-widest text-sm font-semibold group ${className}`}
    >
      <ShoppingBag className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
