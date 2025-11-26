import BannerAndSlider from '@/components/ecommerces/HomePage/BannerAndSlider'
import BestSeller from '@/components/ecommerces/HomePage/BestSeller'
import Blog from '@/components/ecommerces/HomePage/Blog'
import Brand from '@/components/ecommerces/HomePage/Brand'
import SpecialOffer from '@/components/ecommerces/HomePage/SpecialOffer'
import EcomLayout from '@/layouts/ecom-layout'
import React from 'react'

export default function Home() {
  return (
    <EcomLayout>
        <BannerAndSlider />
        <BestSeller />
        <SpecialOffer />
        <Brand />
        <Blog />
    </EcomLayout>
  )
}
