import Image from "next/image";
import Link from "next/link";

const ProductDetail = () => {
  return (
    <div className="max-w-7xl mx-auto bg-[#F1F0FF] p-8 shadow-lg rounded-lg w-full">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/sofa.png" // Replace with your sofa image path
            alt="Product Image"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full md:w-1/2">
        <h1 className="text-3xl text-[#151875] mb-4 leading-tight tracking-wide"
        style={{
            fontFamily: "Josefin Sans, sans-serif",
            fontWeight: "bolder"
          }}
        >
  Unique Features Of Leatest & Trending Products
</h1>
          {/* Paragraphs */}
          <div className="space-y-4">
            <p className="text-sm text-gray-400 flex items-center">
              <span className="w-3 h-3 rounded-full bg-pink-600 inline-block mr-2"></span>
              All frames constructed with hardwood solids and laminates
            </p>
            <p className="text-sm text-gray-400 flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-2"></span>
              Reinforced with double wood dowels, glue, screw - nails corner blocks and machine nails
            </p>
            <p className="text-sm text-gray-400 flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block mr-2"></span>
              Arms, backs and seats are structurally reinforced
            </p>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6 flex items-center gap-4">
            <Link href="/cart">
            <button className="px-6 py-2 font-bold bg-pink-500 text-white shadow-lg hover:bg-purple-700 transition">
              Add to Cart
            </button>
            </Link>

            {/* Product Name and Price */}
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-800 font-medium"><b>B&B</b> Italian Sofa</span>
              <span className="text-sm text-gray-800 font-bold">$32.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
