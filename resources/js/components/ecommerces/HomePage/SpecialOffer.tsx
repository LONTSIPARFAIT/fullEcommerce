import { Link } from "@inertiajs/react";
import { Heart, Search, ShoppingCart, Star, StarHalf } from "lucide-react";


export default function SpecialOffer() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="container flex justify-between items-center mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Special Offers</h2>
          <Link prefetch href="#" className="text-indigo-600 hover:text-indigo-800">View All</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Discount Product Card 1 */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="relative">
                    <img src="./images/p-1.png" alt="Product 1" className="h-64 w-full object-cover" />
                    <div className="absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">-30%</div>
                    <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        {/* <div className="mb-3 flex items-center text-sm text-gray-500"> */}
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <ShoppingCart className="h-5 w-5" />
                            </button>
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Heart className="h-5 w-5" />
                            </button>
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Search className="h-5 w-5" />
                            </button>
                        {/* </div> */}
                    </div>
                </div>
                    <div className="p-4">
                        <h3 className="font-medium text-lg mb-2">Leather Backpack</h3>
                        <p className="text-gray-600 text-sm mb-3">Stylish and durable everday bag.</p>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <span className="font-bold text-indigo-600">65000 FCFA</span>
                                <span className="ml-2 text-gray-400 line-through">100000 FCFA</span>
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
            {/* Discount Product Card 1 */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="relative">
                    <img src="./images/p-1.png" alt="Product 1" className="h-64 w-full object-cover" />
                    <div className="absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">-30%</div>
                    <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        {/* <div className="mb-3 flex items-center text-sm text-gray-500"> */}
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <ShoppingCart className="h-5 w-5" />
                            </button>
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Heart className="h-5 w-5" />
                            </button>
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Search className="h-5 w-5" />
                            </button>
                        {/* </div> */}
                    </div>
                </div>
                    <div className="p-4">
                        <h3 className="font-medium text-lg mb-2">Leather Backpack</h3>
                        <p className="text-gray-600 text-sm mb-3">Stylish and durable everday bag.</p>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <span className="font-bold text-indigo-600">65000 FCFA</span>
                                <span className="ml-2 text-gray-400 line-through">100000 FCFA</span>
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
            {/* Discount Product Card 3 */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="relative">
                    <img src="./images/p-1.png" alt="Product 1" className="h-64 w-full object-cover" />
                    <div className="absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">-30%</div>
                    <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        {/* <div className="mb-3 flex items-center text-sm text-gray-500"> */}
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <ShoppingCart className="h-5 w-5" />
                            </button>
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Heart className="h-5 w-5" />
                            </button>
                            <button className="mx-2 bg-white rounded-full p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                                <Search className="h-5 w-5" />
                            </button>
                        {/* </div> */}
                    </div>
                </div>
                    <div className="p-4">
                        <h3 className="font-medium text-lg mb-2">Leather Backpack</h3>
                        <p className="text-gray-600 text-sm mb-3">Stylish and durable everday bag.</p>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <span className="font-bold text-indigo-600">65000 FCFA</span>
                                <span className="ml-2 text-gray-400 line-through">100000 FCFA</span>
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
        </div>
      </div>
    </div>
  );
}
