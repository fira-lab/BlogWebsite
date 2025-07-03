import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { getAllUser, upgradeUser } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { EMAIL_RESET, sendAuto } from "../../redux/features/email/emailSlice";
import Loader from "../loader/Loader";

const ChangeRole = ({ _id, email }) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error("Please select a role");
      return;
    }
    setIsLoading(true);

    try {
      const userData = {
        role: userRole,
        id: _id,
      };
      const emailData = {
        subject: "Account-Role-Updated - 2FA",
        send_to: email,
        reply_to: "noreply@eagleDemy.com",
        template: "roleChanged",
        url: "/login",
      };

      await dispatch(upgradeUser(userData));
      setIsLoading(false);
      await dispatch(sendAuto(emailData));
      await dispatch(getAllUser());
      await dispatch(EMAIL_RESET());

      toast.success("Role updated successfully!");
    } catch (error) {
      toast.error("Failed to update role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      {isLoading && <Loader />}
      <ToastContainer />
      <form
        className="flex items-center gap-4 bg-white p-4 shadow-lg rounded-md"
        onSubmit={changeRole}
      >
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="w-48 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--- select ---</option>
          <option value="subscriber">Subscriber</option>
          <option value="author">Author</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="Head Cordinator">Head cordinator</option>
          <option value="cordinator">cordinator</option>

          <option value="suspended">Suspended</option>
        </select>
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <FaCheck size={15} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;
