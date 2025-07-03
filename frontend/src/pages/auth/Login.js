import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { FiLogIn } from "react-icons/fi";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../redux/features/auth/authSevice";
import { ToastContainer, toast } from "react-toastify";
import {
  RESET,
  login,
  loginWithCode,
  loginWithGoogle,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { isAction } from "@reduxjs/toolkit";
import { GoogleLogin } from "@react-oauth/google";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, isLoggedIn, message, twoFactor, isError } =
    useSelector((state) => state.auth);

  // login With Google

  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse);

    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
    }
    // Add your logic for handling form submission here
    const userData = {
      email,
      password,
    };
    // console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/projects");

      toast.success(isAction.payload);
    }
    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }
    dispatch(RESET());
    toast.success(isAction.payload);
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email]);

  return (
    <div className={` ${styles.auth} bg-gray-100`}>
      {isLoading && <Loader />}
      <ToastContainer />

      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <FiLogIn size={35} color="#112" />
          </div>
          <h2>Login</h2>
          <div className="--flex-center">
            {/* <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log("Login Failed");
                toast.error("Login Failed");
              }}
            /> */}
          </div>

          <br />
          <p className="--text-center --fw-bold"></p>

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            {/*<input 
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
              />*/}
            <button
              type="submit"
              className="--btn --btn-block bg-black text-white"
            >
              Login
            </button>
          </form>
          <span className="text-blue-700">
            <Link to="/forgot">Forgot Password?</Link>
          </span>
          <span className={styles.register}>
            <Link className="text-secondary text-semibold mr-10" to="/">
              Home
            </Link>
            <p> &nbsp; Don't have an account? &nbsp; </p>
            <Link className="text-green-600 text-semibold ml-10" to="/register">
              Register
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
