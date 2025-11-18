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
    <div className="mt-8">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2">
            <img
              src={img}
              alt="team portfolio"
              className="h-64 w-full object-cover rounded-xl shadow-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
