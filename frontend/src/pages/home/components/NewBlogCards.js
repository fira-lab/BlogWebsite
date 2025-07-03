import React from "react";
import "../css/Cards.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function NewBlogCards(props) {
  // Updated responsive settings for wider cards
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2, // fewer items per slide gives each card more width
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // New blog posts data using online images.
  const blogPosts = [
    {
      id: 1,
      title: "AI Engineers: Dominating Future Jobs",
      description:
        "Discover how the advancements in AI are reshaping the career landscape and empowering engineers with cutting-edge skills.",
      image:
        "https://source.unsplash.com/random/800x600?artificial-intelligence",
      link: "/blog/ai-engineers-future",
    },
    {
      id: 2,
      title: "Firaol Terefe's Vision: Innovation Redefined",
      description:
        "Explore the transformative impact of visionary approaches in redefining today's rapidly evolving tech trends.",
      image: "https://source.unsplash.com/random/800x600?innovation,technology",
      link: "/blog/firaol-tere-fee-vision",
    },
    {
      id: 3,
      title: "Quantum Leap: New Realms in Computing",
      description:
        "Dive into the world of quantum computing and see how it's unlocking possibilities beyond traditional limits.",
      image: "https://source.unsplash.com/random/800x600?quantum,computer",
      link: "/blog/quantum-computing",
    },
    {
      id: 4,
      title: "Cybersecurity 2025: Beyond the Horizon",
      description:
        "Learn about emerging threats and futuristic defense strategies as we safeguard our increasingly digital world.",
      image: "https://source.unsplash.com/random/800x600?cybersecurity",
      link: "/blog/cybersecurity-2025",
    },
    {
      id: 5,
      title: "Sustainable Tech: Eco-Innovation in Action",
      description:
        "A look into how sustainable technology is merging green practices with innovative solutions for the future.",
      image:
        "https://source.unsplash.com/random/800x600?sustainability,technology",
      link: "/blog/sustainable-tech",
    },
    {
      id: 6,
      title: "Blockchain Beyond Crypto: A Revolution",
      description:
        "Uncover how blockchain technology is impacting financial systems and other industries beyond cryptocurrencies.",
      image: "https://source.unsplash.com/random/800x600?blockchain",
      link: "/blog/blockchain-future",
    },
  ];

  return (
    <div className="cards">
      <h1>Trending Tech Insights</h1>
      <br />
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // render carousel on server-side
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={100000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {blogPosts.map((post) => (
          <div key={post.id} style={{ padding: "0 10px" }}>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="blog-card"
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease",
                  transform: "scale(1)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  className="blog-card__image"
                  style={{
                    height: "200px",
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  className="blog-card__content"
                  style={{ padding: "16px", minHeight: "150px" }}
                >
                  <h2 style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: "1rem", color: "#555", margin: 0 }}>
                    {post.description}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default NewBlogCards;
