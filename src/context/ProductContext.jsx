import { createContext, useState } from "react";

export const ProductContext = createContext();

const initialProducts = [
  {
    id: "PRD-005",
    name: "Minimalist Desk Lamp",
    description: "Adjustable LED desk lamp with touch-sensitive dimming and wireless charging base.",
    price: 79.0,
    status: "stock",
    feature: "Wireless Charging",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400",
    colorTheme: "Matte Black",
    material: "Aluminum",
    tags: "home-office, lighting, tech",
    category: "Furniture",
    stock: 25,
  },
  {
    id: "PRD-006",
    name: "Ceramic Coffee Set",
    description: "Hand-thrown stoneware set including two mugs and a matching pour-over dripper.",
    price: 55.0,
    status: "stock",
    feature: "Handmade",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
    colorTheme: "Sandstone",
    material: "Ceramic",
    tags: "kitchen, lifestyle, gift",
    category: "Kitchenware",
    stock: 15,
  },
  {
    id: "PRD-007",
    name: "Leather Journal",
    description: "Refillable A5 journal with premium cream paper and a magnetic clasp.",
    price: 35.0,
    status: "out_of_stock",
    feature: "Refillable",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400",
    colorTheme: "Cognac",
    material: "Top-grain Leather",
    tags: "stationery, office, creative",
    category: "Accessories",
    stock: 0,
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};