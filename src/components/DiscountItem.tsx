import Image from "next/image";
import Link from "next/link";

const DiscountItem = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-[#151875] mb-4">Discount Items</h1>

      {/* Product Collection Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center gap-6">
          <span className="flex items-center text-red-500 font-medium underline decoration-red-500">
            Wood Chair
            <span className="w-1.5 h-1.5 mt-2 bg-red-500 rounded-full ml-2"></span>
          </span>
          <span className="text-purple-900 font-medium">Plastic Chair</span>
          <span className="text-purple-900 font-medium">Sofa Collection</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Section - Product Details */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4 lg:px-0 lg:ml-16">
          <h1
            className="text-2xl lg:text-3xl text-[#151875] mb-4 leading-tight tracking-wide"
            style={{
              fontFamily: "Josefin Sans, sans-serif",
              fontWeight: "bolder",
            }}
          >
            20% Discount Of All Products
          </h1>
          <h3 className="text-lg text-pink-600 mb-6">Eams Sofa Compact</h3>
          <p className="text-sm text-gray-400 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.
          </p>

          {/* List of Features */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400 text-left mb-6">
            <li className="flex items-center">
              <span className="mr-2">✔</span>
              Material exposed like metals
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span>
              Simple neutral colours
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span>
              Clear lines and geometric figures
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span>
              Material exposed like metals
            </li>
          </ul>

          {/* Shop Now Button */}
          <div className="mt-6">
            <Link href="/shop">
            <button className="px-6 py-2 font-bold bg-pink-600 text-white shadow-lg hover:bg-purple-700 transition">
              Shop Now
            </button>
            </Link>
          </div>
        </div>

        {/* Right Section - Image with Round Pink Background */}
        <div className="w-full lg:w-1/2 flex justify-center relative px-4 lg:px-0 mt-8 lg:mt-0">
          {/* Background Circle */}
          <div className="absolute bg-pink-100 rounded-full w-[300px] h-[300px] bottom-0 lg:bottom-8 left-1/2 transform -translate-x-1/2 -z-10"></div>

          {/* Product Image */}
          <Image
            src="/discountchair.png" // Replace with the actual image path
            alt="Discount Furniture"
            width={520}
            height={520}
            objectFit="contain"
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountItem;
