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
                </Swiper>
            </div>

            {/* Right Side Cards */}
        </div>
    </div>
    )
}
