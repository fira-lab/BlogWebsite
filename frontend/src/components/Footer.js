import React from "react";
import { useSelector } from "react-redux";
import { FaGithubSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  const { portfolioData } = useSelector((state) => state.root || {});

  const { intro, about,projects } = portfolioData || {};
  const {copyRight } = intro || {};
  const { WhatsUp, Github, Linkedn,youTubeUrl } = about || {};
  

  return (
    <div className="bg-gray-900 lg:h-14 sm:h-20 text-white font-poppins text-xl sm:flex sm:flex-row-reverse mt-12  ">
      <div className="container mx-auto flex justify-center items-center space-x-4 text-center space-y-4 sm:space-y-1  lg:flex-row sm:flex-col-reverse">
        <p className="">
          

        </p>
        <p className="text-white hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:via-red-500 hover:to-pink-500 hover:bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 ease-in-out hover:underline sm:text-xs lg:text-[18px]">
          Copyright &copy;  {new Date().getFullYear()} {copyRight} All rights reserved.
        </p>
        <div className="flex space-x-6 sm:py-2   ">
          <a href={Linkedn} target="_blank" rel="noopener noreferrer">
            <CiLinkedin className="text-blue-500 hover:text-blue-200 lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
          <a href={Github} target="_blank" rel="noopener noreferrer">
            <FaGithubSquare className="text-gray-50 hover:blue-500 lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
          <a href={WhatsUp} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-green-500 hover:text-green-200 lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
          <a href={youTubeUrl} target="_blank" rel="noopener noreferrer">
            <FiYoutube  className="text-red-700 hover:text-secondary lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
