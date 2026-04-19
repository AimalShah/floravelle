import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen, removeItem, updateQuantity, toggleCart } from '../store/cartStore';
import { gsap } from 'gsap';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

const CartDrawer: React.FC = () => {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ($isCartOpen) {
      // Prevent scroll when cart is open
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.4,
        ease: 'power2.out',
      });
      tl.to(drawerRef.current, {
        x: 0,
        duration: 0.6,
        ease: 'expo.out',
      }, '-=0.2');
      tl.fromTo(contentRef.current?.children || [], 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );
    } else {
      document.body.style.overflow = '';
      
      const tl = gsap.timeline();
      tl.to(drawerRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'expo.in',
      });
      tl.to(overlayRef.current, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.3,
        ease: 'power2.in',
      }, '-=0.2');
    }
  }, [$isCartOpen]);

  const subtotal = $cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] opacity-0 invisible"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#F0EBE5] z-[101] shadow-2xl translate-x-full flex flex-col"
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-[#A39579]/20">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#3B2D20]" />
            <h2 className="text-xl font-heading text-[#3B2D20] uppercase tracking-wider">Your Cart</h2>
            <span className="bg-[#7A5633] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
              {$cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-[#A39579]/10 rounded-full transition-colors text-[#3B2D20]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-6 space-y-8">
          {$cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-[#E8E4DE] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[#A39579]" />
              </div>
              <div>
                <p className="text-[#3B2D20] font-heading text-xl uppercase tracking-widest">Cart is empty</p>
                <p className="text-gray-500 mt-2">Discover your next signature scent.</p>
              </div>
              <button
                onClick={toggleCart}
                className="px-8 py-3 border border-[#7A5633] text-[#7A5633] hover:bg-[#7A5633] hover:text-white transition-all duration-500 uppercase tracking-widest text-sm font-medium"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            $cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-32 bg-[#E8E4DE] rounded-sm p-2 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[#A39579] text-[10px] uppercase tracking-widest mb-1">{item.subtitle}</p>
                        <h3 className="text-[#3B2D20] font-heading text-lg uppercase tracking-wider">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[#3B2D20] font-medium mt-1">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-[#A39579]/30 rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-[#7A5633] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-[#7A5633] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {$cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#A39579]/20 space-y-4">
            <div className="flex justify-between items-center text-[#3B2D20]">
              <span className="uppercase tracking-[0.2em] text-sm font-medium">Subtotal</span>
              <span className="text-xl font-heading">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-500 italic text-center">Shipping and taxes calculated at checkout.</p>
            <button className="w-full bg-[#3B2D20] text-white py-4 uppercase tracking-[0.3em] text-sm font-medium hover:bg-[#7A5633] transition-all duration-500 shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
