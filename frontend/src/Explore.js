import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MealCard from "./MealCard";
import Carousel from "styled-components-carousel";
import styled from "styled-components";

const Explore = () => {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [cuisineRecipes, setCuisineRecipes] = useState(null);
  const [dietRecipes, setDietRecipes] = useState(null);
  const [cuisine, setCuisine] = useState(null);
  const [diet, setDiet] = useState(null);

  useEffect(() => {
    fetch("/random-recipes").then((res) => {
      res
        .json()
        .then((data) => setRandomRecipes(data.data.recipes))
        .catch((e) => console.log("got error", e));
    });
    fetch("/cuisine-recipes").then((res) => {
      res
        .json()
        .then((data) => {
          setCuisineRecipes(data.data.recipes);
          setCuisine(data.message);
        })
        .catch((e) => console.log("got error", e));
    });
    fetch("/dietary-recipes").then((res) => {
      res
        .json()
        .then((data) => {
          setDietRecipes(data.data.recipes);
          setDiet(data.message);
        })
        .catch((e) => console.log("got error", e));
    });
  }, []);

  if (!randomRecipes || !dietRecipes || !cuisineRecipes) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <BackgroundDiv>
        <Wrapper>
          <Container>
            <h1>Popular Recipes</h1>
            <Carousel infinite={true} shouldIndicator={false} slidesToShow={4}>
              {randomRecipes.map((recipe, index) => {
                return <MealCard key={index} recipe={recipe} />;
              })}
            </Carousel>
          </Container>
          <Container>
            <h1>{cuisine} Recipes</h1>
            <Carousel infinite={true} shouldIndicator={false} slidesToShow={4}>
              {cuisineRecipes.map((recipe, index) => {
                return <MealCard key={index} recipe={recipe} />;
              })}
            </Carousel>
          </Container>
          <Container>
            <h1>{diet} Recipes</h1>
            <Carousel infinite={true} shouldIndicator={false} slidesToShow={4}>
              {dietRecipes.map((recipe, index) => {
                return <MealCard key={index} recipe={recipe} />;
              })}
            </Carousel>
          </Container>
        </Wrapper>
      </BackgroundDiv>
    );
  }
};

const BackgroundDiv = styled.div`
  background-color: var(--select-grey);
`;

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  margin-left: 215px;
  margin-right: 345px;
  background-color: white;
`;

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 40px;
`;

export default Explore;
