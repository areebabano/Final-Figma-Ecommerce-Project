import DiscountItem from '@/components/DiscountItem'
import FeaturedProducts from '@/components/FeaturedProducts'
import HeroSection from '@/components/HeroSection'
import LatestProducts from '@/components/LatestProducts'
import LeatestBlog from '@/components/LeatestBlog'
import Newsletter from '@/components/Newsletter'
import ProductDetail from '@/components/ProductDetail'
import ShopExOffer from '@/components/ShopexOffer'
import TopCategories from '@/components/TopCategories'
import TrendingProducts from '@/components/TrendingProducts'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <p className="mt-6 text-gray-600 text-center">
        <b>Explore more about us:</b>
        <Link href="/about-us" className="text-pink-500 ml-2 hover:underline">
          About Us
        </Link>
      </p>
      <FeaturedProducts/>
      <LatestProducts/>
      <ShopExOffer/>
      <ProductDetail/>
      <TrendingProducts/>
      <DiscountItem/>
      <TopCategories/>
      <Newsletter/>
      <LeatestBlog/>
    </div>
  )
}

export default Home;