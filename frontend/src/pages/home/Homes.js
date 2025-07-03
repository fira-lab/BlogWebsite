import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OIPr from "../../assets/OIPr.png";
import what from "../../assets/what.png";
import nice from "../../assets/nice.png";
import hellowfira from "../../assets/hellowfira.png";
import online from "../../assets/online.png";
import dones from "../../assets/dones.png";
import Fira3 from "../../assets/Fira3.png";
import "aos/dist/aos.css";

import AOS from "aos";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div>
      {/* Introduction Section */}
      <section className="h-[670px] sm:h-[670px] ipr:h-[770px] ip:h-[720px] smm:h-[670px] md:h-[500px] sd:h-[770px] df:h-[675px] lg:p-16 md:pr-0 sm:p-8 p-4 flex flex-col justify-between items-center font-poppins bg-black text-black ">
        <div className="flex flex-row sm:flex-col w-full h-full mt-16 sm:mt-10 md:mt-[-60px]">
          <div className="w-1/2 md:w-3/4 sm:w-full flex flex-col justify-center">
            <h1
              className="text-5xl sm:text-5xl md:text-7xl ipr:text-6xl lg:text-8xl text-black font-bold mb-6 md:mt-40 md:mb-0 df:text-6xl"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              Welcome to the EagleDemy! 🦅
            </h1>
            <p
              className="text-2xl md:text-3xl lg:text-5xl ipr:text-4xl mb-0 mt-24 md:mt-9 sm:text-2xl sm:mt-4 text-black"
              data-aos="fade-down"
              data-aos-delay="800"
            >
              Unlock free certificates, courses, and valuable info on top
              educational platforms. Secure your future with knowledge today!
            </p>
            <p
              className="text-2xl md:text-3xl lg:text-4xl mb-2 mt-24 md:mt-12 sm:text-2xl sm:mt-4 text-black"
              data-aos="fade-down"
              data-aos-delay="800"
            >
              With Expert <span className="font-bold">Firaol Terefe.</span>
            </p>
            <div className="flex space-x-6 mt-10">
              <Link to="/register">
                <button
                  className="px-6 py-3 sm:px-3 sm:py-2 sm:text-1xl bg-green-600 text-black font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105"
                  // data-aos="fade-up"
                  // data-aos-delay="700"
                >
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="px-6 py-3 sm:px-3 sm:py-2 sm:text-1xl bg-blue-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
                  // data-aos="fade-up"
                  // data-aos-delay="700"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className=" w-1/2 md:w-15/40 sm:w-full h-full lg:pr-0 sm:pr-4 sm:w-full sm:h-full md:h-full md:mt-40 ipr:mt-[23px] smm:mb-[-20px] md:w-full flex items-end justify-center sm:mt-16">
            <div className="relative">
              <img
                className=" w-full h-full object-cover transition-transform transform hover:scale-105"
                src={Fira3}
                alt="Auth"
              />
              <div className="absolute inset-1  opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        className="lg:p-16 md:p-12 text-black sm:p-8 p-4 flex flex-row sm:flex-col mt-12 font-poppins bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500

