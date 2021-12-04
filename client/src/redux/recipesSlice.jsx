import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipes = createAsyncThunk("recipes/getRecipes", async () => {
  try {
    const response = await axios.get("/api/recipes");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const addRecipe = createAsyncThunk(
  "api/addRecipe",
  async (recipe, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/recipes", recipe);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchRecipe = createAsyncThunk(
  "api/searchRecipe",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/recipes/search?searchQuery=${searchQuery || "none"}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const removeRecipeFromArray = createAsyncThunk(
  "api/removeRecipe",
  async (id) => {
    try {
      const response = await axios.delete(`/api/recipes/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const editRecipe = createAsyncThunk("api/editRecipe", async (recipe) => {
  try {
    const newObj = { ...recipe };
    newObj.ingrediencies = recipe.ingrediencies.filter(function (e) {
      return e !== "";
    });

    const response = await axios.put(`/api/recipes/edit/${recipe._id}`, newObj);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    status: null,
    error: null,
    redirect: false,
  },
  reducers: {
    removeStatus: (state, action) => {
      state.status = null;
    },
    removeError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.status = "loading";
    },
    [getRecipes.fulfilled]: (state, action) => {
      state.recipes = action.payload;
      state.status = "success";
    },
    [getRecipes.rejected]: (state) => {
      state.status = "failed";
    },
    [addRecipe.pending]: (state) => {
      state.status = "loading";
    },
    [addRecipe.fulfilled]: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
      state.status = "success";
    },
    [addRecipe.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [removeRecipeFromArray.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeRecipeFromArray.fulfilled]: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
      state.status = "success";
    },
    [removeRecipeFromArray.rejected]: (state, action) => {
      state.status = "failed";
    },
    [editRecipe.pending]: (state) => {
      state.status = "loading";
    },
    [editRecipe.fulfilled]: (state, action) => {
      console.log("TADY", action.payload._id);

      var foundIndex = state.recipes.findIndex(
        (x) => x.id === action.payload._id
      );
      state.recipes[foundIndex] = action.payload;

      state.status = "success";
    },
    [editRecipe.rejected]: (state) => {
      state.status = "failed";
    },

    [searchRecipe.pending]: (state) => {
      state.status = "loading";
    },
    [searchRecipe.fulfilled]: (state, action) => {
      state.recipes = [...action.payload];
      state.status = "success";
    },
    [searchRecipe.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export const { removeStatus, removeError, setRedirect } = recipesSlice.actions;

export default recipesSlice.reducer;
