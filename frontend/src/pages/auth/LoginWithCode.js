import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { AiOutlineMail } from "react-icons/ai";
import styles from "./auth.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { GrInsecure } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import { isAction } from "@reduxjs/toolkit";
import Loader from "../../components/loader/Loader";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  console.log(email);
  const navigate = useNavigate();

  const { isSuccess, isLoading, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }
    const code = {
      loginCode,
    };
    await dispatch(loginWithCode({ code, email }));
    await dispatch(RESET());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");

      toast.success(isAction.payload);
    }

    dispatch(RESET());
    toast.success(isAction.payload);
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className={` ${styles.auth} bg-gray-100`}>
      <Card>
        <ToastContainer />
        {isLoading && <Loader />}
        <div className={styles.form}>
          <div className="--flex-center">
            <GrInsecure size={35} color="#999" />
          </div>
          <h2>Enter Access Code</h2>

          <br />

          <form onSubmit={loginUserWithCode}>
            <input
              type="text"
              placeholder="Access Code"
              required
              name="loginCode"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />

            <button className="--btn --btn-block bg-black text-white">
              Proceed To Login
            </button>
            <span className="--flex-center">
              Check your email for login access code
            </span>
            <div className={styles.links}>
              <p>
                <Link className="text-secondary font-bold" to="/">
                  - Home
                </Link>
              </p>
              <p
                onClick={sendUserLoginCode}
                className="v-link "
                style={{ color: "green" }}
              >
                <b>Resend Code</b>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
