// app/search-result/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useCart } from "../context/CartContext";
import { useFavourite } from "../context/FavouriteContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isFeaturedProduct: boolean;
  discountPercentage: number;
  stockLevel: number;
  category: string;
}

const SearchResultContent = () => {
  const [product, setProduct] = useState<any>(null);
  // const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
    const { favourites, addToFavourites, removeFromFavourites } = useFavourite();
      const [stockMessage, setStockMessage] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Get the ID from the URL
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (!productId) {
          setError("No product ID provided");
          return;
        }

        // Fetch the product data
        const query = `*[_type == "productData" && _id == $productId][0]{
          _id,
          name,
          description,
          price,
          "imageUrl": image.asset->url,
          isFeaturedProduct,
          discountPercentage,
          stockLevel,
          category
        }`;

        const result = await client.fetch(query, { productId });

        if (!result) {
          setError("Product not found");
          return;
        }

        setProduct(result);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    if (!product) return;

    // Check if the stock is available
    if (product.stockLevel >= quantity) {
      addToCart({
        _id: product._id,
        imageUrl: product.imageUrl,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity,
      });
      setSuccessMessage("Product added to cart successfully!");
      product.stockLevel -= quantity;  // Reduce stock
      setTimeout(() => setSuccessMessage(""), 2000);
      setStockMessage("");  // Clear stock message
    } else {
      setStockMessage("Stock not available!");
    }
  };

  const isFavorite = product ? favourites.some((fav) => fav._id === product._id) : false;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavourites(product._id!);
    } else {
      addToFavourites(product);
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-red-600 mb-4">{error}</h2>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // if (!product) return <Loading />;

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-lg p-6">
        <div className="md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <p className="text-[#111C85] font-bold text-md">Category: 
              <span className="text-gray-600 font-semibold ml-3">
              {product.category}
              </span>
            </p>
            <p className="text-[#111C85] font-bold text-md">
              Price:
              <span className="text-md font-semibold text-gray-700 ml-3">${product.price}</span>
              
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-[#111C85] font-bold text-md">
                Discount:
                <span className="text-green-600 font-semibold ml-3">
                {product.discountPercentage}% off
                </span>
                 
              </p>
            )}
            {/* <p className={`font-semibold ${product.stockLevel > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stockLevel > 0 ? `In Stock (${product.stockLevel} available)` : 'Out of Stock'}
            </p> */}
            {/* Stock Display */}
            <div className="flex items-center gap-2">
  <span className="text-md font-bold text-[#111C85]">Available Stock:</span>
  <span
    className={`text-lg font-bold ${
      product.stockLevel === 0 ? "text-red-600" : "text-green-600"
    }`}
  >
    {product.stockLevel} {product.stockLevel === 0 && "(Out of Stock)"}
  </span>
</div>
          </div>
          {/* <button
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-200"
            disabled={product.stockLevel === 0}
          >
            Add to Cart
          </button> */}
          {/* Add to Cart */}
          <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`bg-pink-500 hover:bg-purple-700 text-white px-6 py-2 transition ${product.stockLevel === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={product.stockLevel === 0} // Disable if out of stock
              >
                Add to Cart
              </button>
              <button onClick={handleFavoriteToggle} className="text-3xl">
                {isFavorite ? <FaHeart className="text-red-600" /> : <FaRegHeart className=""/>}
              </button>
            </div>

            {/* Notifications */}
            {successMessage && (
                        <p className="text-blue-600 font-semibold">{successMessage}</p>
                      )}
                      {stockMessage && (
              <p className="text-red-500 font-semibold">{stockMessage}</p>
            )}
        </div>
      </div>
    </div>
  );
};

// The main page component
export default function Page() {
  return (
    <Suspense fallback={
      <Loading />
    }>
      <SearchResultContent />
    </Suspense>
  );
}