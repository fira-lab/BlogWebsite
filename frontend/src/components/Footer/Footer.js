import React from "react";
import { FaGithubSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  const copyRight = "Firaol Terefe"; // Replace with your name or desired copyright text

  // Links provided
  const Linkedn = "https://www.linkedin.com/in/firaol-terefe-591720249/";
  const Github = "https://github.com/fira-lab";
  const WhatsUp = "https://wa.me/qr/BQU3J4LOI2HWG1";
  const youTubeUrl = "https://youtu.be/eALx0wqM18g";

  return (
    <div className="bg-gray-900 lg:h-32 sm:h-20  font-poppins text-xl sm:flex sm:flex-row-reverse mt-12">
      <div className="container mx-auto flex justify-center items-center space-x-4 text-center space-y-4 sm:space-y-0 lg:flex-row sm:flex-col-reverse">
        <p className="text-black sm:text-xs lg:text-[18px] sm:text-[14px]">
          Copyright &copy; {new Date().getFullYear()} {copyRight} All rights reserved.
        </p>
        <div className="flex space-x-6 sm:py-2">
          <a href={Linkedn} target="_blank" rel="noopener noreferrer">
            <CiLinkedin className="text-blue-500 hover:text-blue-900 lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]" />
          </a>
          <a href={Github} target="_blank" rel="noopener noreferrer">
            <FaGithubSquare className="text-black hover:text-gray-500 lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]" />
          </a>
          <a href={WhatsUp} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-green-700 hover:text-green-900 lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]" />
          </a>
          <a href={youTubeUrl} target="_blank" rel="noopener noreferrer">
            <FiYoutube className="text-red-700 hover:text-red-900 lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
