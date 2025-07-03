import React from 'react';

const SectionTitle = ({ title }) => {
  return (
    <div className="py-6 text-center font-poppins">
      <h1 className="text-white text-6xl sm:text-5xl  mb-2 shiny-text">{title}</h1>
      <div className="h-1 w-24 bg-secondary mx-auto mt-2 sm:mb-1 mb-2"></div>
    </div>
  );
};

export default SectionTitle;
