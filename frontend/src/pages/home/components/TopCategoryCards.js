import React, { useEffect, useState } from "react";
import "../css/TopCategoryCards.css";
import TopCategoryCardItem from "./TopCategoryCardItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Aos from "aos";
import "aos/dist/aos.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TopCategoryCards(props) {
  useEffect(() => {
    Aos.init();
  }, []);

  // New state and timer for continuous progress
  const [carouselProgress, setCarouselProgress] = useState(0);
  const [slideStartTime, setSlideStartTime] = useState(Date.now());

  useEffect(() => {
    // This interval updates the progress bar continuously
    const interval = setInterval(() => {
      const elapsed = Date.now() - slideStartTime;
      let newProgress = (elapsed / 1000) * 100; // assuming autoPlaySpeed = 1000ms
      if (newProgress > 100) newProgress = 100;
      setCarouselProgress(newProgress);
    }, 50);
    return () => clearInterval(interval);
  }, [slideStartTime]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.5,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // For Custmizing Dots Of Carousel
  const CustomDot = ({ onClick, ...rest }) => {
    const {
      onMove,
      index,
      active,
      carouselState: { currentSlide, deviceType },
    } = rest;
    //const carouselItems = [CarouselItem1, CaourselItem2, CarouselItem3];
    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
      <button
        className={active ? "active" : "inactive"}
        onClick={() => onClick()}
      >
        {/* {React.Children.toArray(carouselItems)[index]} */}
      </button>
    );
  };

  // Uncommented and updated custom arrow components with animated hover
  const arrowStyle = {
    background: "transparent",
    border: 0,
    color: "#fff",
    fontSize: "80px",
    transition: "transform 0.3s ease", // added for smooth scaling
  };

  const CustomRight = ({ onClick }) => (
    <button
      className="arrow right"
      onClick={onClick}
      style={arrowStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <ArrowForwardIcon style={{ fontSize: "50px" }} />
    </button>
  );

  const CustomLeft = ({ onClick }) => (
    <button
      className="arrow left"
      onClick={onClick}
      style={arrowStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <ArrowBackIcon style={{ fontSize: "50px" }} />
    </button>
  );

  const handleAfterChange = (currentSlide) => {
    // Reset the start time and progress when the slide changes
    setSlideStartTime(Date.now());
    setCarouselProgress(0);
  };

  return (
    <div
      className="cards "
      data-aos="fade-up"
      style={{ backgroundColor: "#18043a" }}
    >
      <h1
        className="text-center font-bold text-white text-5xl"
        data-aos="fade-up"
        data-aos-delay="5"
      >
        Top Categories
      </h1>
      <br></br>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000} // Transition every 1 second
        keyBoardControl={true}
        customTransition="all 1s ease-in-out"
        transitionDuration={1000} // Smooth 1s transition
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        afterChange={handleAfterChange}
        customRightArrow={<CustomRight />}
        customLeftArrow={<CustomLeft />}
      >
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ backgroundColor: "#18043a" }}
          className="text-white"
        >
          <TopCategoryCardItem
            src="images/cat1.png"
            text="Frontend"
            color="white"
            label="Adventure"
            path="/login"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          style={{ backgroundColor: "#18043a" }}
          className="text-white"
        >
          <TopCategoryCardItem
            src="images/cat2.png"
            text="Programming"
            label="Luxury"
            path="/login"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          style={{ backgroundColor: "#18043a" }}
          className="text-white"
        >
          <TopCategoryCardItem
            src="images/cat3.png"
            text="Cloud Computing"
            label="Mystery"
            path="/login"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          style={{ backgroundColor: "#18043a" }}
          className="text-white"
        >
          <TopCategoryCardItem
            src="images/cat4.png"
            text="Backend"
            label="Adventure"
            path="/login"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          style={{ backgroundColor: "#18043a" }}
        >
          <TopCategoryCardItem
            src="images/cat5.png"
            text="AI/ML"
            label=""
            path="/login"
            className="text-white"
          />
        </div>
      </Carousel>
      {/* New progress bar shown below the carousel */}
      <div
        className="carousel-progress-container"
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#ddd",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <div
          className="carousel-progress-bar"
          style={{
            height: "100%",
            width: `${carouselProgress}%`,
            background: "linear-gradient(to right, #ff0099, #493240, #ff00ff)",
            transition: "width 0.05s linear",
          }}
        ></div>
      </div>
      <br></br>
    </div>
  );
}

export default TopCategoryCards;
