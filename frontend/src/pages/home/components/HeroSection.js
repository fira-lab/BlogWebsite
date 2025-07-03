import React, { useCallback, useRef } from "react";
import { Button } from "./Button";
import eagle from "../components/pages/eagle.jpg";
import "../css/HeroSection.css";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ShinyText from "../../../components/ShinyText";

function HeroSection() {
  // Ref to store the particles container instance
  const particlesContainer = useRef(null);

  // Callback to capture the loaded particles container
  const particlesLoaded = (container) => {
    particlesContainer.current = container;
  };

  // When mouse is pressed down, set the clicking state and update position
  const handleMouseDown = (event) => {
    if (particlesContainer.current) {
      particlesContainer.current.interactivity.mouse.clicking = true;
      particlesContainer.current.interactivity.mouse.position = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  };

  // When mouse is released, reset the clicking state
  const handleMouseUp = () => {
    if (particlesContainer.current) {
      particlesContainer.current.interactivity.mouse.clicking = false;
    }
  };

  // Initialize particles
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
    } catch (err) {
      console.error("Error initializing particles:", err);
    }
  }, []);

  return (
    <div
      className="hero-container relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${eagle})`,
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                area: 1000,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.4, max: 0.8 },
            },
            size: {
              value: { min: 1, max: 3 },
            },
            move: {
              enable: true,
              speed: { min: 0.3, max: 0.8 },
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: ["grab", "bubble"],
              },
              onClick: {
                enable: true,
                mode: "attract",
              },
            },
            modes: {
              grab: {
                distance: 150,
                links: {
                  opacity: 0.7,
                  color: "#60A5FA",
                },
              },
              bubble: {
                distance: 150,
                duration: 0.5,
                opacity: 0.8,
                size: 8,
                shape: "circle",
              },
              attract: {
                distance: 200,
              },
            },
          },
        }}
      />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          Skylink Blog Website
        </h2>
        <p
          className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-10 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="900"
        >
          where people engage with the products and services of the company.
        </p>
        <div className="hero-btns" data-aos="fade-up" data-aos-delay="1000">
          <Link to="/register">
            <button className="px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
