import React, { useEffect, useState } from "react";
import { IoHome, IoPersonOutline } from "react-icons/io5";
import { PiFileTextDuotone } from "react-icons/pi";
import { SiPolywork } from "react-icons/si";
import { SlCallOut } from "react-icons/sl";
import { GrCertificate } from "react-icons/gr";
import Hamburger from "hamburger-react";
import { Tooltip } from "react-tooltip";
import { NavLink, useNavigate } from "react-router-dom";
import { FRONT, frontEnd } from "../redux/authService";
import "react-tooltip/dist/react-tooltip.css";
import { selectIsLoggedIn } from "../redux/rootSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SideBar = () => {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 700);
  const [isOpen, setOpen] = useState(window.innerWidth < 300);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigate = useNavigate();
  const loginStatus = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 700);
      setOpen(window.innerWidth < 300);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showOthers = () => {
    console.log("Before toggle:", isOpen);
    setOpen((prevOpen) => !prevOpen);
    console.log("After toggle:", !isOpen);
  };

  const handleRedirect = async () => {
    if (!loginStatus) {
      toast.info("Only if you are Admin");
      navigate("/loginWithCode/code");
    }
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setOpen(false); // Close the hamburger menu
  };

  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip" />
      <nav
        className={`fixed w-[70px] top-1 bottom-1 sm:w-12 h-screen bg-gray-900 text-white flex flex-col justify-start items-start z-50 transition-all duration-500 ${
          smallScreen && isOpen
            ? "bg-gray-800"
            : !smallScreen
            ? "bg-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="p-[15px] sm:p-2 sm:text-3xl">
          <ul className="flex-col justify-start-[10px] items-start space-y-4 gap-4 sm:text-3xl">
            <li
              className={`text-secondary hover:text-secondary ${
                smallScreen ? "fixed bottom-20 right-3" : "hidden"
              }`}
            >
              <Hamburger
                toggled={isOpen}
                toggle={() => setOpen((prevOpen) => !prevOpen)}
                className="h-25 w-25 sm:w-12 sm:h-[150px]"
              />
            </li>
          </ul>
          <ul className="flex-col justify-start items-start space-y-4 gap-10 sm:text-3xl">
            <li
              className="text-white border-secondary text-5xl sm:text-2xl mt-[-23px] font-semibold mb-[120px] sm:mb-40 bg-secondary lg:w-12 lg:h-12 sm:w-8 sm:h-8 flex items-center justify-center rounded-full cursor-pointer sm:mt-[-35px] sm:mb-[100px] sm:left-2 lg:left-6"
              onClick={handleRedirect}
            >
              F
            </li>
            {(smallScreen && isOpen) || !smallScreen ? (
              <div className="w-full h-[2px] bg-gradient-to-r from-secondary via-green-500 to-secondary animate-shine my-2"></div>
            ) : null}
            <li
              className={`space-y-3  transform hover:scale-110 hover:translate-x-2 transition-transform duration-200 transition-all lg:w-8 lg:h-8 duration-100 animate-fade-slide ${
                smallScreen && !isOpen ? "hidden" : ""
              } relative ${selectedIcon === "home" ? "text-secondary" : ""}`}
            >
              <NavLink
                to="/"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="home"
                data-tooltip-place="right"
                className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                onClick={() => handleIconClick("home")}
              >
                <IoHome className="w-full h-full" />
              </NavLink>
            </li>
            {(smallScreen && isOpen) || !smallScreen ? (
              <div className="w-full h-[2px] bg-gradient-to-r from-secondary via-green-500 to-secondary animate-shine my-2"></div>
            ) : null}
            <li
              className={`space-y-3 transform hover:scale-110 hover:translate-x-2 transition-transform duration-200 transition-all lg:w-8 lg:h-8 duration-100 animate-fade-slide ${
                smallScreen && !isOpen ? "hidden" : ""
              } relative ${selectedIcon === "about" ? "text-secondary" : ""}`}
            >
              <NavLink
                to="/about"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="About"
                data-tooltip-place="right"
                className="sm:w-4 sm:h-4 lg:w-8 lg:h-8"
                onClick={() => handleIconClick("about")}
              >
                <IoPersonOutline className="w-full h-full" />
              </NavLink>
            </li>
            {(smallScreen && isOpen) || !smallScreen ? (
              <div className="w-full h-[2px] bg-gradient-to-r from-secondary via-green-500 to-secondary animate-shine my-2"></div>
            ) : null}
            <li
              className={`space-y-3 transform hover:scale-110 hover:translate-x-2 transition-transform duration-200 transition-all lg:w-8 lg:h-8 duration-900 animate-fade-slide ${
                smallScreen && !isOpen ? "hidden" : ""
              } relative ${
                selectedIcon === "experiences" ? "text-secondary" : ""
              }`}
            >
              <NavLink
                to="/experiences"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Experiences"
                data-tooltip-place="right"
                className="w-12 h-12 sm:w-8 sm:h-8 lg:w-8 lg:h-8 "
                

                onClick={() => handleIconClick("experiences")}
              >
                <PiFileTextDuotone className="w-full h-full" />
              </NavLink>
            </li>
            {(smallScreen && isOpen) || !smallScreen ? (
              <div className="w-full h-[2px] bg-gradient-to-r from-secondary via-green-500 to-secondary animate-shine my-2"></div>
            ) : null}
            <li
              className={`space-y-3 transform hover:scale-110 hover:translate-x-2 transition-transform duration-200 transition-all duration-900 lg:w-8 lg:h-8 animate-fade-slide ${
                smallScreen && !isOpen ? "hidden" : ""
              } relative ${
                selectedIcon === "projects" ? "text-secondary" : ""
              }`}
            >
              <NavLink
                to="/projects"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Projects"
                data-tooltip-place="right"
                className="w-12 h-12 sm:w-8 sm:h-8 lg:w-8 lg:h-8"
                onClick={() => handleIconClick("projects")}
              >
                <SiPolywork className="w-full h-full" />
              </NavLink>
            </li>
            {(smallScreen && isOpen) || !smallScreen ? (
              <div className="w-full h-[2px] bg-gradient-to-r from-secondary via-green-500 to-secondary animate-shine my-2"></div>
            ) : null}
            <li
              className={`space-y-3 transform hover:scale-110 hover:translate-x-2 transition-transform duration-200 transition-all duration-900 lg:w-8 lg:h-8 animate-fade-slide ${
                smallScreen && !isOpen ? "hidden" : ""
              } relative ${
                selectedIcon === "certificates" ? "text-secondary" : ""
              }`}
            >
              <NavLink
                to="/certificates"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Certificates"
                data-tooltip-place="right"
                className="w-12 h-12 sm:w-8 sm:h-8 lg:w-8 lg:h-8"
                onClick={() => handleIconClick("certificates")}
              >
                <GrCertificate className="w-full h-full" />
              </NavLink>
            </li>
            {(smallScreen && isOpen) || !smallScreen ? (
              <div className="w-full h-[2px] bg-gradient-to-r from-secondary via-green-500 to-secondary animate-shine my-2"></div>
            ) : null}
            <li
              className={`space-y-3 transform hover:scale-110 hover:translate-x-2 transition-transform duration-200 transition-all duration-1300 lg:w-8 lg:h-8 animate-fade-slide ${
                smallScreen && !isOpen ? "hidden" : ""
              } relative ${selectedIcon === "contact" ? "text-secondary" : ""}`}
            >
              <NavLink
                to="/contact"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Contact"
                data-tooltip-place="right"
                className="w-12 h-12 sm:w-8 sm:h-8 lg:w-5 lg:h-5"
                onClick={() => handleIconClick("contact")}
              >
                <SlCallOut className="w-full h-full" />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 0%;
          }
          100% {
            background-position: 200%;
          }
        }
        .animate-shine {
          background: linear-gradient(
            90deg,
            #ff0099,
            #493240,
            #493240,
            #ff0099
          );
          background-size: 200%;
          animation: shine 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default SideBar;
