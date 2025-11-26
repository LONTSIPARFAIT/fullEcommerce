import { Link } from '@inertiajs/react'
import { Calendar, User } from 'lucide-react'
import React from 'react'

export default function Blog()  {
  return (
    <div className='bg-gray-50 py-12'>
        <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
                <h2 className='text-2xl font-bold'>Latest Blog Posts</h2>
                <Link prefetch href="#" className='text-indigo-600 hover:text-indigo-800'>View All</Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Blog Card 1 */}
                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <img src="./images/blog-1.jpg" alt="Blog 1" className="h-48 w-full object-cover" />
                    <div className="p-6">
                        <div className="mb-3 flex items-center text-sm text-gray-500">
                            <Calendar className='h-5 w-5 mr-2' />
                            <span>April 12, 2025</span>
                            <span className="mx-2">|</span>
                            <User className='h-5 w-5 mr-2' />
                            <span className="mx-2">Admin</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">10 Must-Have Tech Gadgets for 2025</h3>
                        <p className="text-gray-600 mb-4">Discover the latest tech innovations that are changing the game in 2025 and beyond .</p>
                        <Link prefetch href="#" className='text-indigo-600 hover:text-indigo-800 font-medium'>Read More</Link>
                    </div>
                </div>
                {/* Blog Card 2 */}
                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <img src="./images/blog-2.jpg" alt="Blog 2" className="h-48 w-full object-cover" />
                    <div className="p-6">
                        <div className="mb-3 flex items-center text-sm text-gray-500">
                            <Calendar className='h-5 w-5 mr-2' />
                            <span>April 10, 2025</span>
                            <span className="mx-2">|</span>
                            <User className='h-5 w-5 mr-2' />
                            <span className="mx-2">Admin</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">How to Choose the Perfect HeadPhones</h3>
                        <p className="text-gray-600 mb-4">A comprehensive guide to finding headphones that match your lifestyles and preferences.</p>
                        <Link prefetch href="#" className='text-indigo-600 hover:text-indigo-800 font-medium'>Read More</Link>
                    </div>
                </div>
                {/* Blog Card 3 */}
                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <img src="./images/blog-3.jpg" alt="Blog 3" className="h-48 w-full object-cover" />
                    <div className="p-6">
                        <div className="mb-3 flex items-center text-sm text-gray-500">
                            <Calendar className='h-5 w-5 mr-2' />
                            <span>April 8, 2025</span>
                            <span className="mx-2">|</span>
                            <User className='h-5 w-5 mr-2' />
                            <span className="mx-2">Admin</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">The Rize of Smart Home Devices</h3>
                        <p className="text-gray-600 mb-4">Explore how smart home technology is transforming the way we live and interact with our spaces.</p>
                        <Link prefetch href="#" className='text-indigo-600 hover:text-indigo-800 font-medium'>Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
