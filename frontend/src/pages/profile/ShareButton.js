import React from 'react';
import { FaShare } from 'react-icons/fa6';

const ShareButton = ({ link }) => {
  const handleShare = () => {
    // Check if the share feature is supported
    if (navigator.share) {
      navigator.share({
        title: 'Check this out!',
        url: link,
      })
      .then(() => console.log('Share successful!'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for unsupported browsers
      navigator.clipboard.writeText(link)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying link:', error));
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full shadow-md hover:bg-gray-700 transition-all duration-200"
    >
      <FaShare className="w-6 h-6 text-white" />
    </button>
  );
};

export default ShareButton;

// Usage Example

