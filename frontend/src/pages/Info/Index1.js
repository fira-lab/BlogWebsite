import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Introduction from './Introduction';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Certificates from './Certificates';
import Contact from './Contact';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar';

const Index1 = () => {
  const { portfolioData, loading } = useSelector((state) => state.root);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Header />
        {portfolioData ? (
          <div className='px-15 sm:px-5'>
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/about" element={<About />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        ) : (
          <div> Nothing </div>
        )}
      </div>
    </div>
  )
}

export default Index1;
