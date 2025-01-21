"use client"
import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaCheck, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaRegHeart, FaRegStar, FaSearch, FaStar, FaTwitter } from 'react-icons/fa';
import Breadcrumb from '@/components/BreadCrumb';
import { products, colors, brandFilters, discountOffers, ratingFilters, categories, priceRanges} from "@/app/Data/shop"
import { useCart } from '@/app/context/CartContext';
import { useFavourite } from '@/app/context/FavouriteContext';
import { FiShoppingCart } from 'react-icons/fi';
import { LiaSearchPlusSolid } from 'react-icons/lia';
import Loading from '@/components/Loading';

interface ShopPageProps {
  params: {
    id: string;
  };
}

const relatedProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/rp1.png",
    rating: 4.5,
    originalPrice: 59.99,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/rp2.png",
    rating: 4.7,
    originalPrice: 149.99,
  },
  {
    id: 3,
    name: "Portable Speaker",
    image: "/rp3.png",
    rating: 4.3,
    originalPrice: 49.99,
  },
  {
    id: 4,
    name: "Gaming Mouse",
    image: "/rp4.png",
    rating: 4.8,
    originalPrice: 35.99,
  },
];

const ProductDetailPage = ({ params }: ShopPageProps) => {
  const [product, setProduct] = useState<any>(null);
  const { cart, addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");
    const { favourites, addToFavourites, removeFromFavourites } = useFavourite();
    const [stockMessage, setStockMessage] = useState(""); 

  useEffect(() => {
    const productId = parseInt(params.id, 10);
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      notFound(); // Redirects to 404 page
    }
  }, [params.id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = () => {
    if (!product) return;

    // Check if the stock is available
    if (product.stock >= quantity) {
      addToCart({
        _id: product.id,
        imageUrl: product.image,
        name: product.name,
        description: product.description,
        price: product.discountedPrice,
        quantity,
      });
      setSuccessMessage("Product added to cart successfully!");
      product.stock -= quantity;  // Reduce stock
      setTimeout(() => setSuccessMessage(""), 2000);
      setStockMessage("");  // Clear stock message
    } else {
      setStockMessage("Stock not available!");
    }
  };

  const isFavorite = product ? favourites.some((fav) => fav._id === product.id) : false;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavourites(product.id!);
    } else {
      addToFavourites(product);
    }
  };

  if (!product) {
    return (
      <Loading />
    );
  }

  return (
    <div className="">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row px-6 sm:px-12 gap-2 max-w-7xl mx-auto ">
              {/* Left Sidebar */}
              <div className="w-full sm:w-1/4 bg-white p-4 space-y-4 ">
                {/* Brand Filter */}
                <div className="p-4 rounded-md">
                  <h3 className="text-xl font-bold text-[#151875] inline-block border-b-2 border-[#151875] pb-1 mb-4">
                    Product Brand
                  </h3>
                  <ul>
                    {brandFilters.map((brand, index) => (
                      <li key={index} className="flex items-center py-2 text-gray-400 text-sm">
                        <FaCheck className={`p-1 mr-2 ${index === 2 ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'}`} />
                        {brand}
                      </li>
                    ))}
                  </ul>
                </div>
      
                {/* Discount Offer */}
                <div className="p-4 rounded-md">
                  <h3 className="text-xl font-bold text-[#151875] inline-block border-b-2 border-[#151875] pb-1 mb-4">Discount Offer</h3>
                  <ul>
                    {discountOffers.map((offer, index) => (
                      <li key={index} className="flex items-center py-2 text-gray-400 text-sm">
                        <FaCheck className="bg-pink-100 text-pink-700 p-1 mr-2" />
                        {offer}
                      </li>
                    ))}
                  </ul>
                </div>
      
                {/* Rating Filter */}
                <div className="p-4 rounded-md">
                  <h3 className="text-xl font-bold text-[#151875] inline-block border-b-2 border-[#151875] pb-1 mb-4">Rating Item</h3>
                  <ul>
                    {ratingFilters.map((item, index) => (
                      <li key={index} className="flex items-center py-2 text-gray-800 text-sm font-semibold">
                        <FaCheck className={`p-1 mr-2 ${index === 2 ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-500'}`} />
                        {[...Array(5)].map((_, starIndex) => (
                          <span key={starIndex}>
                            {starIndex < item.rating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
                          </span>
                        ))}
                        <span className="ml-2">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
      
                {/* Category Filter */}
                <div className="p-4 rounded-md">
                  <h3 className="text-xl font-bold text-[#151875] inline-block border-b-2 border-[#151875] pb-1 mb-4">Categories</h3>
                  <ul>
                    {categories.map((category, index) => (
                      <li key={index} className="flex items-center py-2 text-gray-400 text-sm">
                        <FaCheck className={`p-1 mr-2 ${index === 2 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-500'}`} />
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Price Filter */}
              <div className="p-4 rounded-md">
                <h3 className="text-xl font-bold text-[#151875] inline-block border-b-2 border-[#151875] pb-1 mb-4">Price Filter</h3>
                <ul>
                  {priceRanges.map((range, index) => (
                    <li key={index} className="flex items-center py-2 text-gray-400 text-sm">
                      <FaCheck
                        className={`p-1 mr-2 ${index === 2 ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-500'}`}
                      />
                      {range}
                    </li>
                  ))}
                </ul>
              </div>
      
             {/* Search Bar with Icon */}
      <div className="mt-2 px-2 relative text-sm">
        <input
          type="text"
          placeholder="$10.00 - 20000$"
          className="w-full p-2 border border-gray-300 rounded-md pl-4 pr-10" // Add padding for the icon space
        />
        <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      
      
              {/* Filter by Color */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#151875] inline-block border-b-2 border-[#151875] pb-1 mb-4">
          Filter by Color
        </h3>
        <ul className="grid grid-cols-2 gap-2"> {/* Create a grid with 3 columns */}
          {colors.map((color, index) => (
            <li key={index} className="flex items-center text-gray-400 text-sm">
              <span className={`w-3 h-3 ${color.color} rounded-full mr-1`}></span> {color.name}
            </li>
          ))}
        </ul>
      </div>
      
            </div>

            <div>
            <div className="max-w-7xl mx-auto px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg mb-10">
                    {/* Product Image */}
                    <div className="flex justify-center items-center h-full bg-gray-100 rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="rounded-lg h-full"
                      />
                    </div>
            
                    {/* Product Details */}
                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold text-[#111C85]">{product.name}</h1>
                      <div className="flex items-center mr-12">
                        {[...Array(5)].map((_, index) => (
                          <span key={index}>
                            {index < (product.rating || 0) ? (
                              <FaStar className="text-yellow-500" />  // Filled star
                            ) : (
                              <FaRegStar className="text-yellow-500" />  // Unfilled star
                            )}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-xl text-[#111C85] font-bold">${product.discountedPrice}</p>
                        <p className="text-sm line-through text-pink-500">${product.originalPrice}</p>
                      </div>
            
                      {/* Description  */}
                      <p className="text-gray-400">{product.description}</p>
                      
                       {/* Stock Display */}
            <div className="flex items-center gap-2">
  <span className="text-md font-bold text-[#111C85]">Available Stock:</span>
  <span
    className={`text-lg font-bold ${
      product.stock === 0 ? "text-red-600" : "text-green-600"
    }`}
  >
    {product.stock} {product.stock === 0 && "(Out of Stock)"}
  </span>
</div>
         

                        {/* Quantity  */}
                      <div className="flex items-center gap-4">
                        <span className="text-md font-bold text-[#111C85]">Quantity:</span>
                        <button
                          onClick={handleDecrement}
                          className="text-red-600 text-4xl font-extrabold rounded hover:text-red-700 transition"
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button
                          onClick={handleIncrement}
                          className="text-green-600 text-3xl font-extrabold rounded hover:text-green-700 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* cart  */}
                      <div className="flex gap-8">
                        <button
                                      onClick={handleAddToCart}
                                      aria-label="Add to Cart"
                                      className= {`bg-white text-yellow-500 rounded-full shadow-md p-2 transform transition-transform duration-300 hover:scale-110 ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                      disabled={product.stock === 0}
                                    >
                                      <FiShoppingCart size={25} className='text-xl' />
                                    </button>
                        <button onClick={handleFavoriteToggle} aria-label="Add to Wishlist"
              className=" bg-white text-pink-700 rounded-full shadow-md p-2 transform transition-transform duration-300 hover:scale-110">
                          {isFavorite ? <FaHeart size={25} className="text-pink-600" /> : <FaRegHeart size={25}/>}
                        </button>
                        <button
                                      aria-label="Search Product"
                                      className=" bg-white text-lime-600 rounded-full shadow-md p-2 transform transition-transform duration-300 hover:scale-110"
                                    >
                                      <LiaSearchPlusSolid size={25} />
                                    </button>
                      </div>
                      {successMessage && (
                        <p className="text-blue-600 font-semibold">{successMessage}</p>
                      )}
                      {stockMessage && (
              <p className="text-red-500 font-semibold">{stockMessage}</p>
            )}
                    </div>
                  </div>
                  
    </div>
    {/* Related Products  */}
    <div className="bg-white p-6 rounded-lg shadow-lg mx-8 md:px-12 py-8">
            <h2 className="text-3xl font-bold mb-6 text-[#111C85]">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#111C85]">{item.name}</h3>
                  <div className='flex gap-4 mt-1'>
                  <p className="text-gray-600">${item.originalPrice.toFixed(2)}</p>
                  <p className="text-sm line-through text-green-600 ">${(item.originalPrice * 1.5).toFixed(2)}</p>
                  </div>
                  <p className="text-yellow-500 font-bold">{item.rating} ★</p>
                </div>
              ))}
            </div>
          
          </div>
           <div className="flex justify-center mt-14 bg-white mb-14 px-4">
                  <Image
                    src="/newsletter.png" // Replace with your image path
                    alt="News Letter"
                    width={800}
                    height={600}
                    className=""
                  />
                </div>
            </div>
          
    </div>
    
   </div>
  );
};

export default ProductDetailPage;
