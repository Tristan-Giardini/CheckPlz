import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./UserContext";

const LikedDishes = ({ like }) => {
  const [recipe, setRecipe] = useState();
  const { setFailed, setErrorMessage } = useContext(UserContext);

  useEffect(() => {
    fetch(`/single-recipe/${like}`).then((res) => {
      res
        .json()
        .then((data) => setRecipe(data.data))
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
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
