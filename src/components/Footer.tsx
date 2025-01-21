import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto border-t-2 border-purple-500">
        <footer className="bg-[#EEEFFB] py-12 ">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Logo & Contact Info */}
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-[#151875] mb-6">Hekto</h1>
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-md bg-white shadow focus:outline-none"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-r-md">
                Sign Up
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-1">Contact Info</p>
            <p className="text-sm text-gray-500">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </p>
          </div>

          {/* Categories */}
          <div className="ml-5 col-span-2">
            <h3 className="text-lg font-semibold text-[#151875] mb-6">Categories</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Laptops & Computers</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Cameras & Photography</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Smart Phones & Tablets</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Video Games & Consoles</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Waterproof Headphones</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold text-[#151875] mb-6">Customer Care</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">My Account</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Discount</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Returns</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Orders History</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Order Tracking</li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold text-[#151875] mb-6">Pages</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Blog</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Browse the Shop</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Category</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Pre-Built Pages</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">Visual Composer Elements</li>
              <li className="text-gray-600 hover:text-pink-500 cursor-pointer">WooCommerce Pages</li>
            </ul>
          </div>
        </div>

        
      </div>
    </footer>
    {/* Footer Bottom */}
<div className="bg-[#E7E4F8] px-20 border-t-2 border-purple-500 pt-4 h-auto flex flex-col md:flex-row justify-between items-center py-4">
  <p className="text-sm text-gray-500">© Webecy - All Rights Reserved</p>
  <div className="flex space-x-6 mt-4 md:mt-0">
    <Link href="#" className="text-gray-600 hover:text-pink-500">
      <FaFacebookF size={20} />
    </Link>
    <Link href="#" className="text-gray-600 hover:text-pink-500">
      <FaInstagram size={20} />
    </Link>
    <Link href="#" className="text-gray-600 hover:text-pink-500">
      <FaTwitter size={20} />
    </Link>
  </div>
</div>

    </div>
  );
};

export default Footer;
