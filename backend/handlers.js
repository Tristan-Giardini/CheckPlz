require("dotenv").config();
const { API_KEY, MONGO_URI } = process.env;
const requestPromise = require("request-promise");
const request = require("request-promise");
const { v4: uuid } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");
const e = require("express");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

let clientDB = null;
let timeOut = 0;

const getClientDB = async () => {
  clearTimeout(timeOut);
  if (!clientDB) {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    clientDB = await client.db("CheckPlz");
  }
  timeOut = setTimeout(() => {
    client.close();
    clientDB = null;
  }, 5000);
  return clientDB;
};

const getRandomRecipes = async (req, res) => {
  try {
    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=main course&number=1`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  }
};

const filteredRecipes = async (req, res) => {
  try {
    let cuisine = req.body.cuisine;
    let diet = req.body.diet;
    let ingredients = req.body.ingredients;
    let newIngredients = [];
    ingredients[0].split(",").forEach((item, index) => {
      if (index === 0) {
        newIngredients.push(`${item}`);
      } else {
        newIngredients.push(`+${item}`.replace(/\s/g, ""));
      }
    });
    newIngredients = newIngredients.join();
    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=${newIngredients}&ignorePantry=true&instructionsRequired=true&addRecipeInformation=true&number=1&diet=${diet[0]}&cuisine=${cuisine[0]}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );
    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  }
};

const getRecipeBasedOnId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );
    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  }
};

const getSimilarRecipes = async (req, res) => {
  try {
    const id = req.params.id;
    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}&number=1`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );
    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  }
};

const getDietaryRecipes = async (req, res) => {
  try {
    const dietValues = [
      "vegetarian",
      "vegan",
      "ketogenic",
      "gluten free",
      "pescetarian",
    ];
    const randomNumber = Math.floor(Math.random() * dietValues.length);
    const randomDiet = dietValues[randomNumber];
    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=${randomDiet}&number=1`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );
    result
      ? res.status(200).json({ status: 200, data: result, message: randomDiet })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  }
};

const getCuisineRecipes = async (req, res) => {
  try {
    const cuisineValues = [
      "american",
      "british",
      "chinese",
      "european",
      "french",
      "greek",
      "indian",
      "japanese",
      "jewish",
      "korean",
      "latin american",
      "mexican",
      "middle eastern",
      "southern",
      "spanish",
      "thai",
      "vietnamese",
    ];
    const randomNumber = Math.floor(Math.random() * cuisineValues.length);
    const randomCuisine = cuisineValues[randomNumber];
    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=${randomCuisine}&number=1`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );
    result
      ? res
          .status(200)
          .json({ status: 200, data: result, message: randomCuisine })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const handleUser = async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db("CheckPlz");
    const db = await getClientDB();
    const { _id, given_name, family_name, email } = req.body;
    const userValues = {
      _id: _id,
      given_name: given_name,
      family_name: family_name,
      email: email,
      edits: [],
      likes: [],
      dislikes: [],
    };
    const users = await db.collection("Users").find().toArray();

    let result = {};
    let repeat = false;

    users.forEach((user) => {
      if (user._id === _id) {
        repeat = true;
      }
    });

    if (repeat) {
      return res
        .status(400)
        .json({ status: 400, message: "User already exists!" });
    } else {
      result = await db.collection("Users").insertOne(userValues);
      return res
        .status(200)
        .json({ status: 200, message: "User added", data: result });
    }
  } catch (err) {
    console.log(err);
  } finally {
    // client.close();
  }
};

const updateLikes = async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db("CheckPlz");
    //changed $push to $addToSet so that it doesn't send a double in the edits array
    const db = await getClientDB();
    const { id, recipe } = req.body;
    await db
      .collection("Users")
      .updateOne({ _id: id }, { $pull: { dislikes: recipe } });
    await db
      .collection("Users")
      .updateOne(
        { _id: id },
        { $addToSet: { edits: { recipeId_: recipe, ingredients: [] } } }
      );
    const result = await db
      .collection("Users")
      .updateOne({ _id: id }, { $addToSet: { likes: recipe } });
    if (result) {
      res
        .status(200)
        .json({ status: 200, message: "Like added", data: result });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update likes" });
  } finally {
    // client.close();
  }
};

const removeLike = async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db("CheckPlz");
    const db = await getClientDB();
    const { id, recipe } = req.body;
    // const newId = id.slice(1, id.length - 1);
    await db
      .collection("Users")
      .updateOne({ _id: id }, { $pull: { edits: { recipeId_: recipe } } });
    await db
      .collection("Users")
      .updateOne({ _id: id }, { $pull: { likes: recipe } });
    res.status(200).json({ status: 200, message: "Like removed!" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update likes" });
  } finally {
    // client.close();
  }
};

const removeDislike = async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db("CheckPlz");
    const db = await getClientDB();
    const { id, recipe } = req.body;
    // const newId = id.slice(1, id.length - 1);
    await db
      .collection("Users")
      .updateOne({ _id: id }, { $pull: { dislikes: recipe } });
    res.status(200).json({ status: 200, message: "Dislike removed!" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update likes" });
  } finally {
    // client.close();
  }
};

const updateDislikes = async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db("CheckPlz");
    const db = await getClientDB();
    const { id, recipe } = req.body;
    // const newId = id.slice(1, id.length - 1);
    const recipeNum = Number(recipe);
    await db
      .collection("Users")
      .updateOne({ _id: id }, { $pull: { likes: recipeNum } });
    await db
      .collection("Users")
      .updateOne({ _id: id }, { $pull: { edits: { recipeId_: recipe } } });
    await db
      .collection("Users")
      .updateOne({ _id: id }, { $addToSet: { dislikes: recipeNum } });
    res.status(200).json({ status: 200, message: "Dislike added" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update dislikes" });
  } finally {
    // client.close();
  }
};

const getPreferences = async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db("CheckPlz");
    const db = await getClientDB();
    const id = req.params.id;
    console.log(id);
    const result = await db.collection("Users").findOne({ _id: id });
    res.status(200).json({ status: 200, message: "User found", data: result });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not find user" });
  } finally {
    // client.close();
  }
};

const updateIngredient = async (req, res) => {
  const db = await getClientDB();
  const { _id, ingredientId, ingredient, recipeId } = req.body;
  const ingredientInfo = {
    ingredientId: ingredientId,
    ingredient: ingredient,
  };
  const query = { _id: _id, "edits.recipeId_": Number(recipeId) };
  const newValues = { $addToSet: { "edits.$.ingredients": ingredientInfo } };
  const result = await db.collection("Users").updateOne(query, newValues);
  if (result) {
    res.status(200).json({ status: 200, data: result });
  } else {
    res
      .status(400)
      .json({ status: 400, message: "Could not update ingredients" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = await getClientDB();
    const id = req.params.id;
    const result = await db.collection("Users").deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ status: 200, id, data: result });
    } else {
      res.status(400).json({ status: 400, message: "User was not deleted" });
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
};

module.exports = {
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
};
