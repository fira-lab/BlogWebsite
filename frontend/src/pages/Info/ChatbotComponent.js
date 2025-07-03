import React, { useState, useEffect } from "react";

// Custom hook to detect prefers-reduced-motion (retained if needed for future use)
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener
      ? mediaQuery.addEventListener("change", listener)
      : mediaQuery.addListener(listener);
    return () => {
      mediaQuery.removeEventListener
        ? mediaQuery.removeEventListener("change", listener)
        : mediaQuery.removeListener(listener);
    };
  }, []);
  return prefersReducedMotion;
}

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 768);
      setSmallScreen(true);
    };
  }, []);
  return (
    <>
      {isOpen && (
        // Full-screen overlay container without any dark backgrounds.
        <div className="fixed inset-0 z-50 bg-transparent">
          <iframe
            src="https://ai-chat-website-main.vercel.app/"
            title="AI Chat"
            className="w-full h-full border-none"
            style={{ backgroundColor: "transparent" }}
            allowTransparency="true"

            // allow="microphone"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            {/* Cross icon to close the overlay */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Tooltip for chat invitation (shown until the user clicks the toggle) */}
      {!hasBeenClicked && !isOpen && (
        <div className="fixed bottom-40 right-28  rounded-lg shadow-xl p-4 min-w-[240px] border border-gray-300">
          <div className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dgbopjzbu/image/upload/v1738656942/apple-icon-57x57_tiw7c9.png"
              alt="EagleDemy AI"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-black">How can I help you?</p>
              <p className="text-sm text-gray-500">Click to start chatting</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat toggle button */}

      {isOpen && !smallScreen ? (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!hasBeenClicked) setHasBeenClicked(true);
          }}
          className="fixed bottom-12 right-12 z-50 p-2 shadow-xl transition-transform hover:scale-110 sm:absolute sm:top-4 sm:right-4 sm:p-3  sm:rounded-full sm:shadow-lg sm:hover:scale-105 sm:transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 bg-blue-500 rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : (
        // When closed, show only the chat avatar with unread badge if applicable.
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!hasBeenClicked) setHasBeenClicked(true);
          }}
          className="fixed bottom-12 right-12 z-50 p-2 shadow-xl transition-transform hover:scale-110"
        >
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dgbopjzbu/image/upload/v1738658316/ui_qdlq1e.png"
              alt="Chat Avatar"
              className="w-[60px] h-[60px] rounded-full"
            />
            {!hasBeenClicked && (
              <span className="absolute top-0 right-0 bg-red-500 text-white font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center">
                1
              </span>
            )}
          </div>
        </button>
      )}
    </>
  );
};

export default ChatbotComponent;
