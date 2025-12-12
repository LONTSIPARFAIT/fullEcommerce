import { Link, usePage } from "@inertiajs/react";
import { Heart, Search, ShoppingCart, Star, StarHalf } from "lucide-react";
import { ProductCard } from "../ProductCard";
import { ProductListItem } from '@/types'

interface SpecialOfferProps {
    specialOffers : ProductListItem[];
}

export default function SpecialOffer() {
    const { specialOffers } = usePage().props as any;
    console.log("special offer" ,specialOffers);
    
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="container flex justify-between items-center mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Special Offers</h2>
          <Link prefetch href="#" className="text-indigo-600 hover:text-indigo-800">View All</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {specialOffers.length > 0 ? ( 
                specialOffers.map((product: ProductListItem) => (
                    <ProductCard key={product.id} {...product} className='rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md' style={{width: '100%'}} />
                ))
            ) : (
                <div className='col-span-4 text-center text-gray-500'>No special offers available at the moment</div>
            )}
        </div>
      </div>
    </div>
  );
}
