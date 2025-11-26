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
                    <img src="./images/blog-1.jpg" alt="Blog" className="h-48 w-full object-cover" />
                    <div className="p-6">
                        <div className="mb-3 flex items-center text-sm text-gray-500">
                            <Calendar className='h-5 w-5 mr-2' />
                            <span>April 12, 2025</span>
                            <span className="mx-2">|</span>
                            <User className='h-5 w-5 mr-2' />
                            <span className="mx-2">Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
