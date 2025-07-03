import React, { useEffect } from "react";
import "../css/Cards.css";
import CardItem from "./CardItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Cards(props) {
  // Initialize AOS in useEffect so it runs when the component mounts
  useEffect(() => {
    AOS.init();
  }, []);

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

  // const arrowStyle = {
  //   background: "transparent",
  //   border: 0,
  //   color: "#fff",
  //   fontSize: "80px"
  // };
  // const CustomRight = ({ onClick }) => (
  //   <button className="arrow right" onClick={onClick} style={arrowStyle}>
  //     <ArrowForwardIcon style={{ fontSize: "50px" }} />
  //   </button>
  // );
  // const CustomLeft = ({ onClick }) => (
  //   <button className="arrow left" onClick={onClick} style={arrowStyle}>
  //     <ArrowBackIcon style={{ fontSize: "50px" }} />
  //   </button>
  // );

  return (
    <div
      className="cards bg-white shadow-lg rounded-lg p-8 my-8"
      data-aos={props.aos || "fade-up"}
    >
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
        Top Courses (Coming Soon)
      </h1>
      <div data-aos="fade-up" data-aos-delay="10">
        <Carousel
          swipeable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // render carousel on server-side
          infinite={true}
          autoPlay={props.deviceType !== "mobile"}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5s ease-in-out" // Added smooth transition easing
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          draggable={true}
        >
          <div>
            <CardItem
              src="images/1.png"
              text="The Ultimate Python Course 2025"
              label="Programming"
              path="/login"
            />
          </div>
          <div>
            <CardItem
              src="images/2.png"
              text="Mastering Django: Basics To Advance"
              label="Backend"
              path="/login"
            />
          </div>
          <div>
            <CardItem
              src="images/3.png"
              text="Learn Complete React 2025"
              label="Frontend"
              path="/login"
            />
          </div>
          <div>
            <CardItem
              src="images/4.png"
              text="NodeJS: Modern Javascript, Full-Stack"
              label="Full-Stack" // Label can be a category or a bestseller tag
              path="/login"
            />
          </div>
          {/* <div>
            <CardItem
              src="images/next4.png"
              text="Next.js: The Complete Guide"
              label="Frontend"
              path="/login"
            />
          </div> */}
          <div>
            <CardItem
              src="images/6.png"
              text="AWS: Solution Architect Preparation Guide"
              label="Cloud Computing"
              path="/login"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Cards;
