import Image from "next/image";

const TopCategories = () => {
  const categories = [
    { id: 1, name: "Mini LCW Chair", price: "$120", image: "/topchair1.png" },
    { id: 2, name: "Mini LCW Chair", price: "$150", image: "/topchair2.png" },
    { id: 3, name: "Mini LCW Chair", price: "$200", image: "/topchair3.png" },
    { id: 4, name: "Mini LCW Chair", price: "$180", image: "/topchair4.png" },
  ];

  return (
    <div className="py-8 bg-white max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-[#151875] mb-8">Top Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center p-4"
          >
            {/* Image Section with Hover Effect directly on the image container */}
            <div className="w-56 h-56 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative group hover:border-b-4 hover:border-l-4 hover:border-purple-700">
              <Image
                src={category.image}
                alt={category.name}
                width={134}
                height={134}
                objectFit="cover"
                className="rounded-full"
              />

              {/* View Details Button - Visible on hover */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Details
              </button>
            </div>

            {/* Product Details */}
            <div className="text-center mt-4">
              <h3 className="text-md font-semibold text-blue-900">{category.name}</h3>
              <p className="text-sm text-blue-900">{category.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Dots at the bottom of the section */}
      <div className="flex justify-center space-x-4 mt-4">
        <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-pink-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-pink-500"></div>
      </div>
    </div>
  );
};

export default TopCategories;
