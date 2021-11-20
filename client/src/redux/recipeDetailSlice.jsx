import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user/getusername",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/find/", id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const recipeSlice = createSlice({
  name: "recipeDetail",
  initialState: {
    authorName: "",
  },
  reducers: {
    removeDetails: (state) => {
      state.authorName = "";
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      state.authorName = action.payload;
      state.status = "success";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { removeDetails } = recipeSlice.actions;

export default recipeSlice.reducer;
