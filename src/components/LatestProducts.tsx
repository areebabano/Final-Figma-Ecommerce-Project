import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const LatestProducts = () => {
  const products = [
    { id: 1, name: "Comfort Handy Craft", price: "$42.00", discountPrice: "$35.00", image: "/lp1.png" },
    { id: 2, name: "Comfort Handy Craft", price: "$42.00", discountPrice: "$35.00", image: "/lp2.png" },
    { id: 3, name: "Comfort Handy Craft", price: "$42.00", discountPrice: "$35.00", image: "/lp3.png" },
    { id: 4, name: "Comfort Handy Craft", price: "$42.00", discountPrice: "$35.00", image: "/lp4.png" },
    { id: 5, name: "Comfort Handy Craft", price: "$42.00", discountPrice: "$35.00", image: "/lp5.png" },
    { id: 6, name: "Comfort Handy Craft", price: "$42.00", discountPrice: "$35.00", image: "/lp6.png" },
  ];

  return (
    <div className="py-8 bg-white max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-purple-900 mb-4">Latest Products</h1>
      <div className="text-center mb-8">
        <div className="flex justify-center gap-4 flex-wrap">
          <span className="text-red-500 font-medium underline decoration-red-500">New Arrival</span>
          <span className="text-purple-900 font-medium">Best Seller</span>
          <span className="text-purple-900 font-medium">Featured</span>
          <span className="text-purple-900 font-medium">Special Offer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform group-hover:scale-105"
          >
            {/* Sale Tag */}
            <div className="absolute top-2 left-2 bg-blue-800 text-white px-3 py-1 text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition duration-300">
              Sale
            </div>

            {/* Icons */}
            <div className="absolute bottom-12 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <div className="w-8 h-8 bg-white text-purple-900 rounded-full flex justify-center items-center shadow-md hover:bg-purple-100 transition">
                <FiShoppingCart />
              </div>
              <div className="w-8 h-8 bg-white text-red-600 rounded-full flex justify-center items-center shadow-md hover:bg-red-100 transition">
                <FaRegHeart />
              </div>
              <div className="w-8 h-8 bg-white text-blue-400 rounded-full flex justify-center items-center shadow-md hover:bg-blue-100 transition">
                <AiOutlineSearch />
              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center items-center bg-gray-100 group-hover:bg-white transition duration-300 h-44 w-full">
              <Image
                src={product.image}
                alt={product.name}
                width={160}
                height={160}
                objectFit="contain"
                className="object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-semibold text-blue-900 truncate">{product.name}</h3>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold text-blue-900">{product.price}</p>
                  <p className="text-xs line-through text-red-500">{product.discountPrice}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
