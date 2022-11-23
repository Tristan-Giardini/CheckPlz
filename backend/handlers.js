require("dotenv").config();
const { API_KEY } = process.env;
const request = require("request-promise");

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const getRandom = async (req, res) => {
  try {
    const api = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    api
      ? res.status(200).json({ status: 200, data: api })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  }
};

const recipesByIngredients = async (req, res) => {
  try {
    const api = JSON.parse(
      await request(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=tomatoes,+carrots,+cellery,+onions&ignorePantry=true&instructionsRequired=true&addRecipeInformation=true&number=10`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    api
      ? res.status(200).json({ status: 200, data: api })
      : res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getRandom, recipesByIngredients };
