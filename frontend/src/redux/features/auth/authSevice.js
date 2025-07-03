import axios from "axios";
import { useTransition } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/auth/`;

const getData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/auth/getData");
    console.log("Full response:", response); // Log the entire response
    console.log("Response data:", response.data); // Log just the data portion
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or handle the error as needed
  }
};

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  return response.data;
};
console.log(register);

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  return response.data;
};
// Validate email
const logoutUser = async () => {
  const response = await axios.get(API_URL + "logout");

  return response.data.message;
};

// Get Login Status
const getLoginStatus = async (userData) => {
  const response = await axios.get(API_URL + "loginStatus", userData);
  console.log(userData);

  return response.data;
};

// Get Login Status
const getUser = async (userData) => {
  const response = await axios.get(API_URL + "getUser", userData);

  console.log(userData);
  return response.data;
};

// Update User Status
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);

  return response.data;
};

// send Verification Email
const sendVerificationEmail = async (userData) => {
  const response = await axios.post(
    API_URL + "sendVerificationEmail",
    userData
  );

  return response.data;
};

// send Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};
// Change Password!
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

// Change Password!
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);
  console.log(response);
  toast.success(response);

  return response.data.message;
};

// Reset Password!
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );
  console.log(response);
  toast.success(response.data.message);

  return response.data.message;
};

//  Get Allusers

const getAllUser = async () => {
  const response = await axios.get(API_URL + "usersregister");
  return response.data;
};

//  DeletUsers
const deletUser = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

//  Upgrade Users
const upgradeUser = async (userData) => {
  const response = await axios.patch(API_URL + "upgradeUser", userData);
  return response.data.message;
};

//  Login code Users
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendLogicalCode/${email}`);
  return response.data.message;
};

//  Login With Code

const loginWithCode = async (email, code) => {
  const dataToSend = { loginCode: code.loginCode };

  // Log the data that is being sent to the backend
  console.log("Data sent to the backend:", dataToSend);

  const response = await axios.post(
    API_URL + `loginWithCode/${email}`,
    dataToSend
  );
  return response.data;
};

//  Login code Users
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + "google/callback", userToken);
  return response.data.message;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const authService = {
  register,
  getData,
  login,
  logoutUser,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAllUser,
  deletUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};

export default authService;
