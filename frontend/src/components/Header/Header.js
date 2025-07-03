import React from "react";
import { FiLogIn } from "react-icons/fi";
import { FaUserCircle, FaViacoin } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RESET, logoutUser } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLinks";
import { UserName } from "../../pages/profile/Profile";

import eagles from "./eagles.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeLink = ({ isActive }) =>
    isActive ? "text-blue-500" : "text-blue-500";

  const goHome = () => {
    navigate("/");
  };

  const logout = async () => {
    dispatch(RESET());
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="bg-white h-24 w-full text-white font-semibold">
      <nav className="flex justify-between items-center h-full px-4">
        <div className="flex items-center cursor-pointer" onClick={goHome}>
          <span className="text-4xl sm:text-xl text-black">
            <img src={eagles} alt="EagleDemy" className="w-12 h-12 mr-2" />
          </span>
          <span className="text-4xl sm:text-xl text-black">EagleDemy</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 sm:space-x-3">
          <ShowOnLogin>
            {/* Profile with UserName */}
            <li className="flex items-center space-x-2 sm:space-x-1">
              <FaUserCircle size={40} className="sm:size-20" />
              <p className="sm:text-sm">
                <UserName />
              </p>
            </li>
          </ShowOnLogin>

          {/* Login Button */}
          <ShowOnLogout>
            <li>
              <Link to="/login">
                <button className="bg-blue-700 px-4 py-2 mr-12  md:mr-4 sm:px-2 sm:py-1 sm:text-sm rounded">
                  Login
                </button>
              </Link>
            </li>
          </ShowOnLogout>

          {/* Profile and Logout for Logged-in Users */}
          <ShowOnLogin>
            <li className="mt-3 sm:mt-8 sm:text-sm text-blue-500">
              <NavLink to="/profile" className={activeLink}>
                Profile
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-red-600 mt-3 sm:mt-7 sm:text-sm px-4 py-2 sm:px-2 sm:py-1 rounded"
              >
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
