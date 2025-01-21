import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: "Cantilever chair", code: "Y523201", price: "$42.00", image: "/chair1.png" },
    { id: 2, name: "Cantilever chair", code: "Y523201", price: "$42.00", image: "/chair2.png" },
    { id: 3, name: "Cantilever chair", code: "Y523201", price: "$42.00", image: "/chair3.png" },
    { id: 4, name: "Cantilever chair", code: "Y523201", price: "$42.00", image: "/chair4.png" },
  ];

  return (
    <div className="py-8 bg-white max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform group-hover:scale-105 h-[400px]" // Increased height for card
          >
            {/* Hover Icons */}
            <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <div className="w-8 h-8 bg-white text-purple-900 rounded-full flex justify-center items-center shadow">
                <FiShoppingCart />
              </div>
              <div className="w-8 h-8 bg-white text-red-600 rounded-full flex justify-center items-center shadow">
                <FaRegHeart />
              </div>
              <div className="w-8 h-8 bg-white text-blue-400 rounded-full flex justify-center items-center shadow">
                <AiOutlineSearch />
              </div>
            </div>

            {/* Image Section */}
            <div className="flex flex-col bg-gray-100 group-hover:bg-white transition duration-300 justify-center items-center h-64 w-full"> {/* Adjusted image section height */}
              <Image
                src={product.image}
                alt={product.name}
                layout="intrinsic"
                objectFit="cover"
                width={150}
                height={150}
                className="object-contain h-full mt-6"
              />
              {/* View Details Button */}
              <div className="opacity-0 group-hover:opacity-100 transition duration-300 z-20 mb-4">
                <button className="text-white font-medium bg-green-500 px-6 py-2 hover:bg-green-600">
                  View Details
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-white group-hover:bg-[#3f2ade] p-4 text-center relative z-10 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white mt-2">{product.name}</h3>
              <div className="flex justify-center items-center mt-2">
                <div className="w-6 h-[4px] bg-blue-500 mr-2 rounded-lg"></div>
                <div className="w-6 h-[4px] bg-pink-500 mr-2 rounded-lg"></div>
                <div className="w-6 h-[4px] bg-green-500 rounded-lg"></div>
              </div>
              <p className="text-sm text-gray-600 group-hover:text-white mt-2">Code - {product.code}</p>
              <p className="text-lg font-bold text-gray-900 group-hover:text-white">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
                <div className="w-6 h-[4px] bg-pink-500 mr-2 rounded-lg"></div>
                <div className="w-4 h-[4px] bg-pink-300 mr-2 rounded-lg"></div>
                <div className="w-4 h-[4px] bg-pink-300 mr-2 rounded-lg"></div>
                <div className="w-4 h-[4px] bg-pink-300 rounded-lg"></div>
              </div>
    </div>
  );
};

export default FeaturedProducts;