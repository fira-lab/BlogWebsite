import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Default number of slides to show
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "10",
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 100, // For large screens and above
      settings: {
        slidesToShow: 3, // Show 3 slides
      },
    },
    {
      breakpoint: 1400, // For medium screens
      settings: {
        slidesToShow: 1, // Show 1 slide
      },
    },
  ],
};

const Testimonials = () => {
  const dispatch = useDispatch();
  const { portfolioData, isLoading } = useSelector((state) => state.root || {});
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const { about } = portfolioData || {};
  const { profile } = about || {};

  const handleImage = () => {
    setIsProfileLoading(false);
  };

  return (
    <div className=" mx-auto px-6 py-12 sm:px-1">
      <Slider {...settings}>
        {profile.map((testimonial, index) => (
          <div key={index} className="p-5 sm:pt-6">
            <div className="testimonial-card bg-white rounded-lg shadow-lg p-2 sm:p-2 flex flex-col items-center text-center transform transition-transform duration-500 ease-in-out hover:scale-105 md:hover:scale-100">
              {isProfileLoading && <Loader />}
              <img
                src={testimonial.image}
                onLoad={handleImage}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4 sm:w-20 sm:h-20 md:w-30 md:h-30 object-cover shadow-md"
              />
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 sm:text-xl sm:mb-1">
                {testimonial.name}
              </h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-l from-blue-700 via-pink-900 to-secondary mb-4 sm:text-4xl shiny-text mb-4 sm:text-base sm:mb-2">
                {testimonial.role}
              </p>
              <p className="text-gray-700 text-base sm:text-sm italic px-4 py-2 border-l-4 border-secondary">
                &ldquo;{testimonial.feedback}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
