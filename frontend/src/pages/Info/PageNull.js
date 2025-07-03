import React from 'react';
import { useSelector } from 'react-redux';

const PageNull = () => {
  const { portfolioData } = useSelector((state) => state.root || {});
  const { about } = portfolioData || {};
  const { nullPages } = about || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4 py-12 relative z-10">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-secondary mb-4">
          404
        </div>
        <h1 className="text-2xl font-semibold text-white mb-6">
          Page Not Found
        </h1>
        <p className="text-white mb-8">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        {nullPages && (
          <img
            src={nullPages}
            alt="404 illustration"
            className="w-full h-auto mb-8 object-cover rounded-lg shadow-md"
          />
        )}
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PageNull;
