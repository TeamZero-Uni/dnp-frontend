import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product, quantity, color) => {
    setCartItems((prev) => {
      const isExist = prev.find(item => item.id === product.id && item.color === color);
      if (isExist) {
        return prev.map(item => (item.id === product.id && item.color === color) 
          ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, color }];
    });
  };

 
  const removeFromCart = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // (Update Quantity)
  const updateQuantity = (id, color, amount) => {
    setCartItems(prev => prev.map(item => 
      (item.id === id && item.color === color) ? { ...item, quantity: Math.max(1, amount) } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);