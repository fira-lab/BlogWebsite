import React from "react";
import "../css/Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiLinkedin } from "react-icons/ci";
import { FaGithubSquare, FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

function Footer() {
  const { portfolioData } = useSelector((state) => state.root || {});

  const { intro, about, projects } = portfolioData || {};
  const { copyRight } = intro || {};
  const { WhatsUp, Github, Linkedn, youTubeUrl } = about || {};
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Technical Newsletter to receive our Best Offers.
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--calltoaction">Subscribe</Button>
          </form>
        </div>
      </section>
      <div class="footer-links">
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>About Us</h2>
            <Link to="/login">How it works</Link>
            <Link to="/https://firaol-developer.vercel.app/">Testimonials</Link>
            <Link to="/https://firaol-developer.vercel.app/">Careers</Link>
            <Link to="/https://firaol-developer.vercel.app/">Investors</Link>
            <Link to="/https://firaol-developer.vercel.app/">
              Terms of Service
            </Link>
          </div>
          <div class="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/https://firaol-developer.vercel.app/">Contact</Link>
            <Link to="/https://firaol-developer.vercel.app/">Support</Link>
            <Link to="/https://firaol-developer.vercel.app/">Consultancy</Link>
            <Link to="/https://firaol-developer.vercel.app/">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>Videos</h2>
            <Link to="/https://firaol-developer.vercel.app/">Submit Video</Link>
            <Link to="/https://firaol-developer.vercel.app/">Ambassadors</Link>
            <Link to="/https://firaol-developer.vercel.app/">Agency</Link>
            <Link to="/https://firaol-developer.vercel.app/">Influencer</Link>
          </div>
          <div class="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/">Tiktok</Link>
            <Link to="/">Facebook</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
      </div>
      {/* <section class="social-media">
        <div class="social-media-wrap">
          <div class="social-icons">
            <Link
              class="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f" />
            </Link>
            <Link
              class="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" />
            </Link>
            <Link
              class="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i class="fab fa-youtube" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section> */}

      <div className=" mx-auto flex justify-center items-center space-x-4 text-center space-y-4 sm:space-y-1  lg:flex-row sm:flex-col-reverse">
        <p className="text-white hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:via-red-500 hover:to-pink-500 hover:bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 ease-in-out hover:underline sm:text-xs lg:text-[18px]">
          Copyright &copy; {new Date().getFullYear()} Firaol Terefe All rights
          reserved.
        </p>
        <div className="flex space-x-6 sm:py-2   ">
          <a
            href="https://www.linkedin.com/in/firaol-terefe-591720249/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiLinkedin className="text-blue-500 hover:text-blue-200 lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://github.com/fira-lab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubSquare className="text-gray-50 hover:blue-500 lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
          <a href={WhatsUp} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-green-500 hover:text-green-200 lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://youtu.be/eALx0wqM18g?si=1rpvGpsN-4UD4gyM"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiYoutube className="text-red-700 hover:text-secondary lg:w-7 lg:h-7 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
