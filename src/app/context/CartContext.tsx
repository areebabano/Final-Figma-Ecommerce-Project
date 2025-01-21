"use client";

import React, { useState, createContext, useContext, ReactNode } from "react";
// import { client } from "@/sanity/lib/client"; // Sanity client to interact with backend

// Assuming your product from Sanity has a similar structure
export interface CartItem {
  _id: string;  // Sanity product id (string)
  name: string;
  imageUrl: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;  // Sanity _id is a string
  getCartItemCount: () => number;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be within a CartProvider.");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // const addToCart = (item: CartItem) => {
  //   setCart((prev) => {
  //     const existingItemIndex = prev.findIndex((i) => i._id === item._id);
  //     if (existingItemIndex !== -1) {
  //       const updatedCart = [...prev];
  //       updatedCart[existingItemIndex].quantity += item.quantity;
  //       return updatedCart;
  //     } else {
  //       return [...prev, item];
  //     }
  //   });
  // };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((i) => i._id === item._id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prev, { ...item }]; // Ensure all item properties are spread correctly
      }
    });
  };
  

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // const updateQuantity = (id: string, quantity: number) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item._id === id ? { ...item, quantity } : item
  //     )
  //   );
  // };

  const updateQuantity = (id: string, quantity: number) => {
    console.log("Updating quantity for ID:", id, "New Quantity:", quantity);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };
  

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getCartItemCount,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
