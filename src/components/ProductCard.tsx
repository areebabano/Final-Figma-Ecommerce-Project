// components/ProductCard.tsx
import React from 'react';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-bold">${product.price}</p>
    </div>
  );
};

export default ProductCard;

