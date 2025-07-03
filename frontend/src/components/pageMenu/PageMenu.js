import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminAuthorLink } from "../protect/hiddenLinks";
import { getData } from "../../redux/features/auth/authSlice";

const PageMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Trigger data fetching when the user navigates to "/projects"
  useEffect(() => {
    if (location.pathname === "/projects") {
      dispatch(getData());
    }
  }, [location, dispatch]);

  return (
    <nav className="--btn-google --p --mb ">
      <div className="flex justify-between items-center w-full lg:px-24 sm:px-2 md:px-16">
        {/* Left corner - Profile */}
        <div className="lg:ml-80 sm:ml-2 md:ml-24">
          <NavLink to="/projects" className="text-2xl">
            Blog
          </NavLink>
        </div>

        <div className="lg:ml-[290px] sm:ml-12 md:ml-24">
          <NavLink to="/profile" className="text-2xl">
            Profile
          </NavLink>
        </div>

        {/* Center - Change Password */}
        <div className="flex justify-center w-full">
          <NavLink to="/changePassword" className="text-2xl">
            Change Password
          </NavLink>
        </div>

        {/* Right corner - Users */}
        <AdminAuthorLink>
          <div className="lg:mr-80 sm:mr-2 md:mr-24">
            <NavLink to="/users" className="text-2xl">
              Users List
            </NavLink>
          </div>
          <div className="lg:mr-80 sm:mr-2 md:mr-24">
            <NavLink to="/adminProjects" className="text-2xl">
              AdminPage
            </NavLink>
          </div>
        </AdminAuthorLink>
      </div>
    </nav>
  );
};

export default PageMenu;
