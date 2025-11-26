// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Link } from "@inertiajs/react";
// import { delay } from "framer-motion";

export default function BannerAndSlider() {
   return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
            {/* Left Slide Swipper slider */}
            <div className="w-full lg:w-3/4 px-4 mb-8 lg:mb-0">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar= {{ draggable: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="main-slider overflow-hidden rounded-lg shadow-lg"
                >
                    <SwiperSlide>
                        <div className="relative h-96">
                            <img src="./images/banner-1.png" alt="Banner 1" className="w-full h-full object-cover" />
                            <div className="bg-opacity-40 absolute inset-0 flex flex-col justify-center px-12">
                                <h2 className="mb-4 text-4xl font-bold text-white">Summer Collection</h2>
                                <p className="mb-6 text-lg text-white">Up to 50% off on seleted items</p>
                                <Link
                                 href="#"
                                 className="inline-block max-w-xs rounded-md bg-indigo-600 px-6 py-3 text-center text-white transition duration-200 hover:bg-indigo-700">
                                    Show Now
                                 </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-96">
                            <img src="./images/banner-2.png" alt="Banner 2" className="w-full h-full object-cover" />
                            <div className="bg-opacity-40 absolute inset-0 flex flex-col justify-center px-12">
                                <h2 className="mb-4 text-4xl font-bold text-white">Summer Collection</h2>
                                <p className="mb-6 text-lg text-white">Up to 50% off on seleted items</p>
                                <Link
                                 href="#"
                                 className="inline-block max-w-xs rounded-md bg-indigo-600 px-6 py-3 text-center text-white transition duration-200 hover:bg-indigo-700">
                                    Show Now
                                 </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-96">
                            <img src="./images/banner-3.png" alt="Banner 3" className="w-full h-full object-cover" />
                            <div className="bg-opacity-40 absolute inset-0 flex flex-col justify-center px-12">
                                <h2 className="mb-4 text-4xl font-bold text-white">Summer Collection</h2>
                                <p className="mb-6 text-lg text-white">Up to 50% off on seleted items</p>
                                <Link
                                 href="#"
                                 className="inline-block max-w-xs rounded-md bg-indigo-600 px-6 py-3 text-center text-white transition duration-200 hover:bg-indigo-700">
                                    Show Now
                                 </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Right Side Cards */}
            <div className="w-full px-4 lg:w-1/4">
                <div className="relative mb-4 overflow-hidden rounded-lg bg-white shadow-sm">
                    <img src="./images/banner-4.jpg" alt="Promo" className='h-44 w-full object-cover' />
                    <div className="absolute top-0 right-0 rounded-bl-lg bg-red-500 px-3 py-1 text-white">-30%</div>
                    <div className="p-4">
                        <h3 className="mb-2 text-lg font-semibold">Flash Sale</h3>
                        <p className="mb-3 text-sm text-gray-600">Limited time offer on premium products</p>
                        <Link prefetch href="#" className='text-indigo-600 hover:text-indigo-800 text-sm font-medium' >
                            Shop Now
                        </Link>
                    </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm relative">
                    <img src="./images/kjmlkoo.jpg" alt="Promo" className='h-44 w-full object-cover' />
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg">New</div>
                    <div className="p-4">
                        <h3 className="mb-2 text-lg font-semibold">Flash Sale</h3>
                        <p className="mb-3 text-sm text-gray-600">Limited time offer on premium products</p>
                        <Link prefetch href="#" className='text-indigo-600 hover:text-indigo-800 text-sm font-medium' >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
