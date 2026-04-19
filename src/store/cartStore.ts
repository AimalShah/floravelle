import { atom, map } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  subtitle: string;
}

// Persistent cart store
export const cartItems = persistentAtom<CartItem[]>('cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Cart drawer state
export const isCartOpen = atom(false);

// Actions
export const addItem = (product: Omit<CartItem, 'quantity'>) => {
  const currentItems = cartItems.get();
  const existingItem = currentItems.find((item) => item.id === product.id);

  if (existingItem) {
    cartItems.set(
      currentItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    cartItems.set([...currentItems, { ...product, quantity: 1 }]);
  }
  isCartOpen.set(true); // Open cart when item is added
};

export const removeItem = (id: string) => {
  cartItems.set(cartItems.get().filter((item) => item.id !== id));
};

export const updateQuantity = (id: string, quantity: number) => {
  if (quantity <= 0) {
    removeItem(id);
    return;
  }
  cartItems.set(
    cartItems.get().map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
  );
};

export const toggleCart = () => {
  isCartOpen.set(!isCartOpen.get());
};

export const clearCart = () => {
  cartItems.set([]);
};
