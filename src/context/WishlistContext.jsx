import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../hooks/useAuth';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user, isAuthenticated } = useAuth();

  // Fetch wishlist when user logs in
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated && user?.userId) {
        try {
          const response = await api.get(`/wishlist/${user.userId}`);
          
          if (response.data.success) {
            const fetchedWishlist = response.data.data?.wishlist || response.data.wishlist || [];
            const productIds = fetchedWishlist.map(item => item.p_id);
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

  // Toggle wishlist item (Add/Remove)
  const handleWishlistToggle = async (p_id) => {
    if (!isAuthenticated || !user?.userId) {
      window.location.href = '/login';
      return { success: false, message: "Not logged in" };
    }

    try {
      const payload = { userId: user.userId, p_id };
      const response = await api.post('/wishlist/toggle', payload);

      if (response.data.success) {
        const isWishlisted = response.data.data?.isWishlisted ?? response.data.isWishlisted;

        // Update local state based on backend response
        if (isWishlisted) {
          setWishlistItems(prev => [...prev, p_id]);
        } else {
          setWishlistItems(prev => prev.filter(id => id !== p_id));
        }
        
        return { success: true, isWishlisted };
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