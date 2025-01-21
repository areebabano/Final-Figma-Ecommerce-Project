"use client";
import { products } from "@/app/Data/product";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaArrowRight, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaRegHeart, FaTwitter } from "react-icons/fa";
import Breadcrumb from "@/components/BreadCrumb";
import { useCart } from "@/app/context/CartContext";
import { useState, useEffect } from "react";
import { useFavourite } from "@/app/context/FavouriteContext";
import Loading from "@/components/Loading";
import RelatedProducts from "@/components/RelatedProducts";
import { client } from "@/sanity/lib/client";
import Notification from "@/components/Notification";  // Import the Notification component

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const query = `*[_type == 'productData' && _id == $id][0]{
    _id,
    name,
    "imageUrl": image.asset->url,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
      }`
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [stockMessage, setStockMessage] = useState("");  // For stock-related messages
  const { favourites, addToFavourites, removeFromFavourites } = useFavourite();

  useEffect(() => {
    const fetchProduct = async () => {
    //   try {
    //     const data = await client.fetch(query, { id: params.id });
    //     // console.log("my data", data)
    //     const foundProduct = data.find((p: any) => p._id === params.id);

    //     if (foundProduct) {
    //       setProduct(foundProduct);
    //     } else {
    //       notFound();
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch product data:", error);
    //   }
    // };
    try {
      const data = await client.fetch(query, { id: params.id });
      if (data) {
        setProduct(data);
      } else {
        notFound();
      }
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      notFound();
    }
  };
  
    fetchProduct();
  }, [params.id,]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = () => {
    if (!product) return;

    // Check if the stock is available
    if (product.stockLevel >= quantity) {
      addToCart({
        _id: product._id,
        imageUrl: product.imageUrl,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity,
      });
      setSuccessMessage("Product added to cart successfully!");
      product.stockLevel -= quantity;  // Reduce stock
      setTimeout(() => setSuccessMessage(""), 2000);
      setStockMessage("");  // Clear stock message
    } else {
      setStockMessage("Stock not available!");
    }
  };

  const isFavorite = product ? favourites.some((fav) => fav._id === product._id) : false;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavourites(product._id!);
    } else {
      addToFavourites(product);
    }
  };

  if (!product) return <Loading />;

  return (
    <div className="">
      <Breadcrumb />
      <div className=" max-w-7xl mx-auto px-20 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg mb-10">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-black">{product.name}</h1>
            <div className="flex items-center text-yellow-500">
              <span className="text-lg font-bold">★★★★★</span>
              <span className="ml-2 text-gray-500">(120 reviews)</span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xl text-black font-bold">${product.price}</p>
              <p className="font-semibold text-md text-green-600">{product.discountPercentage}% Discount</p>
            </div>

            {/* Description */}
            <p className="text-gray-400">{product.description}</p>

            {/* Stock Display */}
            <div className="flex items-center gap-2">
              <span className="text-md font-bold text-gray-900">Available Stock:</span>
              <span
                className={`text-lg font-bold ${product.stockLevel === 0 ? "text-red-600" : "text-green-600"}`}
              >
                {product.stockLevel} {product.stockLevel === 0 && "(Out of Stock)"}
              </span>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`bg-pink-500 hover:bg-purple-700 text-white px-6 py-2 transition ${product.stockLevel === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={product.stockLevel === 0} // Disable if out of stock
              >
                Add to Cart
              </button>
              <button onClick={handleFavoriteToggle} className="text-3xl">
                {isFavorite ? <FaHeart className="text-red-600" /> : <FaRegHeart className=""/>}
              </button>
            </div>

            {/* Notifications */}
            {successMessage && <Notification message={successMessage} type="success" />}
            {stockMessage && <Notification message={stockMessage} type="error" />}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-md font-bold text-gray-900">Quantity:</span>
              <button
                onClick={handleDecrement}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                +
              </button>
            </div>

            {/* Categories */}
            <div className="text-gray-400">
              <span className="text-md font-bold text-gray-900">Categories:</span> {product.category}
            </div>

            {/* Social Share Icons */}
            <div className="mt-4 flex gap-4">
              <span className="text-md font-bold text-gray-900">Share: </span>
              <FaFacebook size={20} className="text-blue-600" />
              <FaInstagram size={20} className="text-pink-700" />
              <FaTwitter size={20} className="text-blue-300" />
              <FaPinterest size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts />

      {/* Centered Image Section */}
      <div className="flex justify-center mt-14 bg-white mb-14">
        <Image
          src="/newsletter.png" // Replace with your image path
          alt="News Letter"
          width={800}
          height={600}
        />
      </div>
    </div>
  );
};

export default ProductPage;



// "use client";

// import { products } from "@/app/Data/product";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { FaArrowRight, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaRegHeart, FaTwitter } from "react-icons/fa";
// import Breadcrumb from "@/components/BreadCrumb";
// import { useCart } from "@/app/context/CartContext";
// import { useState, useEffect } from "react";
// import { useFavourite } from "@/app/context/FavouriteContext";

// interface ProductPageProps {
//   params: {
//     id: string;
//   };
// }

// const relatedProducts = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     image: "/rp1.png",
//     rating: 4.5,
//     originalPrice: 59.99,
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     image: "/rp2.png",
//     rating: 4.7,
//     originalPrice: 149.99,
//   },
//   {
//     id: 3,
//     name: "Portable Speaker",
//     image: "/rp3.png",
//     rating: 4.3,
//     originalPrice: 49.99,
//   },
//   {
//     id: 4,
//     name: "Gaming Mouse",
//     image: "/rp4.png",
//     rating: 4.8,
//     originalPrice: 35.99,
//   },
// ];

// const ProductPage = ({ params }: ProductPageProps) => {
//   const { cart, addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [product, setProduct] = useState<any>(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const { favourites, addToFavourites, removeFromFavourites } = useFavourite();

//   useEffect(() => {
//     const productId = parseInt(params.id, 10);
//     const foundProduct = products.find((p) => p.id === productId);
//     if (foundProduct) {
//       setProduct(foundProduct);
//     } else {
//       notFound();
//     }
//   }, [params.id]);

//   const handleIncrement = () => setQuantity((prev) => prev + 1);
//   const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

//   const handleAddToCart = () => {
//     if (!product) return;
//     addToCart({
//       id: product.id,
//       imageUrl: product.image,
//       name: product.name,
//       description: product.description,
//       price: product.discountedPrice,
//       quantity,
//     });
//     setSuccessMessage("Product added to cart successfully!");
//     setTimeout(() => setSuccessMessage(""), 2000);
//   };

//   const isFavorite = product ? favourites.some((fav) => fav.id === product.id) : false;

//   const handleFavoriteToggle = () => {
//     if (isFavorite) {
//       removeFromFavourites(product.id!);
//     } else {
//       addToFavourites(product);
//     }
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="">
//       <Breadcrumb />
//       <div className=" max-w-7xl mx-auto px-20 bg-gray-50">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg mb-10">
//         {/* Product Image */}
//         <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={500}
//             height={500}
//             className="rounded-lg"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold text-black">{product.name}</h1>
//           <div className="flex items-center text-yellow-500">
//             <span className="text-lg font-bold">{product.rating} ★</span>
//             <span className="ml-2 text-gray-500">(120 reviews)</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <p className="text-xl text-black font-bold">${product.discountedPrice.toFixed(2)}</p>
//             <p className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
//           </div>

//           {/* Description  */}
//           <p className="text-gray-400">{product.description}</p>

//           {/* Colors section  */}
//           <div className="flex items-center gap-2">
//             <span className="text-md font-bold text-gray-900">Colors:</span>
//             {product.colors?.map((color: string, index: number) => (
//               <span
//                 key={index}
//                 className="w-6 h-6 rounded-full border"
//                 style={{ backgroundColor: color.toLowerCase() }}
//               ></span>
//             ))}
//           </div>
          
//           {/* cart  */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleAddToCart}
//               className="bg-pink-500 hover:bg-purple-700 text-white px-6 py-2 transition"
//             >
//               Add to Cart
//             </button>
//             <button onClick={handleFavoriteToggle} className="text-3xl">
//               {isFavorite ? <FaHeart className="text-red-600" /> : <FaRegHeart className=""/>}
//             </button>
//           </div>
//           {successMessage && (
//             <p className="text-green-500 font-semibold">{successMessage}</p>
//           )}
//           {/* Quantity  */}
//           <div className="flex items-center gap-4">
//             <span className="text-md font-bold text-gray-900">Quantity:</span>
//             <button
//               onClick={handleDecrement}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
//             >
//               -
//             </button>
//             <span>{quantity}</span>
//             <button
//               onClick={handleIncrement}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
//             >
//               +
//             </button>
//           </div>
//           {/* Categories  */}
//           <div className="text-gray-400">
//             <span className="text-md font-bold text-gray-900">Categories:</span> {product.categories?.join(", ")}
//           </div>
//           {/* Tags  */}
//           <div className="text-gray-400">
//             <span className="text-md font-bold text-gray-900">Tags:</span> {product.tags?.join(", ")}
//           </div>

//           {/* Social Share Icons */}
//           <div className="mt-4 flex gap-4">
//             <span className="text-md font-bold text-gray-900">Share: </span>
//             <FaFacebook size={20} className="text-blue-600" />
//             <FaInstagram size={20} className="text-pink-700" />
//             <FaTwitter size={20} className="text-blue-300" />
//             <FaPinterest size={20} className="text-red-600" />
//           </div>
//         </div>
//       </div>

//        {/* Another Section */}
// <div className="bg-gray-100 py-8 px-4 md:px-12">
//   <ul className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 md:gap-14 font-semibold text-lg mb-8">
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Description</li>
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Additional Info</li>
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Reviews</li>
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Video</li>
//   </ul>
//   <h1 className="text-black mb-4 font-semibold text-lg md:text-xl">Varius tempor.</h1>
//   <p className="text-sm text-gray-400">
//     Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//   </p>
//   <h1 className="text-black mb-4 font-semibold text-lg md:text-xl mt-6">More Details</h1>
//   <ul className="space-y-2">
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//   </ul>
// </div>

// {/* Related Products  */}
// <div className="bg-white p-6 rounded-lg shadow-lg px-4 md:px-12 py-8">
//         <h2 className="text-3xl font-bold mb-6">Related Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {relatedProducts.map((item) => (
//             <div key={item.id} className="border rounded-lg p-4 hover:shadow-md">
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 width={150}
//                 height={150}
//                 className="rounded-lg mb-4"
//               />
//               <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//               <p className="text-gray-600">${item.originalPrice.toFixed(2)}</p>
//               <p className="text-yellow-500 font-bold">{item.rating} ★</p>
//             </div>
//           ))}
//         </div>
      
//       </div>

 
//       </div>
//         {/* Centered Image Section */}
//  <div className="flex justify-center mt-14 bg-white mb-14">
//         <Image
//           src="/newsletter.png" // Replace with your image path
//           alt="News Letter"
//           width={800}
//           height={600}
//           className=""
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


// "use client";

// import { products } from "@/app/Data/product";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { FaArrowRight, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaRegHeart, FaTwitter } from "react-icons/fa";
// import Breadcrumb from "@/components/BreadCrumb";
// import { useCart } from "@/app/context/CartContext";
// import { useState, useEffect } from "react";
// import { useFavourite } from "@/app/context/FavouriteContext";

// interface ProductPageProps {
//   params: {
//     id: string; // This is the dynamic product ID
//   };
// }

// const relatedProducts = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     image: "/rp1.png", 
//     rating: 4.5,
//     originalPrice: 59.99,
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     image: "/rp2.png",
//     rating: 4.7,
//     originalPrice: 149.99,
//   },
//   {
//     id: 3,
//     name: "Portable Speaker",
//     image: "/rp3.png",
//     rating: 4.3,
//     originalPrice: 49.99,
//   },
//   {
//     id: 4,
//     name: "Gaming Mouse",
//     image: "/rp4.png",
//     rating: 4.8,
//     originalPrice: 35.99,
//   },
// ];

// const ProductPage = ({ params }: ProductPageProps) => {
//   const { cart, addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [product, setProduct] = useState<any>(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const { favourites, addToFavourites, removeFromFavourites } = useFavourite();

//   useEffect(() => {
//     // Simulate fetching product data from an API or a data source
//     const productId = parseInt(params.id, 10);
//     const foundProduct = products.find((p) => p.id === productId);
//     if (foundProduct) {
//       setProduct(foundProduct);
//     } else {
//       notFound();
//     }
//   }, [params.id]);

//   const handleIncrement = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const handleDecrement = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
//   };

//   const handleAddToCart = () => {
//     if (!product) return;

//     addToCart({
//       id: product.id,
//       imageUrl: product.image,
//       name: product.name,
//       description: product.description,
//       price: product.discountedPrice,
//       quantity,
//     });
//     setSuccessMessage("Product added to cart successfully!");

//     // Hide message after 3 second

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 2000);
//   };

//   // const isFavorite = favourites.some((fav) => fav.id === product.id);
//   const isFavorite = product ? favourites.some((fav) => fav.id === product.id) : false;

//   const handleFavoriteToggle = () => {
//     if (isFavorite) {
//       removeFromFavourites(product.id!);
//     } else {
//       addToFavourites(product);
//     }
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="max-w-7xl mx-auto bg-gray-50 px-8">
//       {/* BreadCrumb */}
//       <Breadcrumb />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-12 p-4 bg-white rounded-lg shadow-xl mb-20">
//         {/* Product Image */}
//         <div className="flex justify-center items-center bg-gray-100">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={500}
//             height={500}
//             className="rounded-lg"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="py-10">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>

//           {/* Rating */}
//           <div className="flex items-center mt-2">
//             <span className="text-yellow-400">★</span>
//             <span className="ml-2">{product.rating} (120 reviews)</span>
//           </div>

//           {/* Price */}
//           <div className="flex gap-2 mt-2">
//             <p className="text-green-600 font-bold">
//               ${product.discountedPrice.toFixed(2)}
//             </p>
//             <p className="text-gray-500 line-through">
//               ${product.originalPrice.toFixed(2)}
//             </p>
//           </div>


//           {/* Colors */}
//            <div className="mt-4">
//              <span className="font-semibold">Colors: </span>
//            {product.colors?.map((color:string, index:number) => (
//               <span
//                 key={index}
//                 className="mr-2 inline-block w-5 h-5 rounded-full"
//                 style={{ backgroundColor: color.toLowerCase() }}
//               ></span>
//             ))}
//           </div>

//           {/* Description */}
//           <p className="mt-4 text-gray-400">{product.description}</p>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleAddToCart}
//               className="bg-pink-500 text-white px-6 py-2 hover:bg-purple-700 transition duration-200"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleFavoriteToggle}
//               className="flex justify-center text-3xl w-full md:w-auto"
//             >
//               {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
//             </button>
//           </div>

//           {/* Success Message  */}
//           {successMessage && (
//             <p className="text-black font-bold mt-4">{successMessage}</p>
//           )}
//           {/* Quantity */}
//           <div className="flex text-lg font-bold gap-4 items-center mt-4">
//             <span>Quantity</span>
//             <button
//               className="bg-gray-400 text-white px-4 py-1 hover:bg-red-600 transition"
//               onClick={handleDecrement}
//             >
//               -
//             </button>
//             <span className="mx-4">{quantity}</span>
//             <button
//               className="bg-gray-400 text-white px-4 py-1 hover:bg-green-600 transition"
//               onClick={handleIncrement}
//             >
//               +
//             </button>
//           </div>

//           {/* Categories */}
//           <div className="mt-4 text-gray-400">
//             <span className="font-semibold text-black">Categories: </span>
//             {product.categories?.join(", ")}
//           </div>

           

//           {/* Tags */}
//           <div className="mt-4 text-gray-400">
//             <span className="font-semibold text-black">Tags: </span>
//             {product.tags?.join(", ")}
//           </div>

          // {/* Social Share Icons */}
          // <div className="mt-4 flex gap-4">
          //   <span className="font-semibold text-black">Share: </span>
          //   <FaFacebook size={20} className="text-blue-600" />
          //   <FaInstagram size={20} className="text-pink-700" />
          //   <FaTwitter size={20} className="text-blue-300" />
          //   <FaPinterest size={20} className="text-red-600" />
          // </div>
      //   </div>
      // </div>

//       {/* Related Products Section */}
//       <div className="bg-white py-10 px-14">
//         <h1 className="text-3xl font-bold mb-6 ml-2">Related Products</h1>
//         <div className="flex flex-wrap justify-between gap-6">
//           {relatedProducts.map((relatedProduct) => (
//             <div
//               key={relatedProduct.id}
//               className="p-4 w-full sm:w-[22%]"
//             >
//               <Image
//                 src={relatedProduct.image}
//                 alt={relatedProduct.name}
//                 width={150}
//                 height={150}
//                 className="mb-4"
//               />
//               <h2 className="text-sm font-semibold">{relatedProduct.name}</h2>
//               <div className="flex items-center">
//                 <span className="text-yellow-400">★</span>
//                 <span className="ml-2 text-gray-600">{relatedProduct.rating}</span>
//               </div>
//               <p className="text-gray-500 line-through">
//                 ${relatedProduct.originalPrice.toFixed(2)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


// "use client"
// import { products } from "@/app/Data/product";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { FaArrowRight, FaFacebook, FaInstagram, FaPinterest, FaRegHeart, FaTwitter } from "react-icons/fa";
// import Breadcrumb from "@/components/BreadCrumb";
// import { useCart } from "@/app/context/CartContext";
// import { useState } from "react";

// interface ProductPageProps {
//   params: {
//     id: string; // This is the dynamic product ID
//   };
// }

// const relatedProducts = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     image: "/rp1.png", // Replace with actual image paths
//     rating: 4.5,
//     originalPrice: 59.99,
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     image: "/rp2.png",
//     rating: 4.7,
//     originalPrice: 149.99,
//   },
//   {
//     id: 3,
//     name: "Portable Speaker",
//     image: "/rp3.png",
//     rating: 4.3,
//     originalPrice: 49.99,
//   },
//   {
//     id: 4,
//     name: "Gaming Mouse",
//     image: "/rp4.png",
//     rating: 4.8,
//     originalPrice: 35.99,
//   },
// ]

// const ProductPage = async({ params }: ProductPageProps) => {
//   const { cart, addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   // Get the productId from the URL parameter
//   const productId = parseInt(params.id, 10);

//   // Find the product by ID
//   const product = products.find((p) => p.id === productId);

//   // If the product is not found, show a 404 page
//   if (!product) {
//     notFound();
//   }

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       imageUrl: product.image,
//       title: product.name,
//       description: product.description,
//       price: product.discountedPrice,
//       quantity,
//     });

//     const handleIncrement = () => {
//       setQuantity((prev) => prev + 1);
//       // setTotalPrice((quantity) => (quantity + 1) * product.price)
//     };
  
//     const handleDecrement = () => {
//       setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
//       // setTotalPrice((quantity) => (quantity - 1) * product.price)
//     };
  
//     const totalPrice = quantity * product.discountedPrice;
  
//   // const response = await fetch("https:fakestoreapi.com/products")
//   // const productsData = await response.json()
//   // console.log("PRODUCTS DATA: ", productsData);

//   return (
//     <div className="max-w-7xl mx-auto bg-gray-50 px-8">
//       {/* BreadCrumb  */}
//       <Breadcrumb/>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 p-4 bg-white rounded-lg shadow-xl mb-20">
//         {/* Product Image */}
//         <div className="flex justify-center items-center bg-gray-100">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={500}
//             height={500}
//             className="rounded-lg"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="py-10">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>

//           {/* Rating */}
//           <div className="flex items-center mt-2">
//             <span className="text-yellow-400">★</span>
//             <span className="ml-2">{product.rating} (120 reviews)</span>
//           </div>

//           {/* Price */}
//           <div className="flex gap-2 mt-2">
//           <p className="text-green-600 font-bold">
//             ${product.discountedPrice.toFixed(2)}
//           </p>
//           <p className="text-gray-500 line-through">
//             ${product.originalPrice.toFixed(2)}
//           </p>
//           </div>
          
//           <div className="flex mb-8 text-lg font-bold gap-4 items-center">
//             <span>Quantity</span>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//               onClick={handleDecrement}
//             >
//               -
//             </button>
//             <span className="mx-4">{quantity}</span>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//               onClick={handleIncrement}
//             >
//               +
//             </button>
//           </div>

//           {/* Colors */}
//           <div className="mt-4">
//             <span className="font-semibold">Colors: </span>
//             {product.colors?.map((color, index) => (
//               <span
//                 key={index}
//                 className="mr-2 inline-block w-5 h-5 rounded-full"
//                 style={{ backgroundColor: color.toLowerCase() }}
//               ></span>
//             ))}
//           </div>

//           {/* Description */}
//           <p className="mt-4 text-gray-400">{product.description}</p>

//           <div className="flex gap-4 mt-6">
//             {/* Add to Cart Button */}
//           <button
//            onClick={handleAddToCart}
//           className="bg-pink-500 text-white px-6 py-2 hover:bg-purple-700 transition duration-200">
//             Add to Cart
//           </button>
//           {/* Heart Icon */}
//             <button className="text-red-600">
//               <FaRegHeart size={30} />
//             </button>
//           </div>

//           {/* Categories */}
//           <div className="mt-4 text-gray-400">
//             <span className="font-semibold text-black">Categories: </span>
//             {product.categories?.join(", ")}
//           </div>

//           {/* Tags */}
//           <div className="mt-4 text-gray-400">
//             <span className="font-semibold text-black">Tags: </span>
//             {product.tags?.join(", ")}
//           </div>

//           {/* Social Share Icons */}
//           <div className="mt-4 flex gap-4">
//           <span className="font-semibold text-black">Share: </span>
//           <FaFacebook size={20} className="text-blue-600"/>
//           <FaInstagram size={20} className="text-pink-700"/>
//           <FaTwitter size={20} className="text-blue-300"/>
//           <FaPinterest size={20} className="text-red-600"/>
          
//           </div>
//         </div>
//       </div>
//       {/* Another Section */}
// <div className="bg-gray-100 py-6 px-4 md:px-12">
//   <ul className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 md:gap-14 font-semibold text-lg mb-8">
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Description</li>
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Additional Info</li>
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Reviews</li>
//     <li className="text-[#151875] hover:border-b-2 border-[#151875]">Video</li>
//   </ul>
//   <h1 className="text-black mb-4 font-semibold text-lg md:text-xl">Varius tempor.</h1>
//   <p className="text-sm text-gray-400">
//     Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//   </p>
//   <h1 className="text-black mb-4 font-semibold text-lg md:text-xl mt-6">More Details</h1>
//   <ul className="space-y-2">
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//     <li className="text-gray-400 text-sm">
//       <FaArrowRight className="inline-flex mr-1" />
//       Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
//     </li>
//   </ul>
// </div>

      
//       {/* Related Products Section */}
//       <div className="bg-white py-10 px-14">
//         <h1 className="text-3xl font-bold mb-6 ml-2">Related Products</h1>
//         <div className="flex flex-wrap justify-between gap-6">
//           {relatedProducts.map((relatedProduct) => (
//             <div
//               key={relatedProduct.id}
//               className="p-4 w-full sm:w-[22%]"
//             >
//               {/* Related Product Image */}
//               <Image
//                 src={relatedProduct.image}
//                 alt={relatedProduct.name}
//                 width={150}
//                 height={150}
//                 className="mb-4"
//               />

//               {/* Related Product Name */}
//               <div className="flex gap-6">
//               <h2 className="text-sm font-semibold">{relatedProduct.name}</h2>

// {/* Related Product Rating */}
// <div className="flex items-center">
//   <span className="text-yellow-400">★</span>
//   <span className="ml-2 text-gray-600">{relatedProduct.rating}</span>
// </div>
//                 </div>

//               {/* Related Product Price */}
//               <div className="flex gap-2 mt-2">
//                 <p className="text-gray-500 line-through">
//                   ${relatedProduct.originalPrice.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//  {/* Centered Image Section */}
//  <div className="flex justify-center mt-14 bg-white">
//         <Image
//           src="/newsletter.png" // Replace with your image path
//           alt="News Letter"
//           width={700}
//           height={600}
//         />
//       </div>
//     </div>
    
//   );
// }
// };

// export default ProductPage;



// "use client"
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation'; // For fetching dynamic route params

// const ProductDetails = () => {
//   const { id } = useParams(); // Get the dynamic `id` from the URL
//   const [product, setProduct] = useState<any | null>(null); // Store the product data
//   const [loading, setLoading] = useState<boolean>(true); // Loading state

//   // Fetch product data using the `id`
//   useEffect(() => {
//     if (!id) return; // Ensure id is available before fetching

//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//         const data = await response.json();
//         setProduct(data); // Set the product data
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchProduct();
//   }, [id]); // Run the effect only when `id` changes

//   if (loading) {
//     return <div>Loading...</div>; // Show loading while fetching
//   }

//   if (!product) {
//     return <div>Product not found</div>; // Handle case where product is not found
//   }

//   return (
//     <div className="mt-10 px-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Product Details</h1>
//       <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-lg mb-4" />
//         <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
//         <p className="text-gray-600 text-sm mb-4">{product.description}</p>
//         <p className="text-lg font-semibold text-gray-800">${product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
