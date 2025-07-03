import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

const ReplyActions = ({ reply, index, replyIndex, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.text);

  // Fetch the logged-in user's id from the Redux store
  const loggedInUserId = useSelector((state) => state.auth.user?._id);

  // Check if reply.userId is an object and extract _id if necessary
  const replyUserId = reply.userId._id ? reply.userId._id : reply.userId;

  // Update the editContent when the reply prop changes
  useEffect(() => {
    setEditContent(reply.text);
  }, [reply]);

  const handleEditReply = (e) => {
    e.preventDefault();
    if (!editContent.trim()) {
      return;
    }
    onEdit(editContent);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col mt-[-10px] justify-between items-center w-full">
      {isEditing ? (
        <div className="w-full flex justify-end">
          <form onSubmit={handleEditReply} className="flex items-center space-x-2">
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="text-black border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              placeholder="Edit your reply..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 text-red-500 hover:text-red-600 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {loggedInUserId === replyUserId && (
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out"
                title="Edit reply"
              >
                <CiEdit size={24} />
              </button>
              <button
                onClick={() => onDelete()}
                className="text-red-500 hover:text-red-600 transition duration-200 ease-in-out"
                title="Delete reply"
              >
                <MdDeleteSweep size={24} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
  

export default ReplyActions;
