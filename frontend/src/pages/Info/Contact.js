import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./Container"; // Adjust the import path as needed
import ChatbotComponent from "./ChatbotComponent";
import { useDispatch, useSelector } from "react-redux";
import { FaGithubSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import { FiYoutube } from "react-icons/fi";

const Contact = () => {
  const { loading, portfolioData, error } = useSelector(
    (state) => state.root || {}
  );
  const { about } = portfolioData || {};
  const { lottilesUrl2, formUrl, WhatsUp, Linkedn, Github, youTubeUrl } = about;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [msg, setMsg] = useState("");
  const [isSendMessageLoading, setIsSendingMessageLoading] = useState(false);

  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const sendComment = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !subject || !message) {
      toast.error("All fields are required.");
      return;
    }

    if (!isEmailValid) {
      toast.error("Please enter a valid email.");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const url = `${formUrl}`;
    setIsSendingMessageLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Your message is sent successfully!", {
          autoClose: 10000,
        });
        toast.success("Success! Firaol will get back to you shortly.", {
          autoClose: 10000,
        });
        setMsg(
          "<span style='font-size: 24px; color: green; text-align: center; display: block;'>Success!</span>"
        );
        setFullName("");
        setEmail("");
        setSubject("");
        setMessage("");
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      if (!navigator.onLine) {
        toast.error("It seems you are offline. ");
        toast.error("Please check your internet connection and try again.");
        setMsg(
          "<span style='font-size: 18px; color: red; text-align: center; display: block;'>It seems you are offline. </span>"
        );
      } else {
        toast.error("Failed to send the message.");
        toast.error(" Please try again or use other contact methods.");
        setMsg(
          "<span style='font-size: 16px; color: red; text-align: center; display: block;'>Please try again or use other contact methods.</span>"
        );
      }
    } finally {
      setIsSendingMessageLoading(false);
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  };

  const handleChange = (setter) => (e) => {
    const { value, type } = e.target;
    setter(value);

    if (type === "email") {
      setIsEmailValid(emailPattern.test(value));
    }
  };

  return (
    <div className="relative z-10  flex flex-col justify-between min-h-screen relative ">
      <SectionTitle title="Contact" className="mb-12 sm:mb-12" />
      <ToastContainer />
      <div className="relative">
        {isSendMessageLoading && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <Loader />
          </div>
         )}

        <div className="mt-12 sm:mt-12 mbsm:mb-12 flex w-full sm:flex-col md:flex-col sm:px-1 relative z-10 py-1 bottom-20 right-7  md:top-[-20px]   ">
          <ChatbotComponent />
          <div
            className="h-[70vh] w-1/2 md:w-3/4 md:h-1/20 ip:h-1/40  sm:w-full duration-700 relative "
            data-aos="fade-down"
            data-aos-delay="400"
          >
            <script
              src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
              type="module"
            ></script>
            <dotlottie-player
              src={lottilesUrl2}
              background="transparent"
              speed="1"
              loop
              className="sm:absolute sm:left-[-100px] "
              autoplay
            ></dotlottie-player>
            <div className="absolute top-[410px] sm:top-[350px] left-[195px] right-0 bottom-5 sm:left-[190px] sm:right-6 sm:bottom-0 flex items-center justify-center md:absolute md:top-[520px] md:left-[240px] ip:left-[320px] ip:top-[670px] ipr:top-[360px] ipr:left-[209px] smm:top-[300px] smm:left-[170px] ip4:top-[600px] ip4:left-[300px]  ">
              <div className="flex items-center space-x-4">
                <a href={Linkedn} target="_blank" rel="noopener noreferrer">
                  <CiLinkedin className="text-black-400 hover:text-blue-700 ip:h-16 ip:w-16  lg:w-11 lg:h-11 sm:w-8 sm:h-8 hover:mb-1 transition-[margin-bottom] duration-300 ease-in-out" />
                </a>
                <a href={Github} target="_blank" rel="noopener noreferrer">
                  <FaGithubSquare
                    size={30}
                    className="text-black-400 hover:text-black-600 lg:w-11 lg:h-11 sm:w-8 sm:h-8 ip:h-16 ip:w-16 hover:mb-1 transition-[margin-bottom] duration-300 ease-in-out"
                  />
                </a>
                <a href={WhatsUp} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp
                    size={30}
                    className="text-black-400 hover:text-green-600 lg:w-11 lg:h-11 sm:w-8 sm:h-8 ip:h-16 ip:w-16 hover:mb-1 transition-[margin-bottom] duration-300 ease-in-out"
                  />
                </a>
                <a href={youTubeUrl} target="_blank" rel="noopener noreferrer">
                  <FiYoutube
                    size={30}
                    className="text-black-400 hover:text-red-600 hover:mb-1 lg:w-11 lg:h-11 sm:w-8 sm:h-8 ip:h-16 ip:w-16 transition-[margin-bottom] duration-300 ease-in-out"
                  />
                </a>
              </div>
            </div>
          </div>

          <Container>
            <div
              className="flex form-container  flex-col mt-13 gap-2 w-1/2 sm:w-full sm:mt-3 sm:pl-[59px] md:w-full "
              data-aos=""
              data-aos-delay="400"
            >
              <form
                onSubmit={sendComment}
                className="space-y-6"
                name="submit-to-google-sheet"
              >
                <div className="flex sm:flex-col space-y-0 sm:space-y-0 gap-5 lg:flex-row sm:w-40 ">
                  <input
                    className={`flex-1 p-3 lg:w-80 lg:h-12 sm:w-60 border ${""} flex-1 p-3 lg:w-80 lg:h-12 sm:w-[300px] md:w-[300px] border rounded-lg md:rounded-2xl sm:rounded-2xl bg-black text-white shadow-[0_0_2px_rgba(255,255,255,0.5),inset_0_0_2px_rgba(255,255,255,0.5),0_0_5px_rgba(0,136,255,0.5),0_0_15px_rgba(0,136,255,0.5),0_0_30px_rgba(0,136,255,0.5),0_0_10px_rgba(255,0,255,0.5),0_0_70px_rgba(255,0,255,0.5)] transition-shadow duration-300 ease-in-out focus:shadow-[0_0_2px_rgba(255,255,255,0.75),inset_0_0_2px_rgba(255,255,255,0.75),0_0_5px_rgba(0,136,255,0.75),0_0_15px_rgba(0,136,255,0.75),0_0_30px_rgba(0,136,255,0.75),0_0_50px_rgba(255,0,255,0.75),0_0_70px_rgba(255,0,255,0.75)]`}
                    placeholder="Full Name"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={handleChange(setFullName)}
                  />
                  <input
                    className={`flex-1 p-3 lg:w-80 lg:h-12 sm:w-60 border ${
                      isEmailValid ? "border-gray-300" : "border-red-500"
                    } flex-1 p-3 lg:w-80 lg:h-12 sm:w-[300px] border rounded-lg sm:rounded-2xl md:rounded-2xl bg-black text-white shadow-[0_0_2px_rgba(255,255,255,0.5),inset_0_0_2px_rgba(255,255,255,0.5),0_0_5px_rgba(0,136,255,0.5),0_0_15px_rgba(0,136,255,0.5),0_0_30px_rgba(0,136,255,0.5),0_0_10px_rgba(255,0,255,0.5),0_0_70px_rgba(255,0,255,0.5)] transition-shadow duration-300 ease-in-out focus:shadow-[0_0_2px_rgba(255,255,255,0.75),inset_0_0_2px_rgba(255,255,255,0.75),0_0_5px_rgba(0,136,255,0.75),0_0_15px_rgba(0,136,255,0.75),0_0_30px_rgba(0,136,255,0.75),0_0_50px_rgba(255,0,255,0.75),0_0_70px_rgba(255,0,255,0.75)]`}
                    placeholder="Email address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange(setEmail)}
                  />
                </div>
                {!isEmailValid && (
                  <span className="text-red-500 text-sm">
                    Please use a valid email
                  </span>
                )}

                <input
                  className="lg:w-[475px] lg:h-12 sm:w-[300px] px-5 py-4 border md:rounded-2xl  rounded-lg sm:rounded-2xl bg-black text-white flex-1 p-3 lg:w-80 lg:h-12 sm:w-60 border rounded-4xl bg-black text-white shadow-[0_0_2px_rgba(255,255,255,0.5),inset_0_0_2px_rgba(255,255,255,0.5),0_0_5px_rgba(0,136,255,0.5),0_0_15px_rgba(0,136,255,0.5),0_0_30px_rgba(0,136,255,0.5),0_0_50px_rgba(255,0,255,0.5),0_0_70px_rgba(255,0,255,0.5)] transition-shadow duration-300 ease-in-out focus:shadow-[0_0_2px_rgba(255,255,255,0.75),inset_0_0_2px_rgba(255,255,255,0.75),0_0_5px_rgba(0,136,255,0.75),0_0_15px_rgba(0,136,255,0.75),0_0_30px_rgba(0,136,255,0.75),0_0_50px_rgba(255,0,255,0.75),0_0_70px_rgba(255,0,255,0.75)]"
                  placeholder="Subject"
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={handleChange(setSubject)}
                />
                <div>
                  <textarea
                    className="lg:w-[475px] lg:h-[150px] sm:w-[300px] px-5 py-3 border border-gray-300 md:rounded-1xl rounded-lg sm:rounded-1xl bg-black text-white flex-1 p-3 lg:w-80 lg:h-12 sm:w-60 border rounded-lg bg-black text-white shadow-[0_0_2px_rgba(255,0,0,0),inset_0_0_2px_rgba(255,255,255,0.5),0_0_5px_rgba(0,136,255,0.5),0_0_15px_rgba(0,136,255,0.5),0_0_30px_rgba(0,136,255,0.5),0_0_50px_rgba(255,0,255,0.5),0_0_70px_rgba(255,0,255,0.5)] transition-shadow duration-300 ease-in-out focus:shadow-[0_0_2px_rgba(255,255,255,0.75),inset_0_0_2px_rgba(255,255,255,0.75),0_0_5px_rgba(0,136,255,0.75),0_0_15px_rgba(0,136,255,0.75),0_0_30px_rgba(0,136,255,0.75),0_0_50px_rgba(255,0,255,0.75),0_0_70px_rgba(255,0,255,0.75)]"
                    placeholder="Message"
                    name="message"
                    value={message}
                    onChange={handleChange(setMessage)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-1/2 bg-white text-black py-4 md:w-[100px!important]  rounded-full lg:w-32 h-12 hover:bg-secondary shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
                >
                  Send 
                </button>

                <div
                  id="msg"
                  className="text-center"
                  dangerouslySetInnerHTML={{ __html: msg }}
                ></div>
              </form>
            </div>
          </Container>
        </div>
        <div className="mt-auto w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Contact;
