"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import Breadcrumb from "@/components/BreadCrumb";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [editQuantities, setEditQuantities] = useState<{ [id: string]: number }>({});
  const [shippingMethod, setShippingMethod] = useState<string>("Standard");
  const [shippingCost, setShippingCost] = useState<number>(5); // Default shipping cost for Standard
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const handleIncrement = (id: string) => {
    setEditQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
    updateQuantity(id, (editQuantities[id] || 1) + 1);
  };

  const handleDecrement = (id: string) => {
    if (editQuantities[id] > 1) {
      setEditQuantities((prev) => ({
        ...prev,
        [id]: (prev[id] || 1) - 1,
      }));
      updateQuantity(id, (editQuantities[id] || 1) - 1);
    }
  };

  // const totalCost = cart.reduce((total, item) => {
  //   const price = item.price || 0;
  //   const quantity = editQuantities[item._id] || item.quantity || 0;
  //   return total + price * quantity;
  // }, 0);

  const totalCost = cart.reduce((total, item) => {
    const price = item.price || 0;
    const quantity = editQuantities[item._id] || item.quantity || 1;
    return total + price * quantity;
  }, 0);
  
  console.log("Total Cost:", totalCost); // Debug the calculation
  
  

  const handleShippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShippingMethod(event.target.value);
    setShippingCost(event.target.value === "Express" ? 20 : 5); // Set cost based on method
  };

  const handlePromoCodeApply = () => {
    if (promoCode === "SAVE10") {
      setDiscount(totalCost * 0.1); // 10% discount
    } else {
      setDiscount(0); // Invalid promo code
      alert("Invalid promo code!");
    }
  };

  const finalCost = totalCost + shippingCost - discount;

  console.log(cart)
  return (
    <div>
      <Breadcrumb />
      <div className="container mx-auto p-6 flex justify-center items-start gap-10 max-w-7xl px-20">
  {/* Cart table */}
  {cart.length === 0 ? (
    <div className="text-center mt-16">
      <FiShoppingCart size={64} className="text-gray-400 mx-auto" />
      <p className="text-gray-600 mt-4 text-lg">No items in your cart yet.</p>
    </div>
  ) : (
    <div className="w-2/3">
      <table className="min-w-full table-auto mb-4">
        <thead className="bg-gray-100 text-[#1D3178]">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) =>
            item._id !== undefined ? (
              
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2 flex items-center gap-4">
                  <Image
                    // src={product.imageUrl}
                    src={item.imageUrl || "/about.png"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold">{item.name}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      className="text-red-600 text-3xl font-extrabold rounded hover:text-red-700 transition"
                      onClick={() => handleDecrement(item._id!)}
                    >
                      -
                    </button>
                    <span>{editQuantities[item._id] || item.quantity || 1}</span>
                    <button
                      className="text-green-600 text-2xl font-extrabold rounded hover:text-green-700 transition"
                      onClick={() => handleIncrement(item._id!)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-gray-600">${item.price}</td>
                <td className="px-4 py-2 font-semibold">
                  ${(
                    item.price * (editQuantities[item._id] || item.quantity || 0)
                  ).toFixed(2)}
                </td>

                <td className="px-4 py-2">
                  <button
                    onClick={() => removeFromCart(item._id!)}
                    className="text-red-600 hover:text-red-800 font-semibold transition duration-300 ml-6"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  )}
  {/* Totals section */}
  {cart.length > 0 && (
    <div className="lg:w-1/3 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center text-[#1D3178]">Cart Totals</h3>
      <div className="bg-[#F4F4FC] p-4 rounded mb-4">
        <div className="mb-2 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
          <span>Subtotal:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
        <div className="mb-2 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
          <span>Promo Discount:</span>
          <span>${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
          <span>Total:</span>
          <span>${finalCost.toFixed(2)}</span>
        </div>
      </div>

      <h4 className="text-xl font-bold mb-4 text-center text-[#1D3178]">Calculate Shipping</h4>
      <div className="bg-[#F4F4FC] p-4 rounded">
        <select
          value={shippingMethod}
          onChange={handleShippingChange}
          className="bg-[#F4F4FC] border-gray-300 p-2 rounded w-full mb-4"
        >
          <option value="Standard">Standard - $5</option>
          <option value="Express">Express - $20</option>
        </select>

        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo Code SAVE10"
          className="w-full bg-[#F4F4FC] border-gray-300 p-2 rounded mb-4"
        />
        <button
          onClick={handlePromoCodeApply}
          className="bg-pink-500 hover:bg-purple-600 w-full text-white px-4 py-2 rounded mb-4"
        >
          Apply Promo Code
        </button>
        <Link href="/checkout">
        <button className="bg-green-500 hover:bg-pink-500 w-full text-white px-4 py-2 rounded">
          Proceed to Checkout
        </button>
        </Link>
      </div>
    </div>
  )}
</div>

      </div>
    // </div>
  );
};

export default CartPage;


// "use client";
// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { FaTrash } from "react-icons/fa";
// import Image from "next/image";
// import Breadcrumb from "@/components/BreadCrumb";

// const CartPage: React.FC = () => {
//   const { cart, removeFromCart, updateQuantity } = useCart();
//   const [editQuantities, setEditQuantities] = useState<{ [id: number]: number }>({});
//   const [shippingMethod, setShippingMethod] = useState<string>("Standard");
//   const [shippingCost, setShippingCost] = useState<number>(5); // Default shipping cost for Standard
//   const [promoCode, setPromoCode] = useState<string>("");
//   const [discount, setDiscount] = useState<number>(0);

//   const handleIncrement = (id: number) => {
//     setEditQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//     updateQuantity(id, (editQuantities[id] || 1) + 1);
//   };

//   const handleDecrement = (id: number) => {
//     if (editQuantities[id] > 1) {
//       setEditQuantities((prev) => ({
//         ...prev,
//         [id]: (prev[id] || 1) - 1,
//       }));
//       updateQuantity(id, (editQuantities[id] || 1) - 1);
//     }
//   };

//   const totalCost = cart.reduce((total, item) => {
//     if (item.id !== undefined) {
//       return total + item.price * (editQuantities[item.id] || item.quantity || 0);
//     }
//     return total;
//   }, 0);

//   const handleShippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setShippingMethod(event.target.value);
//     setShippingCost(event.target.value === "Express" ? 20 : 5); // Set cost based on method
//   };

//   const handlePromoCodeApply = () => {
//     if (promoCode === "SAVE10") {
//       setDiscount(totalCost * 0.1); // 10% discount
//     } else {
//       setDiscount(0); // Invalid promo code
//       alert("Invalid promo code!");
//     }
//   };

//   const finalCost = totalCost + shippingCost - discount;

//   return (
//     <div>
//       <Breadcrumb />
//       <div className="container mx-auto p-6 flex justify-between px-20 max-w-7xl">
//         <div className="w-3/5">
//           {cart.length === 0 ? (
//             <p className="text-gray-400">No items in your cart yet.</p>
//           ) : (
//             <table className="min-w-full table-auto mb-4">
//               <thead className="bg-gray-100 text-[#1D3178]">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Product</th>
//                   <th className="px-4 py-2 text-left">Name</th>
//                   <th className="px-4 py-2 text-left">Quantity</th>
//                   <th className="px-4 py-2 text-left">Price</th>
//                   <th className="px-4 py-2 text-left">Total</th>
//                   <th className="px-4 py-2 text-left">Remove</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.map((item) =>
//                   item.id !== undefined ? (
//                     <tr key={item.id} className="border-b">
//                       <td className="px-4 py-2 flex items-center gap-4">
//                         <Image
//                           src={item.imageUrl}
//                           alt={item.title}
//                           width={64}
//                           height={64}
//                           className="rounded"
//                         />
//                       </td>
//                       <td className="px-4 py-2 font-semibold">{item.title}</td>
//                       <td className="px-4 py-2">
//                         <div className="flex items-center gap-2 ml-2">
//                           <button
//                             className="text-red-600 text-3xl font-extrabold rounded hover:text-red-700 transition"
//                             onClick={() => handleDecrement(item.id!)}
//                           >
//                             -
//                           </button>
//                           <span>{editQuantities[item.id] || item.quantity || 1}</span>
//                           <button
//                             className="text-green-600 text-2xl font-extrabold rounded hover:text-green-700 transition"
//                             onClick={() => handleIncrement(item.id!)}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </td>
//                       <td className="px-4 py-2 text-gray-600">${item.price}</td>
//                       <td className="px-4 py-2 font-semibold">
//                         ${(
//                           item.price * (editQuantities[item.id] || item.quantity || 0)
//                         ).toFixed(2)}
//                       </td>
//                       <td className="px-4 py-2">
//                         <button
//                           onClick={() => removeFromCart(item.id!)}
//                           className="text-red-600 hover:text-red-800 font-semibold transition duration-300 ml-6"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ) : null
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {cart.length > 0 && (
//           <div className="lg:w-1/3 p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-bold mb-4 text-center text-[#1D3178]">Cart Totals</h3>
//             <div className="bg-[#F4F4FC] p-4 rounded">
//               <div className="mb-2 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
//                 <span>Subtotal:</span>
//                 <span>${totalCost.toFixed(2)}</span>
//               </div>
//               <div className="mb-2 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
//                 <span>Shipping:</span>
//                 <select
//                   value={shippingMethod}
//                   onChange={handleShippingChange}
//                   className="bg-[#F4F4FC] border-gray-300 p-2 rounded"
//                 >
//                   <option value="Standard">Standard - $5</option>
//                   <option value="Express">Express - $20</option>
//                 </select>
//               </div>
//               <div className="mb-2 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
//                 <span>Promo Discount:</span>
//                 <span>${discount.toFixed(2)}</span>
//               </div>
//               <div className="mb-6 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
//                 <span>Total:</span>
//                 <span>${finalCost.toFixed(2)}</span>
//               </div>
//               <input
//                 type="text"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//                 placeholder="Promo Code"
//                 className="w-full bg-[#F4F4FC] border-gray-300 p-2 rounded mb-4"
//               />
//               <button
//                 onClick={handlePromoCodeApply}
//                 className="bg-pink-500 hover:bg-purple-600 w-full text-white px-4 py-2 rounded mb-4"
//               >
//                 Apply Promo Code
//               </button>
//               <button className="bg-green-500 hover:bg-pink-500 w-full text-white px-4 py-2 rounded">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;




// "use client";
// import Breadcrumb from "@/components/BreadCrumb";
// import Image from "next/image";
// import React, { useState } from "react";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Ut diam consequat",
//       color: "Brown",
//       size: "XL",
//       price: 32.0,
//       quantity: 1,
//       image: "/pc1.png",
//     },
//     {
//       id: 2,
//       name: "Vel faucibus posuere",
//       color: "Black",
//       size: "M",
//       price: 50.0,
//       quantity: 2,
//       image: "/pc2.png",
//     },
//     {
//       id: 3,
//       name: "Ac vitae vestibulum",
//       color: "Red",
//       size: "S",
//       price: 40.0,
//       quantity: 1,
//       image: "/pc3.png",
//     },
//     {
//       id: 4,
//       name: "Elit massa diam",
//       color: "White",
//       size: "L",
//       price: 100.0,
//       quantity: 1,
//       image: "/pcs4.png",
//     },
//     {
//       id: 5,
//       name: "Proin pharetra elementum",
//       color: "Grey",
//       size: "42",
//       price: 75.0,
//       quantity: 1,
//       image: "/pc5.png",
//     },
//   ]);

//   const handleQuantityChange = (id: number, newQuantity: number) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div>
//       {/* BreadCrumb */}
//       <Breadcrumb />
//       <div className="bg-white min-h-screen max-w-7xl mx-auto">
//         {/* Page Content */}
//         <main className="container mx-auto my-6 px-4 md:px-6">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Cart Table */}
//             <div className="lg:w-2/3">
//               <div className="overflow-x-auto">
//                 <table className="w-full bg-white">
//                   <thead className="text-[#1D3178]">
//                     <tr>
//                       <th className="py-2 text-left pl-4">Product</th>
//                       <th className="py-2">Price</th>
//                       <th className="py-2">Quantity</th>
//                       <th className="py-2">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartItems.map((item) => (
//                       <tr key={item.id} className="text-center">
//                         <td className="border-b border-gray-300 px-4 py-2 flex items-center">
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={60}
//                             height={60}
//                             className="mr-4"
//                           />
//                           <div className="text-left">
//                             <p className="text-sm text-black">{item.name}</p>
//                             <p className="text-sm text-gray-400">
//                               Color: {item.color}
//                             </p>
//                             <p className="text-sm text-gray-400">
//                               Size: {item.size}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="border-b border-gray-300 px-4 py-2 text-sm text-[#15245E]">
//                           £{item.price.toFixed(2)}
//                         </td>
//                         <td className="border-b border-gray-300 px-4 py-2 text-sm text-[#15245E]">
//                           <input
//                             type="number"
//                             className="w-12 text-center border border-gray-300 rounded"
//                             value={item.quantity}
//                             min={1}
//                             onChange={(e) =>
//                               handleQuantityChange(
//                                 item.id,
//                                 Number(e.target.value)
//                               )
//                             }
//                           />
//                         </td>
//                         <td className="border-b border-gray-300 px-4 py-2 text-sm text-[#15245E]">
//                           £{(item.price * item.quantity).toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
//                 <button className="bg-pink-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
//                   Update Cart
//                 </button>
//                 <button className="bg-pink-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             {/* Cart Summary */}
//             <div className="lg:w-1/3">
//               <h3 className="text-xl font-bold mb-4 text-center text-[#1D3178]">
//                 Cart Totals
//               </h3>
//               <div className="bg-[#F4F4FC] p-4 rounded">
//                 <div className="mb-2 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
//                   <span>Subtotal:</span>
//                   <span>£{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="mb-6 flex justify-between text-[#1D3178] border-b border-gray-300 pb-2">
//                   <span>Total:</span>
//                   <span>£{subtotal.toFixed(2)}</span>
//                 </div>
//                 <p className="text-sm text-gray-400 mb-6">
//                   <span className="w-2.5 h-2.5 bg-green-500 mr-2 inline-flex rounded-full"></span>
//                   Shipping & taxes calculated at checkout
//                 </p>
//                 <button className="bg-green-500 w-full text-white px-4 py-2 rounded">
//                   Proceed to Checkout
//                 </button>
//               </div>

//               {/* Shipping Calculation */}
//               <div className="mt-6">
//                 <h3 className="text-xl font-bold mb-4 text-center text-[#1D3178]">
//                   Calculate Shipping
//                 </h3>
//                 <div className="bg-[#F4F4FC] p-4 rounded">
//                   <form className="space-y-4">
//                     <input
//                       type="text"
//                       placeholder="Bangladesh"
//                       className="w-full bg-[#F4F4FC] border-b border-gray-300 p-2 rounded"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Mirpur Dhaka - 1200"
//                       className="w-full bg-[#F4F4FC] border-b border-gray-300 p-2 rounded"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Postal Code"
//                       className="w-full bg-[#F4F4FC] border-b border-gray-300 p-2 rounded"
//                     />
//                     <button className="bg-pink-500 hover:bg-purple-600 w-full text-white px-4 py-2 rounded">
//                       Calculate Shipping
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CartPage;




// // Example Products Data (replace with actual data or fetch from API)
// export const getServerSideProps = async () => {
//   const products: Product[] = [
//     {
//       id: 1,
//       name: "T-shirt",
//       image: "/images/tshirt.jpg", // Replace with actual image path
//       price: 25,
//       quantity: 2,
//       size: "M",
//       color: "Red",
//     },
//     {
//       id: 2,
//       name: "Jeans",
//       image: "/images/jeans.jpg", // Replace with actual image path
//       price: 50,
//       quantity: 1,
//       size: "L",
//       color: "Blue",
//     },
//   ];

//   return { props: { products } };
// };
