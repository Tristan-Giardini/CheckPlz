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
    const { given_name, family_name, email } = req.body;
    const userValues = {
      _id: uuid(),
      given_name: given_name,
      family_name: family_name,
      email: email,
    };
    const users = await db.collection("Users").find().toArray();
    console.log(users);
    let result = {};
    users.forEach((user) => {
      if (user.email === email) {
        return res
          .status(400)
          .json({ status: 400, message: "User email already exists!" });
      }
    });
    result = await db.collection("Users").insertOne(userValues);
    return res
      .status(200)
      .json({ status: 200, message: "User added", data: result });
  } catch (err) {}
};

const updateLikes = () => {};

const updateDislikes = () => {};

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
};
