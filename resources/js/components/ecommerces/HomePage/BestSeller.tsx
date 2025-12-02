import { Link } from '@inertiajs/react'
import React from 'react'

export default function BestSeller ()  {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="mb-8 text-center text-2xl font-bold">Best Sellers</h2>
          <Link href='#' className='text-indigo-600 hover:text-indigo-800'>View All</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Product Card 1 */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="relative">
                    <img src="./images/p-1.png" alt="Product 1" className="h-64 w-full" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}


