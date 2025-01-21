"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { client } from "@/sanity/lib/client"; // Import your Sanity client

// Define the structure of the product based on your Sanity schema
export interface favouriteProduct {
    _id: string;          // Sanity product id
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    stockLevel: number;   // or any other relevant field
    favouritedAt?: Date;
}

export interface favouriteContextType {
    favourites: favouriteProduct[];
    addToFavourites: (product: favouriteProduct) => void;
    removeFromFavourites: (id: string) => void; // Sanity _id is a string
}

const FavouriteContext = createContext<favouriteContextType | undefined>(undefined);

export const useFavourite = () => {
    const context = useContext(FavouriteContext);
    if (!context) {
        throw new Error("useFavourite must be within a FavouriteProvider");
    }
    return context;
};

export const FavouriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favourites, setFavourites] = useState<favouriteProduct[]>([]);

    const addToFavourites = (product: favouriteProduct) => {
        const favouriteProduct = {
            ...product,
            favouritedAt: new Date(), // Add timestamp when favourited
        };

        // Update the state with the new favourite product
        setFavourites((prevFavourites) => [...prevFavourites, favouriteProduct]);
    };

    const removeFromFavourites = (id: string) => {
        // Remove the product with the matching id
        setFavourites((prevFavourites) =>
            prevFavourites.filter((product) => product._id !== id)
        );
    };

    console.log(favourites);

    return (
        <FavouriteContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
            {children}
        </FavouriteContext.Provider>
    );
};
