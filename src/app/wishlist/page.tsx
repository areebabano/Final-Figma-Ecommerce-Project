"use client";

import { useFavourite } from "@/app/context/FavouriteContext";
import Breadcrumb from "@/components/BreadCrumb";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";

const FavouritePage = () => {
  const { favourites, removeFromFavourites } = useFavourite();

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb />

      <div className="container mx-auto px-16 py-8 max-w-7xl">
        {favourites.length === 0 ? (
          <div className="text-center mt-16">
            <IoMdHeartEmpty size={64} className="text-gray-400 mx-auto" />
            <p className="text-gray-600 mt-4 text-lg">
              No favourite products added yet.
            </p>
          </div>
        ) : (
          <div className="p-2">
            {/* Grid for Card layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favourites.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={100} // Reduced image size
                      height={100} // Reduced image size
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#1D3178] truncate"> {/* Reduced font size */}
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1"> {/* Reduced font size */}
                      <span className="font-medium">Price:</span>{" "}
                      <span className="font-semibold text-gray-800">
                        ${product.price}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Added on:{" "}
                      <span className="text-gray-700">
                        {product.favouritedAt?.toLocaleDateString() || "N/A"}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromFavourites(product._id)}
                    className="text-red-600 font-semibold hover:bg-red-600 hover:text-white mt-4 w-full py-2 border border-red-600 rounded-lg transition duration-300 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritePage;


// "use client";

// import { useFavourite } from "@/app/context/FavouriteContext";
// import Breadcrumb from "@/components/BreadCrumb";
// import Image from "next/image";
// import { IoMdHeartEmpty } from "react-icons/io";

// const FavouritePage = () => {
//   const { favourites, removeFromFavourites } = useFavourite();

//   return (
//     <div>
//       {/* BreadCrumb */}
//       <Breadcrumb />

//       <div className="container mx-auto p-8 max-w-6xl">
//         {favourites.length === 0 ? (
//           <div className="text-center mt-16">
//             <IoMdHeartEmpty size={64} className="text-gray-400 mx-auto" />
//             <p className="text-gray-600 mt-4 text-lg">
//               No favourite products added yet.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favourites.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
//               >
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={300}
//                   height={200}
//                   className="object-cover w-full h-40 transition-transform transform hover:scale-105"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-bold text-lg mb-2 text-[#1D3178]">
//                     {product.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-2">
//                     Price:{" "}
//                     <span className="text-[#1D3178] font-semibold">
//                       ${product.discountedPrice}
//                     </span>
//                   </p>
//                   <p className="text-gray-500 text-xs">
//                     Added on:{" "}
//                     <span className="text-gray-700">
//                       {product.favouritedAt?.toLocaleDateString() || "N/A"}
//                     </span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeFromFavourites(product.id)}
//                   className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FavouritePage;
