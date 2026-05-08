import { createContext, useEffect, useState } from "react";
import { getAllCategories, getAllProduct } from "../api/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();

  const fetchProductsData = async () => {
    try {
      const response = await getAllProduct();
      setProducts(response.data);  
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  } 

  const fetchCategoriesData = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchProductsData();
    fetchCategoriesData();
  }, []);
  
  return (
    <ProductContext.Provider value={{ products, categories, fetchProductsData }}>
      {children}
    </ProductContext.Provider>
  );
};