import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

const cartItems = persistentAtom("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse
});
const isCartOpen = atom(false);
const addItem = (product) => {
  const currentItems = cartItems.get();
  const existingItem = currentItems.find((item) => item.id === product.id);
  if (existingItem) {
    cartItems.set(
      currentItems.map(
        (item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  } else {
    cartItems.set([...currentItems, { ...product, quantity: 1 }]);
  }
  isCartOpen.set(true);
};
const removeItem = (id) => {
  cartItems.set(cartItems.get().filter((item) => item.id !== id));
};
const updateQuantity = (id, quantity) => {
  if (quantity <= 0) {
    removeItem(id);
    return;
  }
  cartItems.set(
    cartItems.get().map(
      (item) => item.id === id ? { ...item, quantity } : item
    )
  );
};
const toggleCart = () => {
  isCartOpen.set(!isCartOpen.get());
};
const clearCart = () => {
  cartItems.set([]);
};

export { addItem as a, cartItems as b, clearCart as c, isCartOpen as i, removeItem as r, toggleCart as t, updateQuantity as u };
