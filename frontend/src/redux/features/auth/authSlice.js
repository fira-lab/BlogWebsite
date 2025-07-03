import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { isValidElement, useEffect } from "react";
import authService from "./authSevice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  user: null,
  comments: [],
  users: [],
  twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isVerified: false,
  info: null,
  verifiedUsers: 0,
  suspendedUsers: 0,
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// Fetch comments by project ID
export const fetchCommentsByProjectId = createAsyncThunk(
  "auth/fetchCommentsByProjectId",
  async (projectId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}comments/${projectId}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get specific comment by ID
export const getComments = createAsyncThunk(
  "auth/getComments",
  async (commentId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}comments/${commentId}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create comment with userName included
export const createComment = createAsyncThunk(
  "auth/createComment",
  async ({ userId, projectId, content, createdAt, role }, thunkAPI) => {
    try {
      const userResponse = await axios.get(`${API_URL}users/get/${userId}`);
      const userName = userResponse.data.name;
      const response = await axios.post(`${API_URL}comments`, {
        userId,
        projectId,
        content,
        userName,
        createdAt,
        role,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add reply to a comment
export const addReplyToComment = createAsyncThunk(
  "comments/addReplyToComment",
  async ({ commentId, reply }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}comments/${commentId}/replies`,
        reply
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await authService.logoutUser();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get login status
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch user details
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch user data
export const getData = createAsyncThunk("auth/getData", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}users/getData`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Other async actions follow the same pattern...

// Reducers and slice setup...

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (userData, thunkAPI) => {
    try {
      return await authService.sendVerificationEmail(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (verificationToken, thunkAPI) => {
    try {
      return await authService.verifyUser(verificationToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// changePassword

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.changePassword(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// forgotPassword

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.forgotPassword(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// reset Password

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userData, resetToken }, thunkAPI) => {
    try {
      return await authService.resetPassword(userData, resetToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getAllusers

export const getAllUser = createAsyncThunk(
  "auth/usersregister",
  async (id, thunkAPI) => {
    try {
      return await authService.getAllUser(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteUser

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await authService.deletUser(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// upgradeUser

export const upgradeUser = createAsyncThunk(
  "auth/upgradeUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.upgradeUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// sendLoginCode
export const sendLoginCode = createAsyncThunk(
  "auth/sendLogicalCode",
  async (email, thunkAPI) => {
    try {
      return await authService.sendLoginCode(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginWithCode = createAsyncThunk(
  "auth/loginWithCode",
  async ({ code, email }, thunkAPI) => {
    try {
      return await authService.loginWithCode(email, code);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// loginWithGoogle

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (userToken, thunkAPI) => {
    try {
      return await authService.loginWithGoogle(userToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/add-certificate",
  async (project, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}users/add-project`, project);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update-project",
  async (project, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}users/update-project`,
        project
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete-project",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}users/delete-project/${_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      );
    }
  }
);

export const reloadPortfolioData = createAsyncThunk(
  "auth/reloadPortfolioData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}users/admin`);
      return response.data.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
  "auth/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}comments/${commentId}`);
      return response.data; // Return the deleted comment ID or message
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); // Reject with error message
    }
  }
);

// Edit Comment
export const editComment = createAsyncThunk(
  "auth/editComment",
  async ({ commentId, content }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}comments/${commentId}`, {
        content,
      });
      console.log(response);
      return response.data; // Return the updated comment
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); // Reject with error message
    }
  }
);

// React to Comment
export const reactToComment = createAsyncThunk(
  "comment/reactToComment",
  async ({ commentId, userId, projectId, reaction }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}comments/${commentId}/reaction`,
        { userId, projectId, reaction }
      ); // Send userId and reaction
      console.log(response.data, "This is the response!");
      return response.data; // Return the updated reaction counts
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); // Reject with error message
    }
  }
);

export const deleteReply = createAsyncThunk(
  "auth/deleteReply",
  async ({ replyId, commentId }, thunkAPI) => {
    // Accept an object with both IDs
    try {
      const response = await axios.delete(
        `${API_URL}comments/${commentId}/replies/${replyId}`
      ); // Use both IDs in the URL
      console.log(
        "Deleting reply with ID:",
        replyId,
        "and comment ID:",
        commentId
      );

      return response.data; // Return the deleted reply ID or message
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); // Reject with error message
    }
  }
);

// Edit Reply
export const editReply = createAsyncThunk(
  "auth/editReply",
  async ({ replyId, commentId, text }, thunkAPI) => {
    try {
      // Use both commentId and replyId in the API endpoint
      const response = await axios.put(
        `${API_URL}comments/${commentId}/replies/${replyId}`,
        { text }
      );
      console.log(response);
      return response.data; // Return the updated reply
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); // Reject with error message
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state) {
      state.twoFactor = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    ShowLoading(state) {
      state.isLoading = true;
    },
    HideLoading(state) {
      state.isLoading = false;
    },

    CALC_VERIFIED_USER(state, action) {
      const array = [];
      state.users.map((users) => {
        const { isVerified } = users;
        return array.push(isVerified);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === true) {
          count += 1;
        }
      });
      state.verifiedUsers = count;
    },
    CALC_SUSPENDED_USER(state, action) {
      const array = [];
      state.users.map((users) => {
        const { role } = users;
        return array.push(role);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === "suspended") {
          count += 1;
        }
      });
      state.suspendedUsers = count;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(addReplyToComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReplyToComment.fulfilled, (state, action) => {
        state.loading = false;

        // Find the comment and add the reply
        const commentIndex = state.comments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        if (commentIndex !== -1) {
          state.comments[commentIndex] = action.payload; // Replace with updated comment
        }
      })
      .addCase(addReplyToComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle the error
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        ); // Remove the deleted comment
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.payload; // Set the error message
        toast.error(action.payload); // Notify error
      })

      // Handle edit comment
      .addCase(editComment.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload; // Update the edited comment
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.payload; // Set the error message
        toast.error(action.payload); // Notify error
      })

      // Handle react to commentS
      .addCase(reactToComment.pending, (state) => {
        state.loading = false; // Set loading to true when the request is pending
      })
      .addCase(reactToComment.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload; // Update the comment with the new reaction
        }
      })
      .addCase(reactToComment.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.payload; // Set the error message
        toast.error(action.payload); // Notify error
      })

      .addCase(fetchCommentsByProjectId.fulfilled, (state, action) => {
        state.comments = action.payload; // Update comments state with fetched comments
      })

      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload; // Update
      })

      .addCase(createComment.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.payload; // Set the error message
      })

      // Register User
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoading = false;

        toast.success("Register Successfully");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = action.payload;

        toast.error(action.payload);
      })

      //  login user

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.message = action.payload;
        state.user = action.payload;

        toast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = action.payload;

        toast.error(action.payload);
        if (action.payload.includes("New device")) {
          state.twoFactor = true;
        }
      })

      //  Logout

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.payload;
        console.log(action.payload);

        toast.success(state.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);

        toast.error(action.payload);
      })

      //  login Status

      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        console.log(action.payload);
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

      //  get Users

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //get Datas

      .addCase(getData.pending, (state, action) => {
        state.isLoading = true;
        state.info = action.payload;
        console.log(action.payload, "action payload");
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.info = action.payload;
        console.log(action.payload, "get user data payload");
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload, "action payload");

        toast.error(action.payload);
      })

      //  update Users

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("User Updated");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
        toast.error("not uploaded");
      })

      //  sendEmailVerification

      .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;

        toast.success(action.payload);
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  verifyUser

      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;

        toast.success(action.payload);
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  changePassword

      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;

        toast.success(action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  forgotPassword

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;

        toast.success("Reset Email Sent!");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  resetPassword

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        console.log(action.payload);

        toast.success("Reset Password Successfully!");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  getUsers

      .addCase(getAllUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.users = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  deleteUser

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        console.log(action.payload);

        toast.success("Account deleted successfully!");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  updateUser

      .addCase(upgradeUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(upgradeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        console.log(action.payload);

        toast.success(action.payload);
      })
      .addCase(upgradeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error("Account Updated Successfully!");
      })

      //  sendLoginCode

      .addCase(sendLoginCode.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(sendLoginCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        console.log(action.payload);

        toast.success("Login code Email sent!");
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  sendLoginCode

      .addCase(loginWithCode.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(loginWithCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.twoFactor = false;
        state.message = action.payload;
        console.log(action.payload);

        toast.success("Logged In Successfully!");
      })
      .addCase(loginWithCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        console.log(action.payload);
        toast.error(action.payload);
      })

      //  sendLoginCode

      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;

        state.message = action.payload;
        console.log(action.payload);

        toast.success("Login Successfully");
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        console.log(action.payload);
        toast.error(action.payload);
      })

      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Certificate added successfully");
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error("Failed to add Certificate");
      })

      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Certificate updated successfully");
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error("Failed to update Certificate");
      })

      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Certificate deleted successfully");
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error("Failed to delete Certificate");
      });
  },
});

export const { RESET, CALC_SUSPENDED_USER, CALC_VERIFIED_USER } =
  authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;
export const { ShowLoading, HideLoading, Reset } = authSlice.actions;

export default authSlice.reducer;
