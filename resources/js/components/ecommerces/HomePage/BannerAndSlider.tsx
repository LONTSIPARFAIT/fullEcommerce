
export default function BannerAndSlider() {
   return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
            {/* Left Slide Swipper slider */}
            <div className="w-full lg:w-3/4 px-4 mb-8 lg:mb-0">
                <div className="swiper main-slider rounded-lg"></div>
            </div>
        </div>
    </div>
    )
}
