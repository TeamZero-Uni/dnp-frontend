import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { useAuth } from '../hooks/useAuth';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await api.get(`/wishlist/${user.userId}`);
          if (response.data.success) {
            const productIds = response.data.wishlist.map(item => item.p_id);
            setWishlistItems(productIds);
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      } else {
        setWishlistItems([]); 
      }
    };

    fetchWishlist();
  }, [isAuthenticated, user]);

  const handleWishlistToggle = async (p_id) => {
    if (!isAuthenticated || !user) {
      window.location.href = '/login';
      return { success: false, message: "Not logged in" };
    }

    try {
      const payload = { userId: user.userId, p_id };
      const response = await api.post('/wishlist/toggle', payload);

      if (response.data.success) {
        if (response.data.isWishlisted) {
          setWishlistItems(prev => [...prev, p_id]);
        } else {
          setWishlistItems(prev => prev.filter(id => id !== p_id));
        }
        return { success: true, isWishlisted: response.data.isWishlisted };
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      return { success: false, message: "Error" };
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, handleWishlistToggle }}>
      {children}
    </WishlistContext.Provider>
  );
};