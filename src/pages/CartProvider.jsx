import React, { createContext, useState, useContext } from "react";

// إنشاء Context
const CartContext = createContext();

// hook علشان نسهل الاستخدام
export function useCart() {
  return useContext(CartContext);
}

// Provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // دالة لإضافة منتج
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        // لو المنتج موجود نزود الكمية
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // لو جديد نضيفه
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // دالة لإزالة منتج
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // دالة لتفريغ الكارت
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
