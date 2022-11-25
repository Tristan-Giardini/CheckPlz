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
} = require("./handlers");

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.get("/random-recipes", getRandomRecipes);
app.get("/single-recipe/:id", getRecipeBasedOnId);
app.get("/cuisine-recipes", getCuisineRecipes);
app.get("/dietary-recipes", getDietaryRecipes);
app.post("/filtered-recipes", filteredRecipes);

app.listen(8000, () => console.log("Listening on port 8000"));
