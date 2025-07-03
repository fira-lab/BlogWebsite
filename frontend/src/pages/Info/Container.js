import React from 'react';

const Container = ({ children }) => {
  return (
    <duv className='py-10'>
    <div className="relative z-10 max-w-lg mx-auto p-9   sm:p-6 text-white  rounded-lg" data-aos="fade-up" data-aos-delay="400">
      {children}
    </div>
    </duv>
  );
};

export default Container;
