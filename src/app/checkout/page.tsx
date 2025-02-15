"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import InputField from "@/components/InputField";
import { FiCheckCircle } from "react-icons/fi";
import { LuShoppingBasket } from "react-icons/lu";
import Breadcrumb from "@/components/BreadCrumb";
import Link from "next/link";
import { Product } from "../Data/product";
import { CartItem, getCartItems } from "../context/CartContext";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

export interface FormValue {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

const Checkout = () => {
  const router = useRouter();
  const sectionStyle = "rounded-lg shadow-lg bg-white p-6 mb-8"; // Added shadow for a more polished look
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormValue>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    address: false,
    city: false,
    postalCode: false,
    country: false,
    cardNumber: false,
    cardExpiry: false,
    cardCVC: false,
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price! * item.quantity!,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      name: !formValues.name,
      email: !formValues.email,
      phoneNumber: !formValues.phoneNumber,
      address: !formValues.address,
      city: !formValues.city,
      postalCode: !formValues.postalCode,
      country: !formValues.country,
      cardNumber: !formValues.cardNumber,
      cardExpiry: !formValues.cardExpiry,
      cardCVC: !formValues.cardCVC,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (!validateForm()) {
            setSuccessMessage("");
            return;
        }
        localStorage.removeItem("appliedDiscount");
        setSuccessMessage("Order placed successfully!");
        router.push("/completeOrder");

        const orderData = { 
            _type: "order", 
            fullName: formValues.name, 
            email: formValues.email, 
            phoneNumber: formValues.phoneNumber, 
            address: formValues.address, 
            city: formValues.city, 
            postalCode: formValues.postalCode, 
            country: formValues.country, 
            cartItems: cartItems.map(item => ({
                _type: "reference",
                _ref: item._id,
            })), 
            totalPrice: subTotal,  
            discount: discount,
            orderDate: new Date().toISOString(),
        };

        console.log("Sanity Token:", process.env.SANITY_API_TOKEN);
        console.log("Order Data:", orderData);

        const response = await client.create(orderData);
        console.log("Order Created:", response);
    } catch (error) {
        console.error("Error in handlePlaceOrder:", error);
        alert("An error occurred! Check console.");
    }
};

  return (
    <div>
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-summary flex flex-col space-y-6">
            <h3 className="text-2xl font-bold text-[#151875] mb-4">Order Summary</h3>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={item._id}
                  className={`flex items-center space-x-4 ${index !== cartItems.length - 1 ? 'border-b-2 border-gray-300 pb-4 mb-4' : ''}`}
                >
                  {item.imageUrl && (
                    <Image
                      src={urlFor(item.imageUrl).url()}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm">Price: ${item.price! * item.quantity!}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            {/* Display subtotal */}
            <div className="pt-14 border-t-2 border-gray-300 flex justify-between font-bold text-lg text-gray-800">
              <span className="text-[#151875]">Subtotal:</span>
              <span>${subTotal}</span>
            </div>
            <div className="mt-4 flex justify-between font-bold text-lg text-gray-800">
              <span className="text-[#151875]">Discount:</span>
              <span>{discount ? `-${discount}%` : "No discount"}</span>
            </div>
            <div className="mt-4 flex justify-between font-bold text-lg text-gray-800">
              <span className="text-[#151875]">Total:</span>
              <span>${subTotal - subTotal * (discount / 100)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form">
            <h1 className="text-2xl font-bold text-[#151875] mb-4">Complete Your Purchase</h1>
            <p className="text-gray-400 mb-8">
              Finalize your order by providing the necessary details below. Our streamlined checkout process ensures your information is handled securely and your purchase is completed with ease.
            </p>

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}

            {/* Form */}
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Information */}
              <section className={sectionStyle}>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <InputField
                      label="Full Name:"
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      placeholder="Enter Your Full Name"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-600 mt-1">Name is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="Email:"
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1">Email is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="Phone Number:"
                      type="text"
                      name="phoneNumber"
                      value={formValues.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter Your Phone Number"
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-xs text-red-600 mt-1">PhoneNumber is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="Country:"
                      type="text"
                      name="country"
                      value={formValues.country}
                      onChange={handleChange}
                      placeholder="Enter Your Country "
                    />
                    {formErrors.country && (
                      <p className="text-xs text-red-600 mt-1">Country is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="City:"
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      placeholder="Enter Your City"
                    />
                    {formErrors.city && (
                      <p className="text-xs text-red-600 mt-1">City is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="Address:"
                      type="text"
                      name="address"
                      value={formValues.address}
                      onChange={handleChange}
                      placeholder="For Example: House# 123, Street# 123 ABC Road."
                    />
                    {formErrors.address && (
                      <p className="text-xs text-red-600 mt-1">Address is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="Postal Code:"
                      type="text"
                      name="postalCode"
                      value={formValues.postalCode}
                      onChange={handleChange}
                      placeholder="Enter Your Postal Code"
                    />
                    {formErrors.postalCode && (
                      <p className="text-xs text-red-600 mt-1">PostalCode is Required</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Billing Information */}
              <section className={`${sectionStyle} border-t-2`}>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Billing Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <InputField
                      label="Card Number:"
                      type="text"
                      name="cardNumber"
                      value={formValues.cardNumber}
                      onChange={handleChange}
                      placeholder="Enter Your Card Number"
                    />
                    {formErrors.cardNumber && (
                      <p className="text-xs text-red-600 mt-1">Card Number is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="Card Expiry:"
                      type="text"
                      name="cardExpiry"
                      value={formValues.cardExpiry}
                      onChange={handleChange}
                      placeholder="Enter Card Expiry Date"
                    />
                    {formErrors.cardExpiry && (
                      <p className="text-xs text-red-600 mt-1">Card Expiry Date is Required</p>
                    )}
                  </div>
                  <div className="relative">
                    <InputField
                      label="Card CVC:"
                      type="text"
                      name="cardCVC"
                      value={formValues.cardCVC}
                      onChange={handleChange}
                      placeholder="Enter Your Card CVC"
                    />
                    {formErrors.cardCVC && (
                      <p className="text-xs text-red-600 mt-1">Card CVC is Required</p>
                    )}
                  </div>
                </div>
              </section>
              <div className="flex justify-between gap-4">
                {/* continue shopping  */}
              <button
              // {/* <Link href="/products" */
            type="button"
            onClick={() => router.push("/")} // Redirect to the home page
            className="w-full font-semibold bg-purple-600 text-white py-3 hover:bg-pink-500 mt-4 mb-4"
          >
            Continue Shopping
          {/* </Link> */}
              </button>
              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full font-semibold bg-green-600 text-white py-3 hover:bg-pink-500 mt-4 mb-4"
              >
                Place Order
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


// "use client";
// import React, { useEffect, useState} from "react";
// import { useRouter } from "next/navigation";
// import { FaShoppingCart } from "react-icons/fa";
// import InputField from "@/components/InputField";
// import { FiCheckCircle } from "react-icons/fi";
// import { LuShoppingBasket } from "react-icons/lu";
// import Breadcrumb from "@/components/BreadCrumb";
// import Link from "next/link";
// import { Product } from "../Data/product";
// import { CartItem, getCartItems } from "../context/CartContext";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";

// export interface FormValue{
//     name: string,
//     email: string,
//     phoneNumber: string,
//     address: string,
//     city: string,
//     postalCode: string,
//     country: string,
//     cardNumber: string,
//     cardExpiry: string,
//     cardCVC: string,
// }

// // Define the checkout component
// const Checkout = () => {
//   const router = useRouter();
//   // Section and box-shadow styling for uniform look
//   const sectionStyle =
//     "rounded-lg mb-12";

//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const [discount, setDiscount] = useState<number>(0)
//     // State for formValue, errors and success message
//   const [formValues, setFormValues] = useState<FormValue>({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     cardNumber: "",
//     cardExpiry: "",
//     cardCVC: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     name: false,
//     email: false,
//     phoneNumber: false,
//     address: false,
//     city: false,
//     postalCode: false,
//     country: false,
//     cardNumber: false,
//     cardExpiry: false,
//     cardCVC: false,
//   });
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     setCartItems(getCartItems())
//     const appliedDiscount = localStorage.getItem("appliedDiscount");
//     if (appliedDiscount) {
//       setDiscount(Number(appliedDiscount));
//     }
//   }, [])

//   const subTotal = cartItems.reduce((total, item) => total + item.price! * item.quantity! , 0);

//   // Handle form input changes and specific formatting for card fields
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormValues({
//       ...formValues,
//       [e.target.id]: e.target.value,
//     })
//   };

//   const validateForm = () => {
//     const errors = {
//       name : !formValues.name,
//       email :!formValues.email,
//       phoneNumber :!formValues.phoneNumber,
//       address :!formValues.address,
//       city :!formValues.city,
//       postalCode :!formValues.postalCode,
//       country :!formValues.country,
//       cardNumber :!formValues.cardNumber,
//       cardExpiry :!formValues.cardExpiry,
//       cardCVC :!formValues.cardCVC,
//     }
//     setFormErrors(errors);
//     return Object.values(errors).every((error) => !errors)
//   }

//   const handlePlaceOrder =() => {
//     if(validateForm()) {
//       localStorage.removeItem("appliedDiscount");
//     }
//   }

//   return (
//     <div className="">
//   {/* Breadcrumb */}
//   <Breadcrumb />
//   <div>
//   <h3>Order Summary</h3>
//   {cartItems.length > 0 ? (
//     cartItems.map((item) => (
//       <div key={item._id} className="">
//         {item.imageUrl && (
//           <Image
//             src={urlFor(item.imageUrl).url()}
//             alt={item.name}
//             width={50}
//             height={50}
//             className="rounded-lg mb-4"
//           />
//         )}
//         <p>Name: {item.name}</p>
//         <p>Quantity: {item.quantity}</p>
//         <p>Price: {item.price! * item.quantity!}</p>
//         <p>Description: {item.description}</p>
//       </div>
//     ))
//   ) : (
//     <p>No items in the cart</p>
//   )}
// </div>

//   <div className="container max-w-7xl mx-auto px-4 md:px-20 py-12">
//     <h1 className="text-2xl font-bold mb-4 text-[#151875]">
//       Complete Your Purchase
//     </h1>

//     <p className="text-gray-400 leading-relaxed mb-8">
//       Finalize your order by providing the necessary details below. Our streamlined checkout process ensures your information is handled securely and your purchase is completed with ease.
//     </p>

//     {/* Success Message */}
//     {successMessage && (
//       <p className="text-green-500 mb-4">{successMessage}</p>
//     )}

//     {/* Submission Form */}
//     <form onSubmit={handlePlaceOrder} className="space-y-6">
//       {/* Shipping Information Fields */}
//       <section className={`${sectionStyle}`}>
//         <h2 className="text-2xl font-bold mb-4 text-gray-700">Delivery Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <InputField
//             label="Full Name:"
//             type="text"
//             name="name"
//             value={formValues.name}
//             onChange={handleChange}
//             placeholder="Enter Your Full Name"
//             // error={errors.name}
//           />
//           <InputField
//             label="Email:"
//             type="email"
//             name="email"
//             value={formValues.email}
//             onChange={handleChange}
//             placeholder="Enter Your Email"
//             // error={errors.email}
//           />
//           <InputField
//             label="Phone Number:"
//             type="text"
//             name="phoneNumber"
//             value={formValues.phoneNumber}
//             onChange={handleChange}
//             placeholder="Enter Your Phone Number"
//             // error={errors.phoneNumber}
//           />
//           <InputField
//             label="Country:"
//             type="text"
//             name="country"
//             value={formValues.country}
//             onChange={handleChange}
//             placeholder="Enter Your Country"
//             // error={errors.country}
//           />
//           <InputField
//             label="City:"
//             type="text"
//             name="city"
//             value={formValues.city}
//             onChange={handleChange}
//             placeholder="Enter Your City"
//             // error={errors.city}
//           />
//           <InputField
//             label="Address:"
//             type="text"
//             name="address"
//             value={formValues.address}
//             onChange={handleChange}
//             placeholder="For Example: House# 123, Street# 123 ABC Road."
//             // error={errors.address}
//           />
//           <InputField
//             label="Postal Code:"
//             type="text"
//             name="postalCode"
//             value={formValues.postalCode}
//             onChange={handleChange}
//             placeholder="Enter Your Postal Code"
//             // error={errors.postalCode}
//           />
//         </div>
//       </section>

//       {/* Billing Information */}
//       <section className={`${sectionStyle} border-t-2`}>
//         <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-700">Billing Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <InputField
//             label="Card Number:"
//             type="text"
//             name="cardNumber"
//             value={formValues.cardNumber}
//             onChange={handleChange}
//             placeholder="Enter Your Card Number"
//             // error={errors.cardNumber}
//           />
//           <InputField
//             label="Card Expiry (MM/YY):"
//             type="text"
//             name="cardExpiry"
//             value={formValues.cardExpiry}
//             onChange={handleChange}
//             placeholder="Enter Card Expiry"
//             // error={errors.cardExpiry}
//           />
//           <InputField
//             label="CVC:"
//             type="text"
//             name="cardCVC"
//             value={formValues.cardCVC}
//             onChange={handleChange}
//             placeholder="Enter CVC"
//             // error={errors.cardCVC}
//           />
//         </div>
//         <div className="flex justify-center gap-4 mt-6">
//           <Link href="/products"
//             type="button"
//             onClick={() => router.push("/")} // Redirect to the home page
//             className="flex justify-center items-center bg-purple-600 hover:bg-pink-500 transition md:w-full p-2 font-bold text-white rounded gap-2"
//           >
//             Continue Shopping
//             <LuShoppingBasket className="w-6 h-6" />
//           </Link>
//           <Link href="/completeOrder"
//             type="submit"
//             className="flex justify-center items-center bg-pink-500 hover:bg-purple-600 transition md:w-full p-2 font-bold text-white rounded gap-2"
//           >
//             Place Order
//             <FiCheckCircle className="w-6 h-6" />
//           </Link>
//         </div>
//       </section>
//     </form>
//   </div>
// </div>

//   );
// };

// export default Checkout;