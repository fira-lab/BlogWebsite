import React from "react";
import Header from "../Header/Header";

import Footer from "../../pages/home/components/Footer";
import Navbar from "../../pages/home/components/Navbar";
import { ToastContainer } from "react-toastify";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="--pad" style={{ minHeight: "80vh" }}>
        {children}
      </div>

      <Footer />
    </>
  );
};

export default Layout;
