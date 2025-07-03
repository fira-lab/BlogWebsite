import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaUserGraduate, FaClock, FaPlay } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import "./new.css"; // Make sure to import your CSS file

const NewCourseCards = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const courses = [
    {
      id: 1,
      title: "Master Full-Stack Development",
      description: "Build real-world projects with modern technologies",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80",
      instructor: {
        name: "Alex Morgan",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "Senior Developer",
      },
      stats: {
        rating: 4.9,
        students: 23890,
        duration: "48 hours",
      },
      price: 129.99,
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Advanced Cloud Architecture",
      description: "Design scalable solutions on AWS and Azure",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80",
      instructor: {
        name: "Sarah Chen",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "Cloud Engineer",
      },
      stats: {
        rating: 4.8,
        students: 15670,
        duration: "36 hours",
      },
      price: 149.99,
      tags: ["AWS", "Azure", "DevOps"],
    },
    {
      id: 3,
      title: "AI & Machine Learning Mastery",
      description: "From fundamentals to advanced neural networks",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80",
      instructor: {
        name: "Dr. James Wilson",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        role: "AI Engineer",
      },
      stats: {
        rating: 4.9,
        students: 19450,
        duration: "52 hours",
      },
      price: 169.99,
      tags: ["Python", "TensorFlow", "Deep Learning"],
    },
  ];

  return (
    <div className="py-16 px-4 w-24px" style={{ backgroundColor: "#18043a" }}>
      <div
        className="max-w-7xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="270"
      >
        <h2 className="text-5xl font-bold text-white mb-12 text-center">
          Featured Courses
        </h2>
        {/*
          On small devices, the container is a flex-row with horizontal scrolling,
          and the custom class hides the scrollbar.
          On medium and larger screens, the layout switches to a grid and the scrollbar remains visible.
        */}
        <div className="flex flex-row gap-8 overflow-x-auto hide-scrollbar-on-small md:grid md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 min-w-[230px]"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <button className="absolute top-4 right-4 bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <FaPlay className="text-white" />
                </button>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-blue-400 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <img
                    src="https://res.cloudinary.com/dgbopjzbu/image/upload/v1738656555/IMG_20250204_105911_723_l8qjbr_wvfxny.jpg"
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      {/* {course.instructor.name} */}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {course.instructor.role}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span>{course.stats.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUserGraduate className="mr-1" />
                    <span>{course.stats.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{course.stats.duration}</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    {/* ${course.price} */}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Link to="/login">Enroll Now</Link>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCourseCards;