"
      >
        <div className="h-full w-full flex flex-row sm:flex-col">
          <div className="text-xl w-1/2 md:w-3/4 sm:w-full">
            <p
              className="text-5xl sm:text-3xl md:text-5xl lg:text-6xl text-black font-bold"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              Why Choose Firaol and EagleDemy?
            </p>
            <p
              className="text-2xl text-black md:text-3xl lg:text-4xl sm:text-2xl mb-6 font-bold mt-6"
              data-aos="fade-down"
              data-aos-delay="800"
            >
              Intensive Projects with 2FA and Other Key Projects Experience
            </p>
            <p className="text-xl md:text-2xl text-black lg:text-3xl sm:text-2xl ">
              <span
                className="font-semibold"
                data-aos="fade-right"
                data-aos-delay="700"
              >
                Proven Expertise:{" "}
              </span>
              Firaol’s experience is built on countless hours of work, tackling
              real-world challenges from advanced machine learning to
              cutting-edge cybersecurity.
              <br />
              <span
                className="font-semibold mt-4 "
                data-aos="fade-right"
                data-aos-delay="700"
              >
                A Mentor Who Understands:{" "}
              </span>
              Firaol knows what it takes to succeed, and he’s here to help you
              avoid the pitfalls and speed up your learning journey.
              <br />
              <span
                className="font-semibold mt-4"
                data-aos="fade-right"
                data-aos-delay="700"
              >
                Learn from the Best:{" "}
              </span>
              When you learn with Firaol, you gain insights that come from
              experience, not just theory. His projects have been recognized for
              their creativity and innovation, and he’s ready to share that
              knowledge with you.
            </p>
          </div>
          <div className=" w-1/2 md:w-15/40 sm:w-full h-full lg:pr-0 sm:pr-4 sm:w-full sm:h-full md:h-full md:mt-40 ipr:mt-[23px] smm:mb-[-20px] md:w-full flex items-end justify-center sm:mt-16">
            <div className="relative">
              <img
                className=" w-full h-full object-cover lg:p-16 sm:p-0 transition-transform transform hover:scale-105"
                src={nice}
                alt="Auth"
              />
              <div className="absolute inset-1  opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="lg:p-16 md:p-12 text-black sm:p-8 p-4 flex flex-row sm:flex-col-reverse mt-12 font-poppins bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
"
      >
        <div
          className="w-1/2 md:w-2/5 h-[500px] lg:pr-40 sm:w-full sm:pr-4 sm:h-[300px] md:h-full md:w-[500px]"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          <img
            className="w-full h-full object-cover rounded-lg"
            src={dones}
            alt="Auth"
          />
        </div>
        <div className="text-xl w-1/2 sm:w-full">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl sm:text-4xl text-black font-bold mb-4"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            What You Can Expect from Learning with Firaol{" "}
          </h2>
          <p
            className="text-2xl md:text-3xl lg:text-4xl sm:text-2xl text-black  mb-6"
            data-aos="fade-down"
            data-aos-delay="800"
          >
            Master Job Demanding Courses:
          </p>
          <p
            className="text-xl md:text-2xl lg:text-3xl space-y-8 sm:text-2xl  text-black"
            data-aos="fade-down"
            data-aos-delay="900"
          >
            <span className="mt-[20px]">
              <span className="font-semibold">Master Machine Learning:</span>
              Get hands-on experience with advanced algorithms and techniques
              that will make you a standout in the field of AI and data science.
            </span>
            <br />
            <span className="mt-[20px]">
              <span className="font-semibold">Full-Stack Development:</span>{" "}
              Learn how to build powerful web applications from scratch,
              mastering both front-end and back-end technologies under Firaol’s
              guidance.
            </span>
            <br />
            <span className="mt-[20px]">
              <span className="font-semibold">Advanced Security Skills: </span>
              Understand the intricacies of cybersecurity, from protecting
              against phishing to implementing cutting-edge defenses like XSS
              protection.
            </span>
            <br />
            <span className="mt-[20px]">
              <span className="font-semibold">Build Chatbots & More: </span>
              Develop smart chatbots and other AI-driven solutions, gaining
              skills that are highly sought after in today’s tech market etc...{" "}
            </span>
          </p>
        </div>
      </section>

      {/* How It Works Section */}

      <section
        className="lg:p-16 md:p-12 text-black  sm:p-8 p-4 flex flex-row sm:flex-col mt-12 font-poppins bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500

