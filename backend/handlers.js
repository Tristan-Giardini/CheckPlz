require("dotenv").config();
const { API_KEY, MONGO_URI } = process.env;
const requestPromise = require("request-promise");
const request = require("request-promise");
const { v4: uuid } = require("uuid");
const { MongoClient } = require("mongodb");
const e = require("express");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getRandomRecipes = async (req, res) => {
  try {
    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=main course&number=10`,
        // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=main course&number=1&addRecipeInformation=true`,
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
    const cuisine = req.body.cuisine;
    const diet = req.body.diet;
    const ingredients = req.body.ingredients;
    let newIngredients = [];
    ingredients[0].split(",").forEach((item, index) => {
      if (index === 0) {
        newIngredients.push(`${item}`);
      } else {
        newIngredients.push(`+${item}`.replace(/\s/g, ""));
      }
    });
    newIngredients = newIngredients.join();

    console.log(newIngredients);

    const result = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=${newIngredients}&ignorePantry=true&instructionsRequired=true&addRecipeInformation=true&number=5&diet=${diet[0]}&cuisine=${cuisine[0]}`,
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
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}&number=3`,
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
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=${randomDiet}&number=0`,
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
      "caribbean",
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
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=${randomCuisine}&number=0`,
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
  }
};

const handleUser = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CheckPlz");
    const { _id, given_name, family_name, email } = req.body;
    const userValues = {
      _id: _id,
      given_name: given_name,
      family_name: family_name,
      email: email,
    };
    const users = await db.collection("Users").find().toArray();
    console.log(users);
    let result = {};

    if (given_name === null || family_name === null || email === null) {
      res.status(400).json({ status: 400, message: "You don't exist" });
    }

    users.forEach((user) => {
      if (user._id === _id) {
        return res
          .status(400)
          .json({ status: 400, message: "User already exists!" });
      }
    });

    result = await db.collection("Users").insertOne(userValues);
    return res
      .status(200)
      .json({ status: 200, message: "User added", data: result });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not add user" });
  }
};

const updateLikes = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CheckPlz");
    const { email, recipe } = req.body;
    await db
      .collection("Users")
      .updateOne({ email }, { $pull: { dislikes: recipe } });
    const result = await db
      .collection("Users")
      .updateOne({ email }, { $addToSet: { likes: recipe } });
    if (result) {
      res
        .status(200)
        .json({ status: 200, message: "Like added", data: result });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update likes" });
  }
};

const removeLike = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CheckPlz");
    const { email, recipe } = req.body;
    await db
      .collection("Users")
      .updateOne({ email }, { $pull: { likes: recipe } });
    res.status(200).json({ status: 200, message: "Like removed!" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update likes" });
  }
};

const removeDislike = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CheckPlz");
    const { email, recipe } = req.body;
    await db
      .collection("Users")
      .updateOne({ email }, { $pull: { dislikes: recipe } });
    res.status(200).json({ status: 200, message: "Dislike removed!" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update likes" });
  }
};

const updateDislikes = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CheckPlz");
    const { email, recipe } = req.body;
    const recipeNum = Number(recipe);
    await db
      .collection("Users")
      .updateOne({ email }, { $pull: { likes: recipeNum } });
    await db
      .collection("Users")
      .updateOne({ email }, { $addToSet: { dislikes: recipeNum } });
    res.status(200).json({ status: 200, message: "Dislike added" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Could not update dislikes" });
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
};
