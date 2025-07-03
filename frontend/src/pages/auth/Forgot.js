import React, { useState } from "react";
import Card from "../../components/card/Card";
import { AiOutlineMail } from "react-icons/ai";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authSevice";
import { RESET, forgotPassword } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const forgot = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!email) {
        return toast.error("APlease enter an email");
      }

      if (!validateEmail) {
        return toast.error("please enter a valid email");
      }

      const userData = {
        email,
      };

      await dispatch(forgotPassword(userData));
      await dispatch(RESET(userData));
    } catch (error) {
      toast.error("Failed! please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={` ${styles.auth} bg-gray-100`}>
      {isLoading && <Loader />}
      <ToastContainer />
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <br />

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link className="text-secondary text-semibold" to="/">
                  - Home
                </Link>
              </p>
              <p>
                <Link className="text-green-500 text-semibold" to="/login">
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

export default Forgot;
