import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getCartItemsAPI, addToCartAPI, removeFromCartAPI, updateCartQuantityAPI } from '../api/api'; 
import { useAuth } from '../hooks/useAuth'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, isAuthenticated } = useAuth(); 

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const fetchCartItems = useCallback(async () => {
    if (isAuthenticated && user) {
      try {
        const responseData = await getCartItemsAPI(); 
        
        if (responseData.success) {
          const fetchedItems = responseData.data?.cartItems || []; 
          
          const formattedItems = fetchedItems.map(item => ({
            cartId: item.id, 
            id: item.p_id, 
            quantity: item.quantity,
            name: item.product?.p_name || "Unknown Product",
            price: item.product?.p_price || 0,
            image: item.product?.images?.[0]?.img_url || '/assets/images/placeholder.jpg',
            color: item.product?.p_color || "N/A"
          }));
          
          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = async (product, quantity, color) => {
    if (!isAuthenticated || !user) {
      window.location.href = '/login'; 
      return { success: false, message: "Please login first" };
    }

    try {
      const payload = {
        userId: user.userId || user.id,
        p_id: product.id || product.p_id, 
        quantity: quantity
      };
      
      const responseData = await addToCartAPI(payload);

      if (responseData.success) {
        await fetchCartItems();
        return { success: true, message: "Added to cart successfully!" };
      }
    } catch (error) {
      console.error("Cart error:", error);
      return { success: false, message: "Failed to add to cart" };
    }
  };

  // ---Remove & Update Functions ---
const removeFromCart = async (id, color) => {
    setCartItems(prev => prev.filter(item => {
      const itemId = item.id || item.p_id || item.cartId; 
    }));

    try {
      const responseData = await removeFromCartAPI(id);
      
      if (responseData.success) {
        await fetchCartItems();
      }
    } catch (error) {
      await fetchCartItems(); 
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

// --- Update Quantity ---
  const updateQuantity = async (id, color, amount) => {
    const newQty = Math.max(1, amount); 

    setCartItems(prev => prev.map(item => {
      const itemId = item.id || item.p_id || item.cartId;
      if (itemId === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));

    if (isAuthenticated && user) {
      try {
        const responseData = await updateCartQuantityAPI(id, newQty);
        if (!responseData.success) await fetchCartItems();
      } catch (error) {
        console.error("Error updating DB qty:", error);
        await fetchCartItems(); 
      }
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, isCartOpen, toggleCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);