import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "aos/dist/aos.css";
import AOS from "aos";
import Typewriter from "typewriter-effect";
import Loader from "../../components/Loader";
import ShinyText from "../../components/ShinyText";
import ChatbotComponent from "./ChatbotComponent";
import Footer from "../../components/Footer";
import NoConnection from "./NoConnection";

const Introduction = () => {
  const dispatch = useDispatch();
  const { loading, getData, error } = useSelector(
    (state) => state.auth || {}
  );
  const { intro } = getData || {};
  const {
    welcomeText,
    firstName,
    lastName,
    Hire,
    welcomeText2,
    emoji,
    roles,
    image,
    cv_link,
  } = intro || {};

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [buttonText, setButtonText] = useState(Hire);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEmojiVisible, setIsEmojiVisible] = useState(true);
  const [buttonClass, setButtonClass] = useState(
    "mt-10 sm:mt-2 px-10 sm:px-6 py-3 text-lg lg:text-xl sm:text-sm border-2 border-secondary rounded-lg shadow-lg hover:bg-secondary hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
  );
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [buttonText]);

  useEffect(() => {
    const handleOffline = () => setIsOnline(false);

    const handleOnline = () => setIsOnline(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOnline) {
    return <NoConnection />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!getData || !intro) {
    return <div>No portfolio data found</div>;
  }

  const handleIntro = () => {
    setIsImageLoading(false);
  };

  const handleButtonClick = () => {
    setButtonText(
      <div className="flex items-center hover:bg-transparent bg-gray-500">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
          ></path>
        </svg>
        Processing...
      </div>
    );
    setIsButtonDisabled(true);
    setButtonClass(
      "mt-10 sm:mt-2 px-10 sm:px-6 py-3 text-lg lg:text-xl sm:text-sm border-2 border-secondary rounded-lg shadow-lg bg-transparent text-secondary transition duration-300 ease-in-out transform hover:scale-105"
    );

    setTimeout(() => {
      setButtonText(Hire);
      setIsButtonDisabled(false);
      setButtonClass(
        "mt-10 sm:mt-2 px-10 sm:px-6 py-3 text-lg lg:text-xl sm:text-sm border-2 border-secondary rounded-lg shadow-lg hover:bg-secondary hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
      );
    }, 3000);
  };

  const handleError = () => {
    setIsEmojiVisible(false);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-between">
      <ChatbotComponent />
      {isImageLoading && <Loader />}
      <div className="w-full flex flex-col lg:flex-row-reverse md:flex-row sm:flex-col-reverse sm:w-full relative z-10 ">

        <div className="lg:w-2/4 sm:w-full md:w-2/5 md:full lg:justify-start sm:justify-center p-5 md:p-0 sm:p-3 flex  md:absolute md:top-[100px] md:right-[2px] md:h-[500px] md:w-[450px] sm:mt-[-125px] ">
          <img
            src={image}
            className="mt-20 sm:mt-0 h-[600px] w-[2500px] sm:h-3/4 sm:full md:h-[620px] md:w-[1000px]   md:h-auto shadow-2xl rounded-[28%] transform transition duration-500 hover:scale-105"
            data-aos-delay="800"
            onLoad={handleIntro}
          />
        </div>

        <div className="lg:w-2/4 sm:w-full md:w-3/5 w-full  h-screen md:h-full flex flex-col items-start justify-center text-left p-5 lg:pl-[210px] md:pl-2 sm:px-5 font-poppins text-white md:absolute md:top-[370px] md:left-[50px] md:ml-10 md:mt-10 sm:transform sm:-translate-y-24 ">
          <p
            className="text-lg lg:text-4xl  sm:text-4xl md:text-4xl mb-4 sm:mb-2 flex items-center space-x-2"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span >{welcomeText}</span>
            {isEmojiVisible && (
              <img
                src={emoji}
                alt="."
                className="ml-2 h-12 w-12 sm:h-10 sm:w-10"
                onError={handleError}
              />
            )}
            <span>{welcomeText2}</span>
          </p>
          <p
            className="relative text-4xl lg:text-7xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-red-900 to-secondary mb-4 sm:mb-2 sm:text-8xl shiny-text"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <ShinyText text={`${firstName} ${lastName}`} />
          </p>
          <div
            className="mb-4 md:text-2xl lg:text-4xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            data-aos="fade-up"
            data-aos-delay="750"
          >
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: roles,
              }}
            />
          </div>
          <a href={cv_link} download="Firaol Terefe CV.pdf">
            <button
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
              className={buttonClass}
              data-aos="fade-up"
              data-aos-delay="800"
            >
              {buttonText}
            </button>
          </a>
        </div>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Introduction;
