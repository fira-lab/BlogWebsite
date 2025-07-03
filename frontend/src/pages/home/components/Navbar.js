import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "../css/Navbar.css";
import axios from "axios";
import { logoutUser, RESET } from "../../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../../components/protect/hiddenLinks";
import { FaUserCircle } from "react-icons/fa";
import { UserName } from "../../profile/Profile";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isloginned, setLoginStatus] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeLink = ({ isActive }) =>
    isActive ? "text-blue-500" : "text-white";

  const goHome = () => {
    navigate("/");
  };

  const logout = async () => {
    dispatch(RESET());
    await dispatch(logoutUser());
    navigate("/login");
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  var user = JSON.parse(localStorage.getItem("user-info"));

  const checkLogin = () => {
    var current = Math.round(Date.now() / 1000);
    console.log(current);

    if (user != null) {
      if (current > user.token.exp) {
        setLoginStatus(false);
        localStorage.removeItem("user-info");
        // Validate Token and if error received then remove from cookies
      } else {
        setLoginStatus(true);
      }
    }
  };

  useEffect(() => {
    checkLogin();
    //login();
  }, []);

  // const [bookList, setBookList] = useState([]);

  // const login = async () => {
  //     let loginURL = "http://127.0.0.1:8000/api/login/";
  //     const response = await axios.post(loginURL, { "username": "priyanshugupta", "password": "1234" });
  //     console.log(response);
  // }

  /* When the user clicks on the button,toggle between hiding and showing the dropdown content */
  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (
      !event.target.matches(".circle") ||
      event.target.parentNode.matches(".circle")
    ) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  window.addEventListener("resize", showButton);
  return (
    <>
      <nav className="navbar">
        <div class="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <Link to="/" className="navbar-logo">
            Blog website
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                {!button && <i class="fas fa-home"></i>}Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/courses"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                {!button && <i class="fas fa-book"></i>}Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-links" onClick={closeMobileMenu}>
                {!button && <i class="fas fa-blog"></i>}Blog
              </Link>
            </li>
          </ul>
          <div class="nav-menu-right">
            <i class="fas fa-search"></i>
            <i class="far fa-bell"></i>
            <ShowOnLogin>
              {/* Profile with UserName */}
              <li className="flex items-center space-x-2 sm:space-x-1">
                <FaUserCircle size={30} className="sm:size-20" />
                <p className="sm:text-sm text-secondary">
                  <UserName />
                </p>
              </li>
            </ShowOnLogin>
            <ShowOnLogout>
              <li>
                <Link to="/login" className="login-link">
                  {button && !isloginned && (
                    <Button buttonStyle="btn--secondary" to="/login">
                      Login
                    </Button>
                  )}
                </Link>
              </li>
              <Link to="/register" className="signup-link">
                {button && !isloginned && <Button>Signup</Button>}
              </Link>
            </ShowOnLogout>

            <ShowOnLogin>
              <li className=" mt-3 sm:mt-8 sm:text-sm ">
                <NavLink to="/profile" className={activeLink}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-600 mt-3 sm:mt-7 sm:text-sm px-4 py-2 sm:px-2 sm:py-1 rounded sm:invisible login-link"
                >
                  Logout
                </button>
              </li>
            </ShowOnLogin>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
