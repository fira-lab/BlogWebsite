import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

const CommentActions = ({ comment, index, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  // Fetch the logged-in user's id from the Redux store
  const loggedInUserId = useSelector((state) => state.auth.user?._id);

  // Safely extract the userId
  const commentUserId = comment?.userId?._id || comment?.userId;

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(index, editContent);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="border p-1 rounded text-black"
          />
          <button type="submit" className="bg-blue-500 text-white px-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-2 text-red-500"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex items-center">
          {loggedInUserId === commentUserId && ( // Compare with commentUserId
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:underline"
              >
                <CiEdit size={24} />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="ml-2 text-red-500 hover:underline"
              >
                <MdDeleteSweep size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentActions;
