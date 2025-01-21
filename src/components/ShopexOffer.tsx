import Image from "next/image";

const ShopExOffer = () => {
  const offers = [
    {
      id: 1,
      title: "24/7 Support",
      image: "/24support1.png", // Replace with your image source
      alt: "24/7 Support Icon",
    },
    {
      id: 2,
      title: "Fast Delivery",
      image: "/24support2.png", // Replace with your image source
      alt: "Fast Delivery Icon",
    },  
    {
      id: 3,
      title: "Secure Payments",
      image: "/24support3.png", // Replace with your image source
      alt: "Secure Payments Icon",
    },
    {
      id: 4,
      title: "Easy Returns",
      image: "/24support4.png", // Replace with your image source
      alt: "Easy Returns Icon",
    },
  ];

  const loremParagraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.";

  return (
    <div className="py-12 bg-white max-w-7xl mx-auto">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
        What ShopEx Offers
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8 ">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition hover:border-b-4 border-purple-600"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={offer.image}
                alt={offer.alt}
                width={60}
                height={60}
                objectFit="contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-purple-950 mb-2">
              {offer.title}
            </h3>
            <p className="text-gray-400 text-sm text-center">{loremParagraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopExOffer;

