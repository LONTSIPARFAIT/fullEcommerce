import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper } from 'swiper/react';

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
          <div className="">
            <Swiper
              modules={[ Navigation, Pagination, Scrollbar, Autoplay ]}
              spaceBetween={0}
              slidesPerView={5}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="swiper-wrapper items-center"
            ></Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
