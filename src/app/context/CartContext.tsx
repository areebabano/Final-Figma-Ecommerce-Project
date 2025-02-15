"use client";

import React, { useState, createContext, useContext, ReactNode, useEffect } from "react";

export interface CartItem {
  _id?: string;
  name: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
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

// Helper function to get cart from local storage
export const getCartItems = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage when component mounts
  useEffect(() => {
    const savedCart = getCartItems();
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);
      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: (i.quantity || 0) + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // const removeFromCart = (id: string) => {
  //   setCart((prev) => prev.filter((item) => item._id !== id));
  // };
  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item._id !== id);
  
      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };
  

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getCartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};


// "use client";

// import React, { useState, createContext, useContext, ReactNode, useEffect } from "react";
// import { Product } from "../Data/product";
// // import { client } from "@/sanity/lib/client"; // Sanity client to interact with backend

// // Assuming your product from Sanity has a similar structure
// export interface CartItem {
//   _id?: string;  // Sanity product id (string)
//   name: string;
//   imageUrl?: string;
//   description?: string;
//   price?: number;
//   quantity?: number;
// }

// export interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;  // Sanity _id is a string
//   getCartItemCount: () => number;
//   updateQuantity: (id: string, quantity: number) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be within a CartProvider.");
//   }
//   return context;
// };

// // Helper function to get cart from local storage
// export const getCartItems = (): CartItem[]=> {
//   return JSON.parse(localStorage.getItem("cart") || "[]");
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Load cart from local storage when component mounts
//   useEffect(() => {
//     const savedCart = getCartItems();
//     setCart(savedCart);
//   }, []);

//   // Save cart to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (item: CartItem) => {
//     setCart((prev) => {
//       const existingItemIndex = prev.findIndex((i) => i._id === item._id);
//       if (existingItemIndex !== -1) {
//         const updatedCart = [...prev];
//         updatedCart[existingItemIndex].quantity! += item.quantity!;
//         return updatedCart;
//       } else {
//         return [...prev, { ...item }]; // Ensure all item properties are spread correctly
//       }
//     });
//   };
  

//   const removeFromCart = (id: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== id));
//   };

//   // const updateQuantity = (id: string, quantity: number) => {
//   //   setCart((prevCart) =>
//   //     prevCart.map((item) =>
//   //       item._id === id ? { ...item, quantity } : item
//   //     )
//   //   );
//   // };

//   const updateQuantity = (id: string, quantity: number) => {
//     console.log("Updating quantity for ID:", id, "New Quantity:", quantity);
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === id ? { ...item, quantity } : item
//       )
//     );
//   };
  

//   const getCartItemCount = () => {
//     return cart.reduce((total, item) => total + item.quantity!, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         getCartItemCount,
//         removeFromCart,
//         updateQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
