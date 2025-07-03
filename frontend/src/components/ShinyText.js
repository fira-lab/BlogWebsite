import React, { useEffect, useState } from "react";
import "./shiny.css";
import "../pages/home/css/HeroSection.css";
const ShinyText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const text = "Eagledemy";
  useEffect(() => {
    let interval, timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % text.length;
          // Check if we've completed one full cycle
          if (newIndex === 0) {
            // Pause for 5 seconds after completing a cycle
            setIsPaused(true);
          }
          return newIndex;
        });
      }, 150); // Change every 150 milliseconds

      return () => clearInterval(interval);
    } else {
      timeout = setTimeout(() => {
        setIsPaused(false); // Resume the animation after 5 seconds
      }, 2000); // 5-second pause

      return () => clearTimeout(timeout);
    }
  }, [isPaused, text.length]);

  return (
    <h1
      className="hero-container-h1 text-4xl lg:text-7xl md:text-6xl font-bold bg-clip-text bg-gradient-to-r from-red-700 via-red-900 to-secondary mb-4 sm:text-5xl"
      data-aos="fade-up"
      data-aos-delay="600"
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={currentIndex === index && !isPaused ? "shiny-letter" : ""}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

export default ShinyText;
