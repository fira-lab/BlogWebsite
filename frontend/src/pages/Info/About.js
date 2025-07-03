import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SectionTitle from "../../components/SectionTitle";
import "aos/dist/aos.css";

import AOS from "aos";
import Loader from "../../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/Footer";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAboutLoading, setIsAboutLoading] = useState(true);
  const skillsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/getData");
        setAboutData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          toast.info("Hover over or click on the icons to explore more!", {
            autoClose: 10000,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const { about } = aboutData || {};
  const {
    lottilesUrl,
    description1,
    description1B,
    span1A,
    span1B,
    span1C,
    span1D,
    description1C,
    description1D,
    description2,
    span2A,
    span2B,
    span2C,
    span2D,
    description2B,
    description2C,
    description2D,
    Mytitle,
    Skills,
    clientFeedback,
  } = about || {};

  const skills = Skills?.map((skill) => ({
    alt: `${skill.name}.logo`,
    img: skill.imageUrl,
    percentage: skill.proficiency,
  })) || [];

  return (
    <div className=" bg-black">
      <SectionTitle title="About" />
      <ToastContainer />

      <div className="flex w-full items-center sm:flex-col-reverse md:flex-col-reverse">
        <div
          className="h-[70vh] w-1/2 sm:w-full duration-700 lg:px-20 md:w-full md:h-[500px] sm:px-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <dotlottie-player
            src={lottilesUrl}
            background="transparent"
            speed="1"
            autoplay
            loop
          ></dotlottie-player>
        </div>
        <div className="flex flex-col text-base mt-16 gap-5 w-3/4 sm:w-full sm:mt-3 lg:px-20 md:w-full md:pl-40 sm:px-6 sm:pl-5 sm:w-full font-poppins">
          <p className="text-white text-xl sm:text-base tracking-normal tracking-wider" data-aos="fade-down" data-aos-delay="180">
            <span>{description1}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span1A}</span>
            <span>{description1B}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span1B}</span>
            <span>{description1C}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span1C}</span>
            <span>{description1D}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span1D}</span>
          </p>

          <p className="text-white text-xl sm:text-base" data-aos="fade-up" data-aos-delay="200">
            <span>{description2}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span2A}</span>
            <span>{description2B}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span2B}</span>
            <span>{description2C}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span2C}</span>
            <span>{description2D}</span>
            <span className="italic text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:underline transition-all duration-300">{span2D}</span>
          </p>
        </div>
      </div>
      <SectionTitle title={Mytitle} />

      <div className="flex flex-wrap sm:pl-[75px] sm:pr-1 lg:px-40 md:pl-30 md:pr-10" ref={skillsRef}>
        {skills.map((skill, index) => {
          const fadeDirection = index % 2 === 0 ? "fade-down" : "fade-up";
          return (
            <div key={index} data-aos={fadeDirection}>
              {/* Render skill component here */}
            </div>
          );
        })}
      </div>
      <div className="px-20 md:pr-[50px] md:pl-[110px] sm:px-8 mt-12 bg-gray-500">
        <SectionTitle title={clientFeedback} />
      </div>

      <Footer />
    </div>
  );
};

export default About;
