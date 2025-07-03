import React from "react";

const Subscribed = ({ isSubscribed, handleClick, youTubeLink }) => {
  return (
    <>
      {isSubscribed && (
        <a
          href={youTubeLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="text-blue-700 underline" // Added underline for better visual cue
        >
          YouTube Link
        </a>
      )}
    </>
  );
};

export default Subscribed;
