import React, { useEffect, useLayoutEffect, useState } from "react";
import profileImg from "../../assets/avatarr.png";
import "./Profile.css";
import PageMenu from "../../components/pageMenu/PageMenu";
import { toast, ToastContainer } from "react-toastify";
import RedirecLoggedOut from "../../customHook/RedirecLoggedOut";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsByProjectId,
  getData,
  getUser,
  selectUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Notification from "../../components/notification/Notification";
import PhoneInput from "react-phone-input-2"; // Import the phone input library
import "react-phone-input-2/lib/style.css";
import { FaUserCircle } from "react-icons/fa";

const cloud_name = "dambuxy6f";

const upload_preset = "ml_default";

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortendText = text.substring(0, n).concat("...");

    return shortendText;
  }
  return text;
};

const Profile = () => {
  RedirecLoggedOut("/login");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const { isSuccess, isLoading, info, isLoggedIn, message, user } = useSelector(
    (state) => state.auth
  );
  const comments = useSelector((state) => state.auth.comments);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "Fira@gmail.com",
    phone: user?.phone || "",
    bio: user?.value || "",
    photo: user?.photo || "avatar",
    role: user?.role || "",
    isVerified: "",
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchCommentsByProjectId());
    if (!info) {
      dispatch(getData());
    } else {
      const { projects } = info || {};

      if (info?.projects && info.projects.length > 0) {
        dispatch(
          fetchCommentsByProjectId(info.projects[selectedItemIndex]?._id)
        );
      }
    }
  }, [dispatch, info, selectedItemIndex]);

  const [profile, setProfile] = useState(initialState);

  const [profileImage, setProfileImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setProfile({ ...profile, phone: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    // if (profileImage !== null && profileImage.type.match(/image\/(jpg|jpeg|png)/)) {
    //   const image = new FormData();
    //   image.append("file", profileImage);
    //   image.append("cloud_name", cloud_name);
    //   image.append("upload_preset", upload_preset);

    try {
      // // Save image to Cloudinary
      // const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, image);
      // const { secure_url } = response.data;
      // console.log(secure_url);

      // Save profile to MongoDB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        // photo: profileImage ? secure_url : profile.photo,
      };
      await dispatch(updateUser(userData));

      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        photo: user.photo,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  const UserName = () => {
    const user = useSelector(selectUser);

    const username = user?.name || "...";
    toast.success(user);

    return <p className="text-black">👋Hi, {shortenText(username, 5)} |</p>;
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="">
        {isLoading && <Loader />}
        {!profile.isVerified && <Notification />}
        <PageMenu />
        <ToastContainer />
        <h2>.</h2>
        <div className="--flex-start profile">
          <div className="card">
            <>
              <div className="profile-photo">
                <FaUserCircle size={80} className="sm:size-20" />

                <h3>Role: {profile?.role}</h3>
              </div>
              <div className="profile-photo"></div>
              <form onSubmit={saveProfile}>
                <p></p>
                <p>
                  <label>Name:</label>
                  <input
                    type="text"
                    accept="image/*"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>Email:</label>
                  <input
                    type="text"
                    accept="image/*"
                    name="email"
                    value={profile?.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </p>
                <p>
                  <label>Phone:</label>
                  <PhoneInput
                    name="phone"
                    country={"us"} // Set default country
                    value={profile?.phone}
                    onChange={handlePhoneChange}
                  />
                </p>
                <p>
                  <label>Bio</label>
                  <textarea
                    type="text"
                    accept="image/*"
                    value={profile?.bio}
                    onChange={handleInputChange}
                    name="bio"
                    cols="30"
                    rows="10"
                  ></textarea>
                </p>
                <button className="--btn --btn-primary --btn-block bg-black text-white">
                  Update Profile
                </button>
              </form>
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";
  toast.success(user);

  return <p className="text-black">👋Hi, {shortenText(username, 5)} |</p>;
};

export default Profile;
