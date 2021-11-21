import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signin = createAsyncThunk(
  "user/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/signin", formData);
      localStorage.setItem("profile", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const signup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/signup", formData);
      localStorage.setItem("profile", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/reset-password", formData);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const confirmResetPassword = createAsyncThunk(
  "user/confirm-reset-password",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/reset-password/${formData.slug}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { result: "" },
    status: null,
    error: null,
    successfulySent: null,
  },

  reducers: {
    auth: (state, action) => {
      state.user = JSON.parse(localStorage.getItem("profile"));
    },
    logout: (state, action) => {
      state.user = "";
      localStorage.clear();
    },
    removeUserError: (state, action) => {
      state.error = null;
    },
    removeSuccessfulySent: (state, action) => {
      state.successfulySent = null;
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.status = "loading";
    },
    [signin.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [signin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    [signup.pending]: (state) => {
      state.status = "loading";
    },

    [signup.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [signup.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [resetPassword.pending]: (state) => {
      state.status = "loading";
    },

    [resetPassword.fulfilled]: (state, action) => {
      state.successfulySent = action.payload;
      state.status = "success";
    },
    [resetPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [confirmResetPassword.pending]: (state) => {
      state.status = "loading";
    },

    [confirmResetPassword.fulfilled]: (state, action) => {
      state.successfulySent = action.payload;
      state.status = "success";
    },
    [confirmResetPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});
export const { auth, logout, removeUserError, removeSuccessfulySent } =
  userSlice.actions;

export default userSlice.reducer;
