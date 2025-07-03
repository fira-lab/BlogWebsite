import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { FiLogIn } from "react-icons/fi";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { TiUserAddOutline } from "react-icons/ti";
import { FaTimes, FaYoutube } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../redux/features/auth/authSevice";
import { RESET, register } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  password2: "",
  age: "",
};

const Register = () => {
  const handleCopyCut = (e) => {
    e.preventDefault();
    toast.info("Cannot copy or cut from this field");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    toast.info("Cannot paste into this field");
  };

  const [formData, setFormData] = useState(initialState);
  const { name, lastname, email, password, password2, age } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, isLoggedIn, message } = useSelector(
    (state) => state.auth
  );

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timeIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const SwitchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timeIcon;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Village elder: Preparing registration letter:", formData);

    if (!name || !lastname || !email || !password || !age) {
      toast.error("All fields are required");
      console.log("Village elder: Missing fields in formData:", {
        name,
        lastname,
        email,
        password,
        age,
      });
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      console.log("Village elder: Password too short:", password.length);
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email");
      toast.error("please, enter a valid email!");
      console.log("Village elder: Invalid email:", email);
      return;
    }
    if (password !== password2) {
      toast.error("Passwords do not match");
      console.log("Village elder: Passwords do not match:", {
        password,
        password2,
      });
      return;
    }
    if (!password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      toast.error("please add a special character in your password!");
      console.log("Village elder: Missing special character in password");
      return;
    }
    if (!password.match(/([0-9])/)) {
      toast.error("use at least any number in your password!");
      console.log("Village elder: Missing number in password");
      return;
    }
    if (!password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      toast.error("please use both uppercase and lowercase!");
      console.log("Village elder: Missing uppercase/lowercase in password");
      return;
    }
    if (isNaN(age) || parseInt(age) < 12) {
      toast.error("Age must be a number and at least 12 years");
      console.log("Village elder: Invalid age:", age);
      return;
    }

    const userData = {
      name,
      lastname,
      email,
      password,
      age: parseInt(age), // Convert age to number
    };

    console.log(
      "Village elder: Sending registration letter to city:",
      userData
    );
    try {
      await dispatch(register(userData)).unwrap();
      console.log(
        "Village elder: Messenger returned with successful registration:",
        userData
      );
    } catch (error) {
      console.error(
        "Village elder: Messenger failed to deliver registration:",
        error
      );
    }
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      console.log(
        "Village elder: Registration successful, navigating to profile"
      );
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
  }, [password]);

  useEffect(() => {
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
  }, [password]);

  useEffect(() => {
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setChar(true);
    } else {
      setChar(false);
    }
  }, [password]);

  useEffect(() => {
    if (password.length >= 8) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  useEffect(() => {
    setShowOverlay(true);
    setOverlayTimer(setTimeout(() => setShowOverlay(false), 15000));
    return () => clearTimeout(overlayTimer);
  }, []);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTimer, setOverlayTimer] = useState(null);

  const [youTubeLinkClicked, setYouTubeLinkClicked] = useState(false);
  const handleClick = () => {
    clearTimeout(overlayTimer);
    setShowOverlay(false);
  };

  return (
    <div className={` ${styles.auth} bg-gray-100`}>
      {isLoading && <Loader />}
      <ToastContainer />
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={55} color="#112" />
          </div>
          <h2>Register</h2>
          <br />
          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <PasswordInput
              type="password"
              placeholder="Password"
              required
              name="password"
              onCopy={handleCopyCut}
              onPaste={handlePaste}
              value={password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <PasswordInput
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              onCopy={handleCopyCut}
              value={password2}
              onPaste={handlePaste}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Age"
              required
              name="age"
              value={age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Card cardClass={styles.group}>
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {SwitchIcon(uCase)}
                    Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {SwitchIcon(num)}
                    Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {SwitchIcon(sChar)}
                    Special Character (!@#$^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {SwitchIcon(passLength)}
                    At least 8 Characters
                  </span>
                </li>
              </ul>
            </Card>
            <button
              type="submit"
              className="--btn bg-black text-white --btn-block text-red-500"
            >
              Register
            </button>
          </form>
          <Link className="text-blue-500" to="/forgot">
            Forgot Password?
          </Link>
          <span className={styles.register}>
            <Link className="text-secondary pr-10 font-poppins" to="/">
              Home
            </Link>
            <p className="">Already have an account? </p>
            <Link
              className="text-green-500 pl-10 font-poppins"
              to="/login"
              element={<Register />}
            >
              Login
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
