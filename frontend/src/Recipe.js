import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [entireItem, setEntireItem] = useState(null);

  // // test
  useEffect(() => {
    fetch(`/single-recipe/${id}`).then((res) => {
      res
        .json()
        .then((data) => setRecipe(data.data))
        .catch((e) => console.log("got error", e));
    });
  }, []);

  console.log(recipe);

  if (!recipe) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h1>Recipe</h1>
        <div>{recipe.title}</div>
        <div>
          <img src={recipe.image}></img>
        </div>
        <div>{recipe.readyInMinutes}</div>
        <div>{recipe.servings}</div>
        <div>{recipe.sourceUrl}</div>
        <div>
          {recipe.analyzedInstructions[0].steps.map((item) => {
            return (
              <>
                <div>{item.number}</div>
                <div>{item.step}</div>
              </>
            );
          })}
        </div>
      </>
    );
  }
};

export default Recipe;
