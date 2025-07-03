import React, { useState } from "react";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import RedirecLoggedOut from "../../customHook/RedirecLoggedOut";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  RESET,
  changePassword,
  logoutUser,
} from "../../redux/features/auth/authSlice";
import { FaSpinner } from "react-icons/fa";
import { sendAuto } from "../../redux/features/email/emailSlice";

const initialState = {
  oldPassword: "",
  password: "",

  password2: "",
};

const ChangePassword = () => {
  RedirecLoggedOut("/login");

  const { isSuccess, isLoading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      toast.error("All fields are required");
      return;
    }
    if (password !== password2) {
      return toast.error("Password are not matched!");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
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

    const userData = { oldPassword, password };
    const emailData = {
      subject: "Password-Changed --2FA:",
      send_to: user.email,
      reply_to: "noreply@eagleDeamy.com",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAuto(emailData));
    await dispatch(logoutUser());
    await dispatch(RESET());
    navigate("/login");
  };

  return (
    <>
      <section className="min-h-screen bg-gray-100 py-10   font-poppins">
        <div className=" mx-auto px-4">
          <PageMenu />
          <ToastContainer />
          <h2 className="text-4xl text-black font-bold text-center mb-6">
            Change Password
          </h2>
          <div className="flex justify-center    ">
            <Card cardClass="  p-28 shadow-lg bg-green rounded-lg">
              <form
                onSubmit={updatePassword}
                className="space-y-6 w-[300px] h-[700px]"
              >
                <div className="">
                  <label className="block text-3xl text-black  mb-2">
                    Current Password
                  </label>
                  <PasswordInput
                    type="password"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleInputChange}
                    className="w-full h-full px-4 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-3xl  text-black  mb-2 text-2xl  ">
                    New Password
                  </label>
                  <PasswordInput
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-3xl  text-black  mb-2 text-2xl">
                    Confirm New Password
                  </label>
                  <PasswordInput
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  {isLoading ? (
                    <FaSpinner
                      className="animate-spin text-blue-500 mx-auto"
                      size={24}
                    />
                  ) : (
                    <button
                      type="submit"
                      className="w-full h-100 bg-primary w-full text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
