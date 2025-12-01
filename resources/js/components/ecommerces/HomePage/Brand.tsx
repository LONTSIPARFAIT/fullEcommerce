import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Brand() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Our Brands
        </h2>

        <div className="swiper brand-slider">
          <div className="swiper-wrapper items-center">
            <Swiper
              modules={[ Navigation, Pagination, Autoplay ]}
              spaceBetween={0}
              slidesPerView={5}
            //   navigation
              pagination={{ clickable: true }}
            //   scrollbar={{ draggable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="swiper-wrapper items-center"
            >
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-1.jpg" alt="Brand Logo 1" className="max-h-16" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-2.png" alt="Brand Logo 2" className="max-h-16" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-3.jpeg" alt="Brand Logo 3" className="max-h-16" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-4.png" alt="Brand Logo 4" className="max-h-16" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-5.png" alt="Brand Logo 5" className="max-h-16" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-6.png" alt="Brand Logo 6" className="max-h-16" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-7.jpg" alt="Brand Logo 7" className="max-h-16" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiper-slide p-4 text-center'>
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                        <img src="./images/b-8.png" alt="Brand Logo 8" className="max-h-16" />
                    </div>
                </SwiperSlide>
            </Swiper>
          </div>
          {/* <div className="swiper-pagination "></div> */}
        </div>
      </div>
    </div>
  );
}
