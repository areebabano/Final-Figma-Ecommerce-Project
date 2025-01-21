interface ShopProducts {
    id: number;
    name: string;
    description: string;
    stock: number;
    originalPrice: number;
  discountedPrice: number;
    image: string,
    rating: number,
}
export const products:ShopProducts[] = [
  {
    id: 1,
    name: "Dictum morbi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    stock: 4,
      originalPrice: 29.99,
  discountedPrice: 20.99,
    image: "/ps1.png",
    rating: 4,
  },
  {
    id: 2,
    name: "Sodales sit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    stock: 1,
      originalPrice: 49.99,
  discountedPrice: 37.99,
    image: "/ps2.png",
    rating: 3,
  },
  {
    id: 3,
    name: "Nibh varius",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    stock: 7,
      originalPrice: 19.99,
  discountedPrice: 12.99,
    image: "/ps3.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Mauris quis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    stock: 9,
      originalPrice: 39.99,
  discountedPrice: 27.99,
    image: "/ps4.png",
    rating: 2,
  },
  {
    id: 5,
    name: "Morbi sagittis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    stock: 6,
      originalPrice: 59.99,
  discountedPrice: 27.99,
    image: "/ps5.png",
    rating: 4,
  },
  {
    id: 6,
    name: "Ultricies venenatis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    stock: 2,
      originalPrice: 99.99,
  discountedPrice: 27.99,
    image: "/ps6.png",
    rating: 2,
  },
  {
    id: 7,
    name: "Scelerisque dignissim",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    stock: 8,
      originalPrice: 69.99,
  discountedPrice: 27.99,
    image: "/ps7.png",
    rating: 3,
  },
];

// Filters data
export const brandFilters = [
  'Coaster Furniture',
  'Fusion Dot High Fashion',
  'Unique Furniture Restor',
  'Dream Furniture Flipping',
  'Young Repurposed',
  'Green DIY Furniture',
];

export const discountOffers = ['20% Cashback', '5% Cashback Offer', '25% Discount Offer'];

export const ratingFilters = [
  { rating: 4, count: '(2341)' },  // 4 stars
  { rating: 3, count: '(1726)' },  // 3 stars
  { rating: 2, count: '(258)' },   // 2 stars
  { rating: 2, count: '(25)' },    // 2 stars
];

export const categories = [
  'Prestashop',
  'Magento',
  'Bigcommerce',
  'osCommerce',
  '3dcart',
  'Bags',
  'Accessories',
  'Jewellery',
  'Watches',
];

export const priceRanges = [
  '$0.00 - $150.00',
  '$150.00 - $350.00',
  '$350.00 - $504.00',
  '$450.00 +',
  '$10.00 - 20000$',
];

export const colors = [
  { name: 'Blue', color: 'bg-blue-500' },
  { name: 'Orange', color: 'bg-orange-500' },
  { name: 'Brown', color: 'bg-orange-800' },
  { name: 'Green', color: 'bg-green-500' },
  { name: 'Purple', color: 'bg-purple-500' },
  { name: 'Sky', color: 'bg-sky-500' },
];
