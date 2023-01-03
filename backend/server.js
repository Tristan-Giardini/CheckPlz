const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
// added Xarah
const cors = require("cors");

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

// added Xarah
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
// added Xarah
app.use(express.static("./server/assets"));
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));
app.use(
  cors({
    origin: ["https://checlplz.onrender.com"],
  })
);
//

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

app.listen(8000, () => console.log("Listening on port 8000"));

// app.listen("https://checkplz.onrender.com/", () =>
//   console.log("Listening on port 8000")
// );
