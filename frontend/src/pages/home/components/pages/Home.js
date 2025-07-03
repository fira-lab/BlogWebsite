import React, { useEffect } from "react";
import "../../../../App.css";

import HeroSection from "../HeroSection";

import ChatbotComponent from "../../../Info/ChatbotComponent";
import AOS from "aos";
import "aos/dist/aos.css";
import Aos from "aos";

function Home(props) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <div>
        <HeroSection />

        <br></br>

        <br></br>
        {/* <NewBlogCards /> */}
        {/* <ChatbotComponent /> */}
      </div>
    </>
  );
}

export default Home;
