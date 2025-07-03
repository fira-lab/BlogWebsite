import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (totalHeight <= 0) {
      setScroll(0);
    } else {
      setScroll((scrollPosition / totalHeight) * 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div
        className="h-3 bg-gradient-to-r from-blue-500 via-blue-900 via-pink-500 via-blue-900 via-purple-500  to-black"
        style={{ width: `${scroll}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgress;
