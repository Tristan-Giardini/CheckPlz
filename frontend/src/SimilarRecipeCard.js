import React from "react";
import { useState, useEffect } from "react";

const SimilarRecipeCard = ({ recipe }) => {
  const [recommendedRecipe, setRecommendedRecipe] = useState();

  useEffect(() => {
    fetch(`/single-recipe/${recipe.id}`).then((res) => {
      res
        .json()
        .then((data) => setRecommendedRecipe(data.data))
        .catch((e) => console.log("got error", e));
    });
  }, []);

  if (!recommendedRecipe) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <div>{recommendedRecipe.title}</div>
        <div>{recommendedRecipe.image}</div>
      </>
    );
  }
};

export default SimilarRecipeCard;
