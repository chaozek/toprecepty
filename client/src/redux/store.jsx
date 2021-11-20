import recipesReducer from "./recipesSlice";
import recipeReducer from "./recipeSlice";
import userReducer from "./userSlice";
import recipeDetail from "./recipeDetailSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    recipes: recipesReducer,
    recipe: recipeReducer,
    user: userReducer,
    recipeDetail: recipeDetail,
  },
});
