import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SimilarRecipeCard from "./SimilarRecipeCard";
import { BiEdit } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Recipe = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth0();
  const [recipe, setRecipe] = useState({});
  const [similarRecipes, setSimilarRecipes] = useState(null);
  const [updatedIngredient, setUpdatedIngredient] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { userId, setFailed, setErrorMessage } = useContext(UserContext);
  const [ingredientId, setIngredientId] = useState(null);
  const [editsArray, setEditsArray] = useState(null);
  const [isUserIngredient, setIsUserIngredient] = useState(false);

  useEffect(() => {
    fetch(`/preferences/${userId}`).then((res) => {
      res
        .json()
        .then((data) => {
          console.log(data);
          setEditsArray(data.data.edits);
        })
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
  }, [userId]);

  useEffect(() => {
    fetch(`/single-recipe/${id}`).then((res) => {
      res
        .json()
        .then((data) => setRecipe(data.data))
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
    fetch(`/similar-recipes/${id}`).then((res) => {
      res
        .json()
        .then((data) => setSimilarRecipes(data.data))
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
  }, [editsArray]);

  const editHandler = (index, ingredient, id) => {
    setUpdatedIngredient(ingredient);
    setIsEditOpen(true);
    setEditIndex(index);
    setIngredientId(id);
  };

  const updateIngredient = () => {
    fetch("/update-ingredient", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userId,
        recipeId: id,
        ingredientId: ingredientId,
        ingredient: updatedIngredient,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const saveHandler = (id) => {
    const newRecipe = { ...recipe };
    const index = newRecipe.extendedIngredients.findIndex(
      (obj) => obj.id === id
    );
    if (index !== -1) {
      newRecipe.extendedIngredients[index].original = updatedIngredient;
    }
    setRecipe(newRecipe);
    setIsEditOpen(false);
    updateIngredient();
  };

  let recipeObject = null;
  let alteredIngredient = {};

  if (
    !recipe ||
    !similarRecipes ||
    !recipe.extendedIngredients ||
    !id ||
    !editsArray
  ) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <BackgroundDiv>
        <Wrapper>
          <Title>
            <h1>{recipe.title}</h1>
          </Title>
          <RecipeContainer>
            <ImageSourceServing>
              <ImageDiv>
                <img src={recipe.image}></img>
              </ImageDiv>
              <Source>
                Source:{" "}
                <a
                  href={`${recipe.sourceUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {recipe.sourceUrl}
                </a>
              </Source>
              <ServesReady>
                <Serves>
                  <h2>Serves {recipe.servings}</h2>
                </Serves>
                <Ready>
                  <h2>Ready in {recipe.readyInMinutes} minutes</h2>
                </Ready>
              </ServesReady>
            </ImageSourceServing>
            <>
              <SimilarContainer>
                <h1>Similar Recipes:</h1>
                {similarRecipes.map((recipe, index) => {
                  return (
                    <div key={index}>
                      <SimilarRecipeCard recipe={recipe.id} />
                    </div>
                  );
                })}
              </SimilarContainer>
            </>
          </RecipeContainer>
          <IngredientsDirections>
            <Ingredients>
              <h1>Ingredients:</h1>
              {recipe.extendedIngredients.map((ingredient, index) => {
                recipeObject = editsArray.find(
                  (element) => element.recipeId_ === Number(id)
                );

                {
                  recipeObject && recipeObject.ingredients.length > 0 ? (
                    recipeObject.ingredients.forEach((item) => {
                      if (item.ingredientId === ingredient.id) {
                        alteredIngredient = item;
                      }
                    })
                  ) : (
                    <></>
                  );
                }

                return (
                  <div key={index}>
                    <IngredientDiv>
                      {alteredIngredient.ingredientId === ingredient.id ? (
                        <IngDiv>{alteredIngredient.ingredient}</IngDiv>
                      ) : (
                        <IngDiv>{ingredient.original}</IngDiv>
                      )}
                      {!isEditOpen && isAuthenticated && (
                        <EditButton
                          onClick={() => {
                            editHandler(
                              index,
                              ingredient.original,
                              ingredient.id
                            );
                          }}
                        >
                          <BiEdit />
                        </EditButton>
                      )}
                    </IngredientDiv>
                    {isEditOpen && index === editIndex && (
                      <EditSave>
                        <textarea
                          name={ingredient.original}
                          id={ingredient.original}
                          cols="26"
                          rows="3"
                          value={updatedIngredient}
                          onChange={(e) => {
                            setUpdatedIngredient(e.target.value);
                          }}
                        ></textarea>
                        <SaveButton
                          onClick={() => {
                            saveHandler(ingredient.id);
                          }}
                        >
                          Save
                        </SaveButton>
                      </EditSave>
                    )}
                  </div>
                );
              })}
            </Ingredients>
            <Directions>
              <h1>Directions:</h1>
              {recipe.analyzedInstructions[0].steps.map((item, index) => {
                return (
                  <div key={index}>
                    <DirDiv>{item.step}</DirDiv>
                  </div>
                );
              })}
            </Directions>
          </IngredientsDirections>
        </Wrapper>
      </BackgroundDiv>
    );
  }
};

const BackgroundDiv = styled.div`
  background-color: var(--select-grey);
`;

const Source = styled.div`
  font-size: 14px;
  max-width: 550px;
  align-self: flex-start;
  margin-left: 20px;
  padding: 5px;
  a {
    text-decoration: none;
    color: black;
    :hover {
      text-decoration: underline;
    }
  }
`;

const Wrapper = styled.div`
  margin: 0px 215px 0px 215px;
  background-color: white;
  height: 643px;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ServesReady = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 550px;
  margin-left: 50px;
  margin-right: 50px;
`;

const Serves = styled.div`
  border-top: 1px solid var(--select-grey);
  border-right: 1px solid var(--select-grey);
  border-bottom: 0px solid var(--select-grey);
  padding: 15px;
  width: 248px;
  font-style: italic;
`;

const Ready = styled.div`
  border-top: 1px solid var(--select-grey);
  border-left: 0px solid var(--select-grey);
  border-bottom: 0px solid var(--select-grey);
  padding: 15px;
  width: 250px;
  font-style: italic;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageSourceServing = styled.div`
  padding: 30px 30px 0px 30px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  padding: 20px;
  padding-left: 50px;
  max-width: 1000px;
  border-bottom: 2px solid var(--select-grey);
`;

const ImageDiv = styled.div`
  img {
    border-radius: 5px;
  }
`;

const Ingredients = styled.div`
  border-right: 2px solid var(--select-grey);
  max-width: 850px;
  margin-left: 15px;
  h1 {
    padding-top: 15px;
  }
`;

const IngDiv = styled.div`
  padding: 15px;
  font-size: 20px;
  border-bottom: 2px solid var(--select-grey);
  width: 228px;
`;

const Directions = styled.div`
  /* div {
    padding: 15px;
    border-bottom: 2px solid var(--select-grey);
    font-size: 20px;
  } */
  h1 {
    padding: 15px;
  }
`;

const DirDiv = styled.div`
  padding: 15px;
  border-bottom: 2px solid var(--select-grey);
  font-size: 20px;
`;

const IngredientsDirections = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 55px 0px 55px;
  display: flex;
  flex-direction: row;
  border-top: 1px solid var(--select-grey);
  h1 {
    font-weight: bold;
    padding-bottom: 15px;
  }
`;

const IngredientDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  width: 258px;
  position: relative;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  :hover {
    cursor: pointer;
  }
  font-size: 16px;
  color: lightgrey;
  position: absolute;
  margin-left: 210px;
`;

const EditSave = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  :hover {
    cursor: pointer;
  }
  display: flex;
`;

const SimilarContainer = styled.div`
  h1 {
    margin-bottom: 20px;
  }
  border-bottom: 1px solid var(--select-grey);
  overflow: hidden;
  height: 380px;
  width: 295px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Recipe;
