import Image from "next/image";

const TrendingProducts = () => {
  const products = [
    { id: 1, name: "Cantilever Chair", price: "$100.00", discountPrice: "$90.00", image: "/trendingchair1.png" },
    { id: 2, name: "Cantilever Chair", price: "$120.00", discountPrice: "$110.00", image: "/trendingchair2.png" },
    { id: 3, name: "Cantilever Chair", price: "$80.00", discountPrice: "$70.00", image: "/trendingchair3.png" },
    { id: 4, name: "Cantilever Chair", price: "$150.00", discountPrice: "$140.00", image: "/trendingchair4.png" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-[#151875] mb-8">Trending Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition hover:border-b-4 border-blue-900">
            {/* Image Section */}
            <div className="bg-gray-100 h-48 flex justify-center items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                objectFit="contain"
                className="object-contain"
              />
            </div>

            {/* Product Name and Price */}
            <div className="p-4 flex flex-col text-center">
              <h3 className="text-lg font-semibold text-[#151875]">{product.name}</h3>

              <div className="flex flex-col mt-1 space-y-2 items-center">
                <div className="flex justify-center items-center gap-2">
                  <p className="text-sm font-bold text-[#151875]">{product.price}</p>
                  <p className="text-sm text-gray-400 line-through">{product.discountPrice}</p>
                </div>
              </div>
            </div>
          </div>
        ))}  
      </div>
    </div>
  );
};

export default TrendingProducts;