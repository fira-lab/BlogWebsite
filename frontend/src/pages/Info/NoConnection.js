import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";

const NoConnection = () => {
  const { portfolioData } = useSelector((state) => state.root || {});
  const { about } = portfolioData || {};
  const { noConnection } = about || {};

  return (
    <div className="relative z-10 ">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl font-bold text-red-600 mb-4">Connection Lost</div>
          <h1 className="text-2xl font-semibold text-white mb-6">
            Oops! No Internet Connection
          </h1>
          <p className="text-white mb-8">
            It seems like your internet connection is currently unavailable. Please reconnect to continue enjoying all the features of this site.
          </p>
          {noConnection && (
            <img
              src={noConnection}
              alt="No connection illustration"
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
      <Footer />
    </div>
  );
};

export default NoConnection;
