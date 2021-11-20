import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getRecipe = createAsyncThunk("recipe/getRecipe", async (id) => {
  try {
    const response = await axios.get(`/api/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipe: { ingrediencies: [], tutorial: [], title: "" },
    status: null,
  },
  reducers: {
    removeRecipe: (state) => {
      state.recipe = { ingrediencies: [], tutorial: [] };
    },
    addStep: (state) => {
      state.recipe.tutorial = [...state.recipe.tutorial, "Add Something"];
    },
    addIngrendience: (state) => {
      state.recipe.ingrediencies = [...state.recipe.ingrediencies, "Edit Me"];
    },
  },
  extraReducers: {
    [getRecipe.pending]: (state) => {
      state.status = "loading";
    },
    [getRecipe.fulfilled]: (state, action) => {
      state.recipe = action.payload;
      state.status = "success";
    },
    [getRecipe.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { removeRecipe, addStep, addIngrendience } = recipeSlice.actions;

export default recipeSlice.reducer;
