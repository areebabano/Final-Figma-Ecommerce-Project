import { relatedProducts } from '@/app/Data/relatedProducts'
import Image from 'next/image'
import React from 'react'

function RelatedProducts() {
  return (
    <div>
      {/* Related Products */}
              <div className="bg-white p-6 rounded-lg shadow-lg px-4 md:px-12 py-8">
                <h2 className="text-3xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {relatedProducts.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={150}
                        height={150}
                        className="rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">${item.originalPrice.toFixed(2)}</p>
                      <p className="text-yellow-500 font-bold">{item.rating} ★</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
   
  )
}

export default RelatedProducts
