import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SimilarRecipeCard from "./SimilarRecipeCard";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState(null);

  useEffect(() => {
    fetch(`/single-recipe/${id}`).then((res) => {
      res
        .json()
        .then((data) => setRecipe(data.data))
        .catch((e) => console.log("got error", e));
    });
    fetch(`/similar-recipes/${id}`).then((res) => {
      res
        .json()
        .then((data) => setSimilarRecipes(data.data))
        .catch((e) => console.log("got error", e));
    });
  }, []);

  if (!recipe || !similarRecipes) {
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
              <Source>Source: {recipe.sourceUrl}</Source>
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
                {similarRecipes.map((recipe) => {
                  return (
                    <>
                      <SimilarRecipeCard recipe={recipe} />
                    </>
                  );
                })}
              </SimilarContainer>
            </>
          </RecipeContainer>
          <IngredientsDirections>
            <Ingredients>
              <h1>Ingredients:</h1>
              {recipe.extendedIngredients.map((ingredient) => {
                return (
                  <>
                    <div>{ingredient.original}</div>
                  </>
                );
              })}
            </Ingredients>
            <Directions>
              <h1>Directions:</h1>
              {recipe.analyzedInstructions[0].steps.map((item) => {
                return (
                  <>
                    <div>{item.step}</div>
                  </>
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
  font-size: 15px;
  max-width: 550px;
  align-self: flex-start;
  margin-left: 20px;
  padding: 5px;
`;

const Wrapper = styled.div`
  margin: 0px 215px 0px 215px;
  background-color: white;
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
  border-bottom: 1px solid var(--select-grey);
  padding: 15px;
  width: 250px;
  font-style: italic;
`;

const Ready = styled.div`
  border-top: 1px solid var(--select-grey);
  border-left: 1px solid var(--select-grey);
  border-bottom: 1px solid var(--select-grey);
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
  div {
    padding: 15px;
    border-bottom: 2px solid var(--select-grey);
    font-size: 20px;
  }
  width: 1000px;
  margin-left: 15px;
  h1 {
    padding-top: 15px;
  }
`;

const Directions = styled.div`
  div {
    padding: 15px;
    border-bottom: 2px solid var(--select-grey);
    font-size: 20px;
  }
  margin-left: 107.7px;
  h1 {
    padding: 15px;
  }
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

const SimilarContainer = styled.div``;

export default Recipe;
