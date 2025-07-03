import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { MdPassword } from "react-icons/md";

import styles from "./auth.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";
import { isAction } from "@reduxjs/toolkit";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const Reset = () => {
  const initialState = {
    password: "",
    password2: "",
  };

  const { isSuccess, isLoading, isLoggedIn, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reset = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password are not matched!");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      toast.error("Please add a special character to your password!");
      return;
    }
    if (!password.match(/([0-9])/)) {
      toast.error("Use at least one number in your password!");
      return;
    }
    if (!password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      toast.error("Please use both lowercase and uppercase letters!");
      return;
    }

    const userData = {
      password,
    };
    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message.includes("reset Succesfully")) {
      navigate("/login");

      toast.success(isAction.payload);
    }
    dispatch(RESET());
    toast.success(isAction.payload);
  }, [dispatch, navigate, isSuccess, message]);

  return (
    <div className={` ${styles.auth} bg-gray-100`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <br />

          <form onSubmit={reset}>
            <PasswordInput
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <PasswordInput
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
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
            <button className="--btn --btn-primary --btn-block bg-black text-white">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link className="text-secondary font-bold" to="/">
                  - Home
                </Link>
              </p>
              <p>
                <Link className="text-green-500 font-bold" to="/login">
                  - Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
