import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import debounce from "lodash/debounce";

import {
  addReplyToComment,
  createComment,
  deleteComment,
  deleteReply,
  editComment,
  editReply,
  fetchCommentsByProjectId,
  getComments,
  selectUser,
  getUser,
  reactToComment,
} from "../../redux/features/auth/authSlice";
import { getData } from "../../redux/features/auth/authSlice";
import {
  FaTelegramPlane,
  FaTiktok,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

import { FaThumbsUp, FaHeart, FaLaugh, FaLightbulb } from "react-icons/fa";
import PageMenu from "../../components/pageMenu/PageMenu";
import Header from "../../components/Header/Header";
import { CommentName } from "../../pages/profile/Profile"; // Import UserName
import ShareButton from "./ShareButton";
import Confetti from "react-confetti"; // Import confetti package
import { toast, ToastContainer } from "react-toastify";
import CommentActions from "./CommentActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
import ReplyActions from "./ReplyActions";
import Footer from "../../pages/home/components/Footer.js";
import eagleDemy from "../../assets/eagleDemy.png";
import CopyButton from "./CopyButton";
import Subscribed from "../../components/Subscribed.js";
dayjs.extend(relativeTime); // Extend dayjs with the relativeTime plugin

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortendText = text.substring(0, n).concat("...");

    return shortendText;
  }
  return text;
};
const Projects = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [buttonText, setButtonText] = useState("Post");
  const [replyText, setReplyText] = useState("Reply");
  const [loading, setLoading] = useState(false); // Track loading state

  const [replies, setReplies] = useState({});
  const [replyInputVisible, setReplyInputVisible] = useState({});
  const [newReply, setNewReply] = useState("");
  const [celebrate, setCelebrate] = useState(false); // State for celebration effect
  const dispatch = useDispatch();
  const [commentss, setComments] = useState([]); // State for storing comments
  const [updatedComment, setUpdatedComment] = useState(null); // State for updated comment
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0); // Track progress

  const [buttonClass, setButtonClass] = useState(
    "mt-10 sm:mt-2 px-10 sm:px-6 py-3 text-lg lg:text-xl sm:text-sm border-2 border-secondary rounded-lg shadow-lg hover:bg-secondary hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
  );

  const { info, isLoading, error, user, comments } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!info) {
      dispatch(getData());
      console.log(info, "info");
    } else {
      const { projects } = info || {};

      if (
        projects &&
        projects.length > 0 &&
        selectedItemIndex < projects.length
      ) {
        dispatch(fetchCommentsByProjectId(projects[selectedItemIndex]._id));
      }
    }
  }, [dispatch, info, selectedItemIndex]);

  const { projects } = info || {};

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [user]);
  const [reactionCounts, setReactionCounts] = useState(
    Array(comments.length).fill({
      like: 0,
      love: 0,
      celebrate: 0,
      insightful: 0,
    })
  );
  const [userReactions, setUserReactions] = useState(
    Array(comments.length).fill(undefined)
  );

  useEffect(() => {
    if (comments) {
      setReactionCounts(Array(comments.length).fill({}));
      setUserReactions(Array(comments.length).fill(null));
    }
  }, [comments]);

  // Function to format time as "2 minutes ago"
  const formatTimeAgo = (timestamp) => {
    return dayjs(timestamp).fromNow(); // Use dayjs to format time
  };

  // Real-time updates (optional) to re-render every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setComments((prevComments) => [...prevComments]); // Trigger re-render every minute
    }, 60000); // 1 minute interval

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Effect to fetch data and comments

  // Effect to compute reaction counts

  // Effect to fetch comments directly
  useEffect(() => {
    dispatch(fetchCommentsByProjectId())
      .then(() => {
        console.log("Comments fetched successfully.");
      })
      .catch((error) => {
        toast.error("Failed to fetch comments.");
      });
  }, [dispatch]);

  // Effect to compute reaction counts
  useEffect(() => {
    if (Array.isArray(comments) && comments.length > 0) {
      try {
        const counts = comments.map((comment) => {
          const reactionCount = {
            like: 0,
            love: 0,
            celebrate: 0,
            insightful: 0,
          };

          // Safely check if 'reactions' is an array before accessing it
          if (Array.isArray(comment.reactions)) {
            comment.reactions.forEach((reaction) => {
              if (reaction.reaction === "like") reactionCount.like += 1;
              if (reaction.reaction === "love") reactionCount.love += 1;
              if (reaction.reaction === "celebrate")
                reactionCount.celebrate += 1;
              if (reaction.reaction === "insightful")
                reactionCount.insightful += 1;
            });
          }

          return reactionCount;
        });

        // Store the reaction counts in state
        setReactionCounts(counts);
        setUserReactions(new Array(comments.length).fill(null)); // Initialize reactions for each comment
      } catch (error) {
        console.error("Error processing comment reactions:", error);
        toast.error("Failed to process comment reactions.");
      }
    } else {
      console.warn("No comments available or comments are not an array.");
    }
  }, [comments]);

  // Function to handle reacting to a comment
  const handleReaction = async (commentId, reactionType) => {
    console.log("handleReaction called with:", commentId, reactionType);

    try {
      if (!comments || comments.length === 0) {
        toast.error("No comments available to react to.");
        return; // Exit if there are no comments
      }

      // Log the current comments state

      // Optimistically update the UI
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            reactions: [
              ...(comment.reactions || []),
              { reaction: reactionType },
            ],
          };
        }
        return comment;
      });

      // Update local state
      setComments(updatedComments);

      // Fetch and save reaction to the backend
      const projectId = updatedComments[0]._projectId; // Ensure this line correctly accesses your project ID

      await Promise.all([
        dispatch(reactToComment(commentId, reactionType)),
        dispatch(fetchCommentsByProjectId(projectId)),
      ]);
    } catch (error) {
      toast.error("An error occurred while processing your reaction.");

      // Optionally, revert the comments to their previous state if necessary
      setComments(comments); // Revert if needed
    }
  };

  const linkToShare = "https://eagledemy.vercel.app/";

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    setIsVideoLoading(true);
    dispatch(fetchCommentsByProjectId(projects[index]._id)); // Fetch comments for the selected project(

    setTimeout(() => {
      Aos.init({ duration: 1000, once: true });
      Aos.refresh();
    }, 100);
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleReactionClick = debounce(async (index, reaction, projectId) => {
    const comment = comments[index]; // Get the specific comment
    const commentId = comment?._id; // Use _id for the comment ID

    // Check if commentId is valid
    if (!commentId) {
      toast.error("Comment ID is missing. Cannot react to the comment.");
      return;
    }

    // Fetch the current logged-in user's ID
    const result = await dispatch(getUser());
    if (result.meta.requestStatus !== "fulfilled") {
      toast.error("Failed to retrieve user information.");
      return;
    }

    const loggedInUserId = result.payload?._id; // Get the logged-in user's ID
    if (!loggedInUserId) {
      toast.error("Failed to retrieve user information.");
      return;
    }

    try {
      if (projectId) {
        // Dispatch the reaction action with the commentId and other details
        const reactionResult = await dispatch(
          reactToComment({
            commentId,
            projectId,
            userId: loggedInUserId,
            reaction,
          })
        );

        // Check the result of the reaction dispatch
        if (reactionResult.meta.requestStatus === "fulfilled") {
          // Set celebration state and show corresponding toast message with emojis
          let message; // Initialize message variable

          switch (reaction) {
            case "celebrate":
              message = "🎉 Celebrate the moment! 🎉";
              break;
            case "like":
              message = "👍 Liked it! 🎉";
              break;
            case "love":
              message = "❤️ Loved it! 💖";
              break;
            case "insightful":
              message = "💡 Insightful! 🎊";
              break;
            default:
              message = "Reacted!";
          }

          // Trigger confetti celebration
          setCelebrate(true);
          toast.success(message);

          // Refresh comments after reacting
          dispatch(fetchCommentsByProjectId(projectId));

          // Reset the celebration state after a short delay
          setTimeout(() => {
            setCelebrate(false); // Reset the celebration state to false after confetti is shown
          }, 4000); // Adjust this duration to control how long the confetti lasts
        } else {
          toast.error("Failed to add reaction.");
        }
      } else {
        console.error("Project ID is undefined from the reaction response");
      }
    } catch (error) {
      toast.error("Failed to react. Try again.");
    }
  }, 300); // Debounce for 300ms

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.warn("Your comment cannot be empty. Please add some content.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Exit the function without proceeding
    }
    setLoading(true); // Start loading
    setLoadingProgress(0); // Reset progress

    try {
      // Dispatch the getUser action to fetch the user data
      const result = await dispatch(getUser());
      console.log(result, "user Data");

      // Check if the getUser action was successful
      if (result.meta.requestStatus === "fulfilled") {
        const user = result.payload; // This is the user data returned by getUser
        const userId = user._id; // Assuming user data contains _id as the userId
        const userRole = user.role; // Extract the user's role

        console.log(userRole, "userrole");

        if (newComment.trim()) {
          const comment = {
            userId: userId, // Use the fetched userId here
            role: userRole, // Include the role in the comment
            projectId: projects[selectedItemIndex]._id,
            content: newComment,
            createdAt: new Date().toISOString(), // Add the timestamp locally
          };

          // Dispatch the action to create the comment
          dispatch(createComment(comment)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
              toast.success("Comment added successfully!");

              // Prepend the new comment to the local comments array
              setComments([result.payload, ...commentss]);

              // Optionally fetch the latest comments
              dispatch(
                fetchCommentsByProjectId(projects[selectedItemIndex]._id)
              );

              setNewComment(""); // Clear the input field
            } else {
              toast.error("Failed to add comment.");
            }
          });
        }
      } else {
        toast.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit the comment.");
    } finally {
      setLoading(false); // Set loading state to false after the process completes
    }
  };

  const handleReplySubmit = async (index, e) => {
    e.preventDefault();

    const comment = comments[index]; // Get the specific comment
    const commentId = comment._id; // Use _id for the comment ID
    console.log(commentId, "comment Id for replying"); // Log the comment ID for debugging

    if (!commentId) {
      console.error("Comment ID is undefined:", comment);
      toast.error("Comment ID is missing. Cannot submit the reply.");
      return;
    }

    if (newReply.trim()) {
      try {
        const userResult = await dispatch(getUser());

        if (userResult.meta.requestStatus === "fulfilled") {
          const user = userResult.payload;
          const reply = {
            userId: user._id,
            userName: user.name,
            text: newReply,
            createdAt: new Date().toISOString(),
          };

          console.log("Reply data:", reply); // Ensure reply data is correct

          const result = await dispatch(
            addReplyToComment({ commentId, reply })
          );

          if (result.meta.requestStatus === "fulfilled") {
            toast.info("Reply added successfully!");

            // Filter out null replies and add the new reply
            setComments((prevComments) =>
              prevComments.map((comment, idx) =>
                idx === index
                  ? {
                      ...comment,
                      replies: [
                        ...(comment.replies || []).filter((r) => r !== null),
                        reply,
                      ],
                    }
                  : comment
              )
            );
            setNewReply("");
          } else {
            toast.error("Failed to add reply.");
          }
        } else {
          toast.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error submitting reply:", error);
        toast.error("Failed to submit the reply.");
      }
    }
  };

  const toggleReplyInput = (index) => {
    setReplyInputVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEditComment = (index, updatedContent) => {
    const comment = comments[index]; // Get the specific comment
    const commentId = comment._id; // Use _id for the comment ID
    console.log(commentId, "comment Id for editing"); // Log the comment ID for debugging

    // Check if commentId is valid
    if (!commentId) {
      console.error("Comment ID is undefined:", comment);
      toast.error("Comment ID is missing. Cannot edit the comment.");
      return;
    }

    // Dispatch the editComment action with the commentId and updated content
    dispatch(editComment({ commentId, content: updatedContent })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Comment updated successfully!");
          // Optionally, refresh comments after editing
          dispatch(fetchCommentsByProjectId(projects[selectedItemIndex]._id));
        } else {
          toast.error("Failed to update comment.");
        }
      }
    );
  };

  const handleDeleteComment = async (index) => {
    const comment = comments[index]; // Get the specific comment
    const commentId = comment._id;
    console.log(comment._id, "comment Id now"); // Ensure this is the correct property for the ID

    // Check if commentId is valid
    if (!commentId) {
      console.error("Comment ID is undefined:", comment);
      toast.error("Comment ID is missing. Cannot delete the comment.");

      return;
    }

    const commentOwnerId = comment.userId._id
      ? comment.userId._id
      : comment.userId; // Ensure we extract the ID properly
    console.log("Comment userId who commented:", comment.userId);

    // Fetch the current logged-in user's ID
    const result = await dispatch(getUser());

    if (result.meta.requestStatus === "fulfilled") {
      const loggedInUserId = result.payload._id; // Get the logged-in user's ID
      console.log("Logged-in user ID:", loggedInUserId);

      // Check if the logged-in user is the owner of the comment
      if (loggedInUserId === commentOwnerId) {
        dispatch(deleteComment(commentId)).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("Comment deleted successfully!");
            // Optionally, refresh comments after deletion
            dispatch(fetchCommentsByProjectId(projects[selectedItemIndex]._id));
          } else {
            toast.error("Failed to delete comment.");
          }
        });
      } else {
        toast.error("You are not authorized to delete this comment.");
        console.error(
          "Authorization error: Logged-in user ID does not match comment owner ID."
        );
      }
    } else {
      toast.error("Failed to fetch user data.");
      console.error("Error fetching user data:", result.error);
    }
  };

  // Function to handle editing a reply
  const handleEditReply = (index, replyIndex, updatedContent) => {
    const comment = comments[index]; // Get the specific comment
    const reply = comment.replies[replyIndex]; // Get the specific reply
    const replyId = reply._id; // Use _id for the reply ID
    const commentId = comment._id; // Use _id for the comment ID

    console.log(commentId, "comment Id", replyId, "Reply Id");
    console.log(updatedContent, "This is the updated content");

    // Check if replyId, commentId, and updatedContent are valid
    if (!replyId || !commentId || !updatedContent.trim()) {
      console.error("Missing data for editing the reply:", {
        replyId,
        commentId,
        updatedContent,
      });
      toast.error(
        "Reply ID, Comment ID, or content is missing. Cannot edit the reply."
      );
      return;
    }

    // Dispatch the editReply action with replyId, commentId, and updated content
    dispatch(editReply({ replyId, commentId, text: updatedContent })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Reply updated successfully!");

          // Optionally, refresh comments after editing
          dispatch(fetchCommentsByProjectId(projects[selectedItemIndex]._id));
        } else {
          toast.error("Failed to update reply.");
        }
      }
    );
  };

  // Function to handle deleting a reply
  const handleDeleteReply = async (replyId, commentId) => {
    console.log(
      "Attempting to delete reply with ID:",
      replyId,
      "and comment ID:",
      commentId
    );

    if (!replyId || !commentId) {
      console.error(
        "Reply ID or Comment ID is missing. Cannot delete the reply."
      );
      toast.error(
        "Reply ID or Comment ID is missing. Cannot delete the reply."
      );
      return;
    }

    try {
      const result = await dispatch(getUser());
      if (result.meta.requestStatus === "fulfilled") {
        const loggedInUserId = result.payload._id;
        console.log("Logged-in user ID:", loggedInUserId);

        const reply = comments
          .flatMap((comment) => comment.replies)
          .find((reply) => reply._id === replyId);
        console.log("Found reply:", reply);

        if (!reply) {
          console.error("Reply not found.");
          toast.error("Reply not found.");
          return;
        }

        const replyOwnerId = reply.userId._id || reply.userId;

        if (loggedInUserId === replyOwnerId) {
          const deleteResult = await dispatch(
            deleteReply({ replyId, commentId })
          );
          console.log("Delete result:", deleteResult); // Log delete result

          if (deleteResult.meta.requestStatus === "fulfilled") {
            toast.success("Reply deleted successfully!");
            dispatch(fetchCommentsByProjectId(projects[selectedItemIndex]._id));
            console.log(
              fetchCommentsByProjectId(projects[selectedItemIndex]._id),
              "project id"
            );

            // setComments((prevComments) =>
            //   prevComments.map((comment) => ({
            //     ...comment,
            //     replies: comment.replies.filter((r) => r._id !== replyId),
            //   }))
            // );
          } else {
            toast.error("Failed to delete reply.");
            console.error("Delete action error:", deleteResult.error);
          }
        } else {
          toast.error("You are not authorized to delete this reply...");
          console.error(
            "Authorization error: Logged-in user ID does not match reply owner ID."
          );
        }
      } else {
        toast.error("Failed to fetch user data.");
        console.error("Error fetching user data:", result.error);
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("An error occurred while deleting the reply.");
    }
  };

  const renderMedia = (project) => {
    if (project.videoUrl) {
      return (
        <iframe
          width="560"
          height="315"
          src={`${project.videoUrl}?autoplay=0&mute=0&rel=0&controls=1`} // Autoplay is set to 0 to prevent auto-playing
          title={project.title}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mt-12 h-[300px] w-90 sm:h-[220px] sm:w-full sm:px-3 md:w-[500px]"
          data-aos="fade-down"
          data-aos-delay="400"
          key={selectedItemIndex}
          onLoad={handleVideoLoad}
          style={{ display: isVideoLoading ? "none" : "block" }}
        ></iframe>
      );
    } else {
      return (
        <img
          src={project.image}
          alt={project.title}
          className="mt-12 h-[300px] w-90 sm:h-[220px] sm:w-full sm:px-3 md:w-[500px]"
          data-aos="fade-down"
          data-aos-delay="400"
          key={selectedItemIndex}
          onLoad={handleVideoLoad}
        />
      );
    }
  };

  const handleButtonClick = () => {
    setButtonText(
      <div className="flex items-center hover:bg-transparent">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
          ></path>
        </svg>
        Processing...
      </div>
    );
    setIsButtonDisabled(true);
    setButtonClass(
      "mt-10 sm:mt-2 px-10 sm:px-6 py-3 text-lg lg:text-xl sm:text-sm border-2 border-secondary rounded-lg shadow-lg bg-transparent text-secondary transition duration-300 ease-in-out transform hover:scale-105"
    );

    setTimeout(() => {
      setButtonText("Download CV"); // Reset to "Download CV"
      setIsButtonDisabled(false);
      setButtonClass(
        "mt-10 sm:mt-2 px-10 sm:px-6 py-3 text-lg lg:text-xl sm:text-sm border-2 border-secondary rounded-lg shadow-lg hover:bg-secondary hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
      );
    }, 3000);
  };
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTimer, setOverlayTimer] = useState(null); // Timer state

  useEffect(() => {
    if (user?.role === "subscr") {
      setShowOverlay(true);
      setOverlayTimer(setTimeout(() => setShowOverlay(false), 15000)); // Set timer for 15 seconds

      toast.info(
        "To be a member, please subscribe to EagleDemy to get the resources and come back"
      );
      toast.info(
        "and update your profile bio saying you subscribed to EagleDemy"
      );
    }
    return () => clearTimeout(overlayTimer); // Clear timer on unmount
  }, [user]);

  const [youTubeLinkClicked, setYouTubeLinkClicked] = useState(false); // Track link click
  const handleClick = () => {
    clearTimeout(overlayTimer); // Clear the timer when the link is clicked
    setShowOverlay(false); // Close the overlay immediately
  };

  return (
    <div className="min-h-screen bg-black font-poppins">
      <div>
        <PageMenu />

        <ToastContainer />
        <SectionTitle title="Blogs" />
        <Subscribed
          isSubscribed={user?.role === "subscriber"} // Check role here
          handleClick={handleClick}
          youTubeLink="https://youtu.be/Y2jbZlt6Ezs?si=bJEcKzcpHad_4-u1" //Or pass it dynamically if needed
        />

        {"" ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">
            Failed to load projects. Please try again later.
          </p>
        ) : info && Array.isArray(projects) && projects.length > 0 ? (
          <div className="flex sm:flex-col md:flex-col sm:text-xl lg:text-2xl font-poppins lg:pl-16 md:pl-8 lg:pr-5 md:pr-3 sm:px-2">
            <div className="flex flex-col sm:flex-row md:flex-row gap-8 sm:gap-2 border-1-2 border-[#f97316] py-8 mt-12 sm:mt-4 space-y-5 sm:space-y-0 md:space-y-0 flex-1 sm:overflow-x-scroll md:overflow-x-scroll sm:scrollbar-hide md:scrollbar-hide sm:whitespace-nowrap md:whitespace-nowrap sm:w-full md:w-full">
              {projects.map((project, index) => (
                <div
                  key={project._id} // Use a unique key, not the index
                  onClick={() => handleItemClick(index)}
                  className={`cursor-pointer px-3 py-2 ${
                    selectedItemIndex === index
                      ? "text-secondary  border-l-2 border-secondary"
                      : "text-white"
                  }`}
                >
                  <h2 className="sm:text-xl lg:text-3xl text-secondary sm:gap-1 md:gap-2 font-semibold font-poppins">
                    {project.title}
                  </h2>
                </div>
              ))}
            </div>
            {showOverlay && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                  <p className="text-center mb-4">
                    Subscribe to EagleDemy to get the resources and come back
                  </p>
                  <a
                    href="https://youtu.be/Y2jbZlt6Ezs?si=2175dyY7UJwX_Ubz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 underline flex items-center justify-center"
                  >
                    <FaYoutube size={25} className="mr-2" />
                    eagledemy youtube
                  </a>
                </div>
              </div>
            )}

            <div className="sticky top-10 lg:top-40">
              <div className="flex gap-10 md:gap-5 sm:flex-col lg:pl-20 md:pl-0 sm:px-0 sm:mt-4 sm:text-1xl ">
                {isVideoLoading && <Loader />}
                {renderMedia(projects[selectedItemIndex])}

                <div
                  className="flex-1 flex-col gap-5 sm:gap-2 mt-12 sm:mt-6 sm:text-xl shadow border-r-2 border-b-2 shiny-border3 sm:p-0 w-full mb-3"
                  key={`details-${selectedItemIndex}`}
                >
                  {projects[selectedItemIndex] && (
                    <div
                      className="p-6 md:p-2 rounded-lg shadow-lg text-white font-poppins"
                      data-aos="fade-down"
                      data-aos-delay="1000"
                    >
                      <h2 className="text-4xl mb-4 text-secondary font-bold font-poppins">
                        {projects[selectedItemIndex].title}
                      </h2>
                      <p className="mb-4 sm:mb-2 text-2xl font-poppins font-semibold sm:text-base text-white leading-relaxed">
                        {projects[selectedItemIndex].description}
                      </p>

                      {projects[selectedItemIndex] &&
                        projects[selectedItemIndex].texts &&
                        projects[selectedItemIndex].texts.filter((text) => text)
                          .length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-2xl font-bold text-blue-900">
                              Copy
                            </h3>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* Render each valid text item within a CopyButton inside a grid */}
                              {projects[selectedItemIndex].texts
                                // Filter out null or empty texts
                                .map((text, index) => (
                                  <CopyButton key={index} text={text} />
                                ))}
                            </div>
                          </div>
                        )}

                      {projects[selectedItemIndex].linkMetadata && (
                        <div className="mt-6">
                          <h3 className="text-2xl font-bold text-blue-900">
                            Link Previews
                          </h3>
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Use grid for layout */}
                            {projects[selectedItemIndex].linkMetadata.map(
                              (metadata, index) => (
                                <a
                                  key={index}
                                  href={metadata.url || "#"} // Ensure there's a link to navigate to
                                  target="_blank" // Opens in a new tab
                                  rel="noopener noreferrer" // Security feature
                                  className="bg-gray-800 rounded-lg p-4 transition-transform transform hover:scale-105 shadow-lg flex flex-col items-center" // Card Style with flex
                                >
                                  {metadata.image && (
                                    <img
                                      src={metadata.image}
                                      alt="Preview"
                                      className="w-full h-32 object-cover rounded-lg mb-2" // Image styling with fixed height
                                    />
                                  )}
                                  {metadata.title && (
                                    <h4 className="text-xl font-semibold text-white text-center">
                                      {metadata.title}
                                    </h4>
                                  )}
                                  {metadata.description && (
                                    <p className="text-base text-gray-300 mt-1 text-center">
                                      {metadata.description}
                                    </p>
                                  )}
                                </a>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Reaction Section */}
                      <div className="flex gap-4 my-1">
                        {["telegram", "tiktok", "facebook", "youtube"].map(
                          (platform) => (
                            <a
                              key={platform}
                              href={
                                platform === "telegram"
                                  ? "https://t.me/firaResource"
                                  : platform === "tiktok"
                                  ? "https://www.tiktok.com/@eagledemy?_t=8qwVpndyYWD&_r=1"
                                  : platform === "facebook"
                                  ? "https://www.facebook.com/your-facebook-profile"
                                  : "https://youtu.be/eALx0wqM18g?si=99sdLiNcqZ2vRzAC"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center "
                            >
                              {platform === "telegram" && (
                                <FaTelegramPlane
                                  size={25}
                                  className="mr-1 text-blue-600  hover:mb-3 transition-[margin-bottom] duration-300 ease-in-out"
                                />
                              )}
                              {platform === "tiktok" && (
                                <FaTiktok
                                  size={20}
                                  className="mr-1 text-white  hover:mb-3 transition-[margin-bottom] duration-300 ease-in-out"
                                />
                              )}
                              {platform === "facebook" && (
                                <FaFacebook
                                  size={25}
                                  className="mr-1 text-blue-500  hover:mb-3 transition-[margin-bottom] duration-300 ease-in-out"
                                />
                              )}
                              {platform === "youtube" && (
                                <FaYoutube
                                  size={25}
                                  className="mr-1 text-red-500  hover:mb-3 transition-[margin-bottom] duration-300 ease-in-out"
                                />
                              )}
                            </a>
                          )
                        )}
                        <div className="p-4 mt-12">
                          <ShareButton link={linkToShare} />
                          <h1 className="text-lg font-semibold">
                            Share this Link
                          </h1>
                        </div>
                      </div>

                      <div className="bg-gray-900 text-white p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Comments</h3>
                        <form
                          onSubmit={handleCommentSubmit}
                          className="mb-4 flex flex-col"
                        >
                          <textarea
                            className="p-2 mb-2 text-black rounded-md"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <button
                            type="submit"
                            className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center ${
                              loading ? "cursor-not-allowed opacity-50" : ""
                            }`}
                            disabled={loading} // Disable the button while loading
                          >
                            {loading ? (
                              <div className="flex items-center">
                                <svg
                                  className="animate-spin h-5 w-5 mr-3 text-white"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                                  ></path>
                                </svg>
                                Processing...
                              </div>
                            ) : (
                              "Post"
                            )}
                          </button>
                        </form>
                        {console.log(
                          "Comments being rendered:",
                          updatedComment ? [updatedComment] : comments
                        )}

                        {(updatedComment ? [updatedComment] : comments)?.map(
                          (comment, index) => (
                            <div
                              key={comment._id} // Use comment._id for unique key
                              className="mb-4 p-4 rounded-lg bg-gray-800 shadow-lg text-white"
                            >
                              <div className="flex items-start">
                                <div className="mr-3">
                                  {/* User Avatar (Optional) */}
                                  {comment.role === "admin" ? ( // Check if the user is an admin
                                    <img
                                      src={eagleDemy} // Replace with your admin avatar image source
                                      alt="Admin Avatar"
                                      className="w-10 h-10 rounded-full"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold text-white">
                                      {/* {reply.userName[0].toUpperCase()} */}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-blue-400">
                                    {comment.userName}
                                  </p>
                                  <div className="text-gray-300">
                                    <p className="mb-1 text-white">
                                      {comment.content}
                                    </p>
                                    <div className="flex justify-between items-center text-lg text-white">
                                      <small>
                                        {formatTimeAgo(comment.createdAt)}
                                      </small>
                                      <CommentActions
                                        comment={comment}
                                        index={index}
                                        onEdit={(id, content) =>
                                          handleEditComment(id, content)
                                        }
                                        onDelete={handleDeleteComment}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {reactionCounts[index] &&
                                userReactions[index] !== undefined &&
                                Array.isArray(reactionCounts) &&
                                index < reactionCounts.length &&
                                index < userReactions.length && (
                                  <div className="flex gap-4 mb-4">
                                    {[
                                      "like",
                                      "love",
                                      "celebrate",
                                      "insightful",
                                    ].map((reaction) => {
                                      try {
                                        return (
                                          <button
                                            key={reaction}
                                            onClick={() => {
                                              console.log("Reaction Clicked:", {
                                                index,
                                                reaction,
                                                projectId: comment.projectId,
                                                commentId: comment._id,
                                              });
                                              handleReactionClick(
                                                index,
                                                reaction,
                                                projects[selectedItemIndex]._id,
                                                comment._id // Pass commentId directly
                                              );
                                            }}
                                            className={`flex items-center justify-center px-3 py-1 rounded-lg transition-all duration-200 ${
                                              userReactions[index] === reaction
                                                ? "bg-blue-800 text-blue-400"
                                                : "bg-gray-700 text-white hover:bg-gray-600"
                                            }`}
                                          >
                                            {/* Reaction Icons */}
                                            {reaction === "like" && (
                                              <FaThumbsUp
                                                size={20}
                                                className="text-blue-500 mr-2"
                                              />
                                            )}
                                            {reaction === "love" && (
                                              <FaHeart
                                                size={20}
                                                className="text-red-500 mr-2"
                                              />
                                            )}
                                            {reaction === "celebrate" && (
                                              <FaLaugh
                                                size={20}
                                                className="text-yellow-500 mr-2"
                                              />
                                            )}
                                            {reaction === "insightful" && (
                                              <FaLightbulb
                                                size={20}
                                                className="text-orange-500 mr-2"
                                              />
                                            )}
                                            <span className="text-sm font-semibold">
                                              {reactionCounts[index]?.[
                                                reaction
                                              ] || ""}
                                            </span>
                                          </button>
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Error rendering reaction button:",
                                          error
                                        );
                                        return null;
                                      }
                                    })}
                                  </div>
                                )}

                              {/* Comment Section and Reply Button */}
                              <div className="mt-4">
                                <button
                                  onClick={() => toggleReplyInput(index)}
                                  className="text-blue-400 font-semibold hover:underline"
                                >
                                  {replyInputVisible[index]
                                    ? "Hide reply"
                                    : "Reply"}
                                </button>

                                {/* Reply Input Section */}
                                {replyInputVisible[index] && (
                                  <form
                                    onSubmit={(e) =>
                                      handleReplySubmit(index, e)
                                    }
                                    className="mt-3 flex flex-col space-y-2"
                                  >
                                    <textarea
                                      className="p-3 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                      placeholder="Write a reply..."
                                      value={newReply}
                                      onChange={(e) =>
                                        setNewReply(e.target.value)
                                      }
                                    />
                                    <button
                                      type="submit"
                                      className="self-start px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                      Reply
                                    </button>
                                  </form>
                                )}

                                {/* Comment Section and Reply Button */}

                                {/* Display Replies */}
                                {Array.isArray(comment?.replies) &&
                                comment.replies.length > 0
                                  ? comment.replies.map((reply, replyIndex) => (
                                      <div
                                        key={replyIndex}
                                        className="ml-12 mt-3 pl-12 bg-gray-800 rounded-md" // Adjusted padding
                                      >
                                        <div className="flex items-start">
                                          <div className="mr-3">
                                            {/* User Avatar (Optional) */}
                                            {reply.role === "admin" ? ( // Check if the user is an admin
                                              <img
                                                src={eagleDemy} // Replace with your admin avatar image source
                                                alt="Admin Avatar"
                                                className="w-10 h-10 rounded-full"
                                              />
                                            ) : (
                                              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold text-white">
                                                {reply.userName[0].toUpperCase()}
                                              </div>
                                            )}
                                          </div>
                                          <p className="text-lg text-gray-300">
                                            <span className="font-semibold text-blue-400">
                                              {reply.userName}:
                                            </span>{" "}
                                            <span className="text-white">
                                              {reply.text}
                                            </span>
                                            <span className="text-white text-lg block mt-1">
                                              <small>
                                                {formatTimeAgo(reply.createdAt)}
                                              </small>
                                              <ReplyActions
                                                reply={reply}
                                                index={index}
                                                replyIndex={replyIndex}
                                                onEdit={(text) =>
                                                  handleEditReply(
                                                    index,
                                                    replyIndex,
                                                    text
                                                  )
                                                } // Pass updated content for editing
                                                onDelete={() =>
                                                  handleDeleteReply(
                                                    reply._id,
                                                    comment._id
                                                  )
                                                } // Pass both IDs for deletion
                                              />
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    ))
                                  : null}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {celebrate && (
              <Confetti
                numberOfPieces={1000} // Increase number of confetti pieces
                recycle={false} // Set to false if you don't want continuous confetti
                gravity={2.2} // Control how fast the confetti falls
                initialVelocityX={-10} // Confetti will move from right to left
                initialVelocityY={10} // Confetti will fall downwards
                width={window.innerWidth} // Set the confetti width to full screen
                height={window.innerHeight} // Set the confetti height to full screen
                initialX={window.innerWidth} // Start confetti from the right side
                initialY={-100} // Starting position at the top
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";
  toast.success(user);

  return <p className="--color-white">Hi, {shortenText(username, 5)} |</p>;
};

export default Projects;
