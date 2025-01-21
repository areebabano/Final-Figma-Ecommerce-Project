"use client";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the React Icon
import Breadcrumb from "./BreadCrumb";
import Link from "next/link";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Custom CSS for the animations
const fadeInAnimation = `
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

const iconBounceAnimation = `
@keyframes iconBounce {
  0% {
    transform: scale(0) translateY(0);
  }
  50% {
    transform: scale(1.2) translateY(-15px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}
`;

const OrderCompletedPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger fade-in animation for page content when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true); // Set content to fully visible after a delay
    }, 300); // Adjust the delay time as needed
    
    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  return (
    <div>
      {/* Breadcrumb Component */}
      <Breadcrumb />

      {/* Order Completed Content */}
      <div
        className={`text-center py-8 bg-white ${isLoaded ? "animate-fadeIn" : "opacity-0"}`}
        style={{ animation: "fadeIn 2s forwards" }} // Fade-in animation for the page
      >
        <style>{fadeInAnimation}</style>
        <style>{iconBounceAnimation}</style>
        
        <div className="flex justify-center items-center mb-6">
          {/* Icon with custom bounce and scale animation */}
          <div
            className="bg-pink-100 rounded-full p-4"
            style={{ animation: "iconBounce 1s ease-out forwards" }} // Bounce + scale animation for the icon
          >
            <IoMdCheckmarkCircleOutline className="w-12 h-12 text-pink-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Your Order Is Completed!</h1>
        <p className="text-gray-500 mb-6 px-20">
          Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will receive an email confirmation when your order is completed.
        </p>
        <button className="bg-pink-500 text-white py-2 px-6 font-semibold hover:bg-purple-600">
          <Link href="/products">
          Continue Shopping
          </Link>
        </button>
      </div>
    </div>
  );
};

export default OrderCompletedPage;


// "use client";
// import React from "react";
// import Breadcrumb from "./BreadCrumb";

// const OrderCompletedPage = () => (
//   <div>
//     {/* Breadcrumb Component */}
//     <Breadcrumb/>

//     {/* Order Completed Content */}
//     <div className="text-center py-16 bg-white">
//       <div className="flex justify-center items-center mb-6">
//         <div className="bg-pink-100 rounded-full p-4">
//           <svg
//             className="w-12 h-12 text-pink-500"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//           >
//             <path d="M10 15l-3.5-3.5 1.41-1.41L10 12.17l5.09-5.09 1.41 1.41z" />
//           </svg>
//         </div>
//       </div>
//       <h1 className="text-2xl font-bold mb-4">Your Order Is Completed!</h1>
//       <p className="text-gray-600 mb-6">
//         Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will receive an email confirmation when your order is completed.
//       </p>
//       <button className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600">
//         Continue Shopping
//       </button>
//     </div>
//   </div>
// );

// export default OrderCompletedPage;
