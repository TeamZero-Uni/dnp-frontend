import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // භාණ්ඩයක් එකතු කිරීම
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

  // භාණ්ඩයක් ඉවත් කිරීම
  const removeFromCart = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  // ප්‍රමාණය වෙනස් කිරීම (Update Quantity)
  const updateQuantity = (id, color, amount) => {
    setCartItems(prev => prev.map(item => 
      (item.id === id && item.color === color) ? { ...item, quantity: Math.max(1, amount) } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);