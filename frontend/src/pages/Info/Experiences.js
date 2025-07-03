import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Footer from "../../components/Footer";

const Experiences = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const dispatch = useDispatch();
  const { loading, portfolioData, error } = useSelector(
    (state) => state.root || {}
  );
  const { experiences } = portfolioData || {};

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    setTimeout(() => {
      Aos.init({ duration: 1000, once: true });
      Aos.refresh();
    }, 100);
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-between">
      <div>
        <SectionTitle title="Experience" />
        <div className="flex sm:flex-col sm:text-xl lg:px-40 md:px-24  sm:px-4  font-poppins">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-2 py-8 mt-12 sm:mt-4 space-y-5 sm:space-y-0 flex-1 sm:overflow-x-scroll sm:scrollbar-hide sm:whitespace-nowrap sm:w-full ">
            {experiences.map((experience, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(index)}
                className={`cursor-pointer px-3 py-2 ${
                  selectedItemIndex === index
                    ? "text-secondary border-l-2 border-secondary hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-200 ease-in-out"
                    : "text-white items-center font-semibold text-transparent bg-clip-1 hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 ease-in-out"
                }`}
              >
                <h2 className="sm:text-xl lg:text-2xl sm:gap-2 sm:flex-row hover:from-secondary hover:via-purple-400 hover:to-secondary transition-all duration-300 ease-in-out">
                  {experience.period}
                </h2>
              </div>
            ))}
          </div>

        <div
            className={`flex-1 text-left leading-relaxed text-base max-w-xl mx-auto px-4 md:px-1 lg:mt-12 sm:mt-10 md:mt-12 lg:mb-12 sm:text-2xl shadow sm:p-0 sticky top-40 right-[370px]  md:right-[1px] md:pr-16 md:px-1 sm:px-0 lg:my-5 sm:my-1 ${
              selectedItemIndex === 0
                ? "shiny-border border-2"
                : "shiny-border border-l-2 border-b-2"
            }`}
            data-aos="fade-down"
            key={`details-${selectedItemIndex}`}
            style={{ backgroundColor: "transparent" }}
           >
            {experiences[selectedItemIndex] && (
              <div className="p-6 md:p-6 rounded-lg shadow-lg text-white sm:text-1xl md:w-[500px] ">
                <h2
                  className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-l from-blue-900 via-red-900 to-secondary font-bold sm:text-2xl lg:mb-12 sm:mb-6"
                  data-aos="fade-down"
                  data-aos-delay="600"
                >
                  {experiences[selectedItemIndex].company}
                </h2>
                <h3
                  className="text-2xl sm:text-xl mb-3 font-semibold sm:text-1xl"
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  {experiences[selectedItemIndex].title}
                </h3>
                <p
                  className="text-lg sm:w-full sm:text-1xl"
                  data-aos="fade-down"
                  data-aos-delay="390"
                >
                  {experiences[selectedItemIndex].description}
                </p>
                <p className="text-lg text-white sm:text-1xl">
                  {experiences[selectedItemIndex].links}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Experiences;
