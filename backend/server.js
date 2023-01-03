const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const {
  filteredRecipes,
  getRandomRecipes,
  getRecipeBasedOnId,
  getDietaryRecipes,
  getCuisineRecipes,
  getSimilarRecipes,
  handleUser,
  updateLikes,
  updateDislikes,
  removeLike,
  removeDislike,
  getPreferences,
  updateIngredient,
  deleteUser,
} = require("./handlers");

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.get("/random-recipes", getRandomRecipes);
app.get("/single-recipe/:id", getRecipeBasedOnId);
app.get("/cuisine-recipes", getCuisineRecipes);
app.get("/dietary-recipes", getDietaryRecipes);
app.get("/similar-recipes/:id", getSimilarRecipes);
app.post("/filtered-recipes", filteredRecipes);

// user
app.get("/preferences/:id", getPreferences);
app.post("/user", handleUser);
app.patch("/like", updateLikes);
app.patch("/dislike", updateDislikes);
app.patch("/remove-like", removeLike);
app.patch("/remove-dislike", removeDislike);
app.patch("/update-ingredient", updateIngredient);
app.delete("/delete-user/:id", deleteUser);

// app.listen(8000, () => console.log("Listening on port 8000"));

app.listen("https://checkplz.onrender.com/", () =>
  console.log("Listening on port 8000")
);
