import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderGallery({ images }) {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className="mt-8 bg-panel rounded-xl p-2 shadow-token">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2 group">
            <div className="relative rounded-xl overflow-hidden shadow-token transition-all duration-500">
              {/* Image */}
              <img
                src={img}
                alt="team portfolio"
                className="h-64 w-full object-cover rounded-xl group-hover:scale-[1.05] transition-all duration-700"
              />

              {/* Optional accent glow on hover */}
              <div className="absolute inset-0 rounded-xl pointer-events-none group-hover:shadow-[0_0_25px_6px_rgb(var(--accent-500)/0.25)] transition-shadow duration-500"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