"
      >
        <div className="h-full w-full flex flex-row sm:flex-col">
          <div className="text-xl w-1/2 md:w-3/4 sm:w-full">
            <p
              className="text-5xl sm:text-4xl md:text-6xl lg:text-6xl  text-black font-bold"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              Benefits You Will Get from Learning with Firaol
            </p>
            <p
              className="text-2xl text-black md:text-3xl lg:text-4xl text-black sm:text-2xl mb-6 mt-12"
              data-aos="fade-down"
              data-aos-delay="650"
            >
              <span className="text-black font-semibold sm:text-2xl">
                "Career-Boosting Knowledge:"
              </span>
              With a mentor who has earned multiple accolades for his
              exceptional work, you’ll gain insights that can elevate your
              professional profile, making you a highly sought-after expert in
              your domain.
            </p>
            <p className="text-xl md:text-2xl text-black lg:text-3xl mb-8 sm:text-2xl">
              <span className="text-black font-semibold">
                "Personalized Learning Journey:"
              </span>
              Firaol understands that each learner is unique, and his platform
              is designed to adapt to your needs, providing tailored guidance to
              ensure you reach your goals faster.
              <br />
              <span className="text-black font-semibold">
                "Increased Confidence:"
              </span>{" "}
              As you master complex concepts under Firaol’s mentorship, your
              confidence will soar, allowing you to tackle challenges with ease
              and secure your place as an industry leader.
              <br />
            </p>
          </div>
          <div className="w-1/2   md:w-2/5 h-[500px] lg:pr-0 sm:w-full sm:pr-4 sm:h-full md:h-full  md:w-full md:mt-80 ">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={hellowfira}
              alt="Auth"
            />
          </div>
        </div>
      </section>

      {/* Identity Protection Section */}

      <section className="lg:p-16 md:pl-12 text-black sm:p-8 p-4 flex flex-row sm:flex-col-reverse mt-12 font-poppins bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div
          className="w-1/2 md:w-1/2 h-[500px] lg:pr-40 sm:w-full sm:h-[300px] sm:pr-4 md:h-[250px] md:w-full md:mt-28"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <img
            className="w-full h-2.5/4 object-cover rounded-lg"
            src={what}
            alt="Auth"
          />
        </div>
        <div className="text-xl w-1/2 sm:w-full">
          <h2
            className="text-4xl md:text-5xl sm:text-4xl text-black lg:text-6xl font-bold mb-4 mt-[40px]"
            data-aos="fade-down"
            data-aos-delay="700"
          >
            Developed by Firaol Terefe
          </h2>

          <p className="text-xl md:text-2xl lg:text-3xl space-y-8 text-black sm:text-2xl">
            <span data-aos="fade-down" data-aos-delay="500">
              This platform features state-of-the-art Two-Factor Authentication
              (2FA), built from scratch by Firaol, reducing unauthorized access
              attempts by an astounding 98%.
            </span>
            <br />
            <span
              className="mt-[20px] sm:text-2xl"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              With advanced encryption techniques, the system prevents data
              breaches by over 95%, ensuring your information remains safe and
              secure.
            </span>
            <br />
            <span
              className="mt-[20px] sm:text-2xl"
              data-aos="fade-down"
              data-aos-delay="700"
            >
              The built-in chatting system not only allows seamless interaction
              but also safeguards against phishing attacks, minimizing risk by
              up to 90%.
              <br />
              <span
                className="text-black sm:text-2xl font-bold"
                data-aos="fade-down"
                data-aos-delay="800"
              >
                A perfect blend of security and engagement, protecting users
                with unmatched efficiency!
              </span>
            </span>
          </p>
          <div className="mt-8">
            <span
              className="text-lg text-black font-semibold"
              data-aos="fade-up"
              data-aos-delay="900"
            >
              Contact Firaol to integrate these groundbreaking features into
              your project!
            </span>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section
        className="lg:p-16 md:p-12 text-black sm:p-8 p-4 flex flex-col items-center mt-12 font-poppins bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400
"
      >
        <h2
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-black font-bold"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Seize This Opportunity with Firaol's Expertise{" "}
        </h2>

        <Link to="/register">
          <button className="px-6 py-3  sm:px-3 sm:py-2 sm:text-1xl bg-green-600 text-black font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
