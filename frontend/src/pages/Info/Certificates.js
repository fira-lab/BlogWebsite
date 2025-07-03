import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import PageMenu from "../../components/pageMenu/PageMenu";

const Certificates = () => {
  const dispatch = useDispatch();
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isCertificateLoading, setIsCertificateLoading] = useState(true);

  // Destructure info from state
  const { info, isLoading } = useSelector((state) => state.auth || {});

  useEffect(() => {
    console.log("Dispatching getData...");
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    console.log("useEffect is running...");
  }, []);
  console.log(info);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    setIsCertificateLoading(true); // Reset loader when changing certificates
  };

  const handleCertificateLoad = () => {
    setIsCertificateLoading(false);
  };

  // Ensure info is defined and has certificates
  const {certificates }= info || {};
  console.log(info);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-900 via-pink-500 via-blue-900 via-purple-500 to-blue-900">
      <SectionTitle title="Certificates" />
      <PageMenu />

      {isLoading && <Loader />}

      <div className="flex sm:flex-col sm:text-1xl font-poppins lg:px-40 md:px-24 sm:px-4">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-2 border-1-2 border-[#f97316] py-8 mt-12 sm:mt-4 space-y-5 sm:space-y-0 flex-1 sm:overflow-x-scroll sm:scrollbar-hide sm:whitespace-nowrap sm:w-full md:pr-5">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(index)}
              className={`cursor-pointer px-3 py-2 ${
                selectedItemIndex === index
                  ? "text-secondary border-l-2 border-secondary"
                  : "text-white"
              } whitespace-normal sm:whitespace-nowrap sm:flex sm:items-center`}
            >
              <h2 className="sm:text-1xl text-2xl sm:gap-1 font-semibold sm:text-xl">
                {certificate.title}
              </h2>
            </div>
          ))}
        </div>

        <div
          className="flex-1 flex-col gap-5 px-6 md:px-0 lg:mt-20 shadow shiny-border2 border-l-2 border-b-2 inline-block sm:p-2 h-80 sm:h-40 mb-5 lg:sticky lg:top-40 sm:top-5 md:top-80"
          data-aos="fade-right"
          key={`details-${selectedItemIndex}`}
        >
          {certificates[selectedItemIndex] && (
            <div className="p-6 md:p-4 rounded-lg shadow-lg text-white">
              <p
                className="text-3xl mb-4 text-secondary font-bold"
                data-aos="fade-down"
                data-aos-delay="800"
              >
                {certificates[selectedItemIndex].title}
              </p>
              <p
                className="text-xl md:text-sm mb-3 font-poppins sm:text-base"
                data-aos="fade-down"
                data-aos-delay="600"
              >
                {certificates[selectedItemIndex].description}
              </p>
              <p
                className="text-xl mb-3 font-poppins text-blue-500"
                data-aos="fade-down"
                data-aos-delay="400"
              >
                <a
                  href={certificates[selectedItemIndex].link}
                  className="inline-flex items-center font-semibold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 via-red-500 to-pink-500 bg-clip-text ease-in-out hover:underline hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 ease-in-out hover:underline sm:mt-1"
                  alt={`Visit ${certificates[selectedItemIndex].title}`}
                >
                  Certificate Id
                  <svg
                    className="w-5 h-5 ml-2 rtl:rotate-180 transition-transform duration-300 ease-in-out"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="#3b82f6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </p>
            </div>
          )}
        </div>
        <div>
          {isCertificateLoading && <Loader />}
          {certificates[selectedItemIndex] && (
            <img
              src={certificates[selectedItemIndex].image}
              alt=""
              className="lg:mt-20 lg:h-80 lg:w-90 sm:h-60 sm:left-10 sm:w-72 sm:mt-10 sm:mb-12 md:w-full sticky md:top-80 lg:top-40 sm:top-40"
              data-aos="fade-down"
              key={`details-${selectedItemIndex}`}
              onLoad={handleCertificateLoad}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
