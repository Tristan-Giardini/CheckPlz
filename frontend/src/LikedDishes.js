import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SimilarRecipeCard from "./SimilarRecipeCard";

const LikedDishes = ({ like }) => {
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    fetch(`/single-recipe/${like}`).then((res) => {
      res
        .json()
        .then((data) => setRecipe(data.data))
        .catch((e) => console.log("got error", e));
    });
  }, []);

  return (
    recipe && (
      <>
        <div>{recipe.title}</div>
      </>
    )
  );
};
export default LikedDishes;
