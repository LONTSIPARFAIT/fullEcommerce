import { ProductListItem } from '@/types'
import { Heart, Search, ShoppingCart, Star, StarHalf } from 'lucide-react'
import React from 'react'

export const ProductCard = (product : ProductListItem) => {
  return (
                <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="relative">
                    <img src={product.image} alt="Product 1" className="h-64 w-full object-cover" />
                    {product.isDiscount && (
                        <div className="absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">-{product.discount}%</div>   
                    )}
                    <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <ShoppingCart className="h-5 w-5" />
                            </button>
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Heart className="h-5 w-5" />
                            </button>
                            {/* <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Search className="h-5 w-5" />
                            </button> */}
                    </div>
                </div>
                    <div className="p-4">
                        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}...</p>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <span className="font-bold text-indigo-600">{product.price} FCFA</span>
                                {product.isDiscount && <span className="ml-2 text-gray-400 line-through">12900 FCFA</span>}
                            </div>
                            <div className="flex text-yellow-400">
                                <Star className="h-5 w-5" />
                                <Star className="h-5 w-5" />
                                <Star className="h-5 w-5" />
                                <Star className="h-5 w-5" />
                                <StarHalf className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
            </div>
  )
}
