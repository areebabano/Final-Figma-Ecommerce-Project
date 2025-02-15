"use client"
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/BreadCrumb";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { client } from "@/sanity/lib/client"; // assuming you have sanity client configured
import {Pagination} from "@/components/Pagination"; // Assuming you have Pagination component
import FilterAndSorting from "@/components/FilterAndSorting";

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const query = `*[_type == 'productData']{
                _id,
                name,
                "imageUrl": image.asset->url,
                price,
            }`;
            const allData = await client.fetch(query);
            setProducts(allData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);


  const handleLoadMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 8); // Increase by 8 each time
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Section Header */}
      <FilterAndSorting/>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 px-16">
        {products.slice(0, visibleProductsCount).map((product: any) => (
          <div
            key={product._id}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform group-hover:scale-105"
          >
            {/* Icons */}
            <div className="absolute bottom-36 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <Link href={"/cart"}>
                <div className="w-8 h-8 bg-white text-purple-900 rounded-full flex justify-center items-center shadow-md hover:bg-purple-100 transition">
                  <FiShoppingCart />
                </div>
              </Link>
              <Link href={"/wishlist"}>
                <div className="w-8 h-8 bg-white text-red-600 rounded-full flex justify-center items-center shadow-md hover:bg-red-100 transition">
                  <FaRegHeart />
                </div>
              </Link>
              <div className="w-8 h-8 bg-white text-blue-400 rounded-full flex justify-center items-center shadow-md hover:bg-blue-100 transition">
                <AiOutlineSearch />
              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center items-center bg-gray-100 group-hover:bg-green-50 transition duration-300 h-44 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={120}
                height={120}
                objectFit="contain"
                className="object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <div className="flex flex-col justify-between items-center mb-1">
                <h3 className="text-md font-semibold">{product.name}</h3>
                <div className="flex gap-4 mt-2">
                  <p className="text-gray-400 line-through">${product.price}</p>
                  <p className="text-pink-500 font-bold">${product.price}</p>
                </div>
                <Link href={`/products/${product._id}`} className="bg-white text-gray-400">
                  <FaEye className="inline-flex" size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleProductsCount < products.length && (
        <div className="flex justify-center mt-6 mb-8">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-pink-500 text-white hover:bg-purple-600 transition" >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

