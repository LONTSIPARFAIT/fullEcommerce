
// import swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

import { delay } from "framer-motion";

export default function BannerAndSlider() {
   return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
            {/* Left Slide Swipper slider */}
            <div className="w-full lg:w-3/4 px-4 mb-8 lg:mb-0">
                <Swiper
                  module={Navigation, Pagination, Scrollbar, Autoplay}
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
                        <img src="./images/banner-1.png" alt="Banner 1" className="w-full h-64 object-cover rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/banner-2.png" alt="Banner 2" className="w-full h-64 object-cover rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./images/banner-3.png" alt="Banner 3" className="w-full h-64 object-cover rounded-lg" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
    )
}
