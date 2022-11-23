const express = require("express");
const app = express();
const { getRandom, recipesByIngredients } = require("./handlers");

app.get("/fetch-message", getRandom);
app.get("/specific-recipes", recipesByIngredients);

app.listen(8000, () => console.log("Listening on port 8000"));
