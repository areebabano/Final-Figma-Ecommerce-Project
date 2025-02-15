"use client";
import { FaRegUser, FaRegHeart, FaRegEnvelope, FaAngleDown } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFavourite } from "@/app/context/FavouriteContext";
import { useCart } from "@/app/context/CartContext";
import { client } from "@/sanity/lib/client"; // Import Sanity client
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { TbMenuDeep } from "react-icons/tb";


interface Product {
  _id: string;         // Sanity uses _id for document ID
  name: string;        // Product name
  description: string;
  price: number;
  imageUrl: string;
  isFeaturedProduct: boolean;
  discountPercentage: number;
  stockLevel: number;
  category: string // Product description (if it exists in your dataset)
  // Add other product fields if necessary
}


const Header = () => {
  const { favourites } = useFavourite();
  const { getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Correctly typed as Product[]
  const [showSuggestions, setShowSuggestions] = useState(false);
  
 
  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == 'productData']{
        _id,
        name,
        "imageUrl": image.asset->url,
        price,
        description,
        discountPercentage,
        isFeaturedProduct,
        stockLevel,
        category
          }`; // Replace with your actual query
      
          try {
            const products: Product[] = await client.fetch(query);
            console.log("Fetched products:", products.map(p => ({ id: p._id, name: p.name })));
            setAllProducts(products); // Store all products
            setFilteredProducts(products); // Initially set filtered products to all products
          } catch (error) {
            console.error("Failed to fetch products:", error);
          }
        };

    fetchProducts();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length === 0) {
      setShowSuggestions(false);
      setFilteredProducts(allProducts); 
    } else {
      setShowSuggestions(true);
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  };

  // const handleSuggestionClick = (productName: string) => {
  //   setQuery(productName);
  //   setShowSuggestions(false); // Hide suggestions when a suggestion is selected
  // };

  const router = useRouter();

  const handleSuggestionClick = (productId: string) => {
    // setQuery("");
    setShowSuggestions(false);
    router.push(`/search-result?id=${productId}`);
  };
  

  return (
    <header className="bg-purple-600 text-white w-full fixed top-0 left-0  z-50">
      {/* Top Section */}
      <div className="bg-purple-700 sm:px-2 max-w-7xl mx-auto">
        <div className="mx-4 py-2 sm:px-14 sm:py-2 flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaRegEnvelope />
              <span className="text-xs sm:text-sm hover:font-semibold">mhhasanu@gmail.com</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <MdOutlinePhoneInTalk />
              <span className="text-sm hover:font-semibold">(12345)67890</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select className="hidden md:block bg-transparent px-2 py-1 rounded text-sm hover:font-semibold">
              <option className="text-gray-500">English</option>
              <option className="text-gray-500">Urdu</option>
            </select>

            {/* Currency Selector */}
            <select className="hidden md:block bg-transparent px-2 py-1 rounded text-sm hover:font-semibold">
              <option className="text-gray-500">USD</option>
              <option className="text-gray-500">PKR</option>
            </select>

            {/* Login */}
            <Link
              href="/account"
              className="flex items-center gap-1 text-sm"
            >
              <FaRegUser  size={20} className="hover:font-semibold" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative sm:flex items-center gap-1 text-sm hover:font-semibold"
            >
              {/* Wishlist */}
              <FaRegHeart size={20} className="hover:font-semibold" />
              <span className="absolute top-[-6px] right-[-6px] bg-red-600 rounded-full w-[14px] h-[14px] text-[10px] text-white flex items-center justify-center">
                {favourites.length}
              </span>
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative flex items-center hover:font-semibold">
              <FiShoppingCart size={20} className="hover:font-semibold" />
              <span className="absolute top-[-6px] right-[-6px] bg-red-600 rounded-full w-[14px] h-[14px] text-[10px] text-white flex items-center justify-center">
                {getCartItemCount()}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-20 sm:py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold text-blue-900">Hekto</div>

          {/* Search Bar Section */}
          <div className="relative flex items-center gap-4">
          <SearchBar query={query} handleSearch={handleSearch}/>

            {/* Display Suggestions */}
            {/* Display Suggestions */}
{showSuggestions && query && (
  <div className="absolute top-full left-0 right-0 bg-white shadow-lg mt-1 max-h-60 overflow-y-auto z-10 rounded-md">
    <ul>
      {filteredProducts.map((product) => (
        <li
          key={product._id}
          className="p-2 bg-white text-black hover:bg-gray-100 hover:text-pink-500 cursor-pointer"
        >
          <Link
  href={`/search-result?id=${product._id}`}
  className="flex items-center gap-4 w-full text-black hover:text-pink-500"
  onClick={() => handleSuggestionClick(product._id)}
>
  <img
    src={product.imageUrl}
    alt={product.name}
    className="w-14 h-14 object-cover rounded-md"
  />
  <span className="text-xs">{product.name}</span>
</Link>

        </li>
      ))}
      {filteredProducts.length === 0 && (
        <li className="p-2 text-red-500">No products found</li>
      )}
    </ul>
  </div>
)}

{/* Navigation Links */}
<nav className="hidden sm:flex space-x-4 text-sm">
            <Link
              href="/"
              className="text-red-500 font-medium hover:text-pink-500 transition duration-200"
            >
              Home
              <FaAngleDown className="inline-flex ml-2 text-red-500" />
            </Link>
            <Link
              href="/about-us"
              className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
            >
              About
            </Link>
            <Link
              href="/products"
              className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
            >
              Products
            </Link>
            <Link
              href="/blog"
              className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
            >
              Blog
            </Link>
            <Link
              href="/shop"
              className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
            >
              Shop
            </Link>
            <Link
              href="/contact-us"
              className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
            >
              Contact
            </Link>
            <Link
              href="/FAQ"
              className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
            >
              FAQ & Help Center
            </Link>
            
          </nav>
          </div>
          {/* Hamburger Menu Icon (Mobile) */}
          <div className="sm:hidden flex items-center ml-4">
            <button onClick={toggleMenu}>
              <TbMenuDeep size={30} className="text-blue-900 hover:text-pink-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar Navigation */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 overflow-y-auto`}
      >
        <div className="absolute top-0 right-0 p-4">
          <button onClick={closeMenu} className="text-xl font-bold text-blue-900">
            &times;
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            href="/"
            className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
          >
            About
          </Link>
          <Link
            href="/products"
            className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
          >
            Products
          </Link>
          <Link
            href="/blog"
            className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
          >
            Blog
          </Link>
          <Link
            href="/shop"
            className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
          >
            Shop
          </Link>
          <Link
            href="/contact-us"
            className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
          >
            Contact
          </Link>
          <Link
              href="/FAQ"
              className="text-blue-900 font-medium hover:text-pink-500 transition duration-200"
            >
              FAQ & Help Center
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;



