import { useContext, useState, useEffect } from "react";
import MealCard from "./MealCard";
import Carousel from "styled-components-carousel";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import CircularProgress from "@mui/material/CircularProgress";

const Explore = () => {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [cuisineRecipes, setCuisineRecipes] = useState(null);
  const [dietRecipes, setDietRecipes] = useState(null);
  const [cuisine, setCuisine] = useState(null);
  const [diet, setDiet] = useState(null);
  const { userId, user, setFailed, setErrorMessage } = useContext(UserContext);
  const [userPreferences, setUserPreferences] = useState({});

  useEffect(() => {
    fetch(`/preferences/${userId}`).then((res) => {
      res
        .json()
        .then((data) => {
          console.log(data);
          setUserPreferences(data.data);
        })
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
  }, [userId]);

  useEffect(() => {
    fetch(`/random-recipes`).then((res) => {
      res
        .json()
        .then((data) => setRandomRecipes(data.data.recipes))
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
    fetch(`/cuisine-recipes`).then((res) => {
      res
        .json()
        .then((data) => {
          setCuisineRecipes(data.data.recipes);
          setCuisine(data.message);
        })
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
    fetch(`/dietary-recipes`).then((res) => {
      res
        .json()
        .then((data) => {
          setDietRecipes(data.data.recipes);
          setDiet(data.message);
        })
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
  }, [userPreferences]);

  if (
    !randomRecipes ||
    !dietRecipes ||
    !cuisineRecipes ||
    !userPreferences.likes ||
    !userPreferences.dislikes
  ) {
    return (
      <LoadingDiv>
        <div>
          <CircularProgress color="inherit" />
        </div>
      </LoadingDiv>
    );
  } else {
    return (
      <BackgroundDiv>
        <Wrapper>
          <Container>
            <h1>Popular recipes</h1>
            <Underline></Underline>
            <Carousel infinite={false} showIndicator={false} slidesToShow={3}>
              {randomRecipes.map((recipe, index) => {
                return (
                  <MealCard
                    key={index}
                    recipe={recipe}
                    like={userPreferences.likes}
                    dislike={userPreferences.dislikes}
                  />
                );
              })}
            </Carousel>
          </Container>
          <Container>
            <h1>
              {cuisine.substring(0, 1).toUpperCase() + cuisine.substring(1)}{" "}
              recipes
            </h1>
            <Underline></Underline>
            <Carousel infinite={false} showIndicator={false} slidesToShow={3}>
              {cuisineRecipes.map((recipe, index) => {
                return (
                  <MealCard
                    key={index}
                    recipe={recipe}
                    like={userPreferences.likes}
                    dislike={userPreferences.dislikes}
                  />
                );
              })}
            </Carousel>
          </Container>
          <Container>
            <h1>
              {diet.substring(0, 1).toUpperCase() + diet.substring(1)} recipes
            </h1>
            <Underline></Underline>
            <Carousel infinite={false} showIndicator={false} slidesToShow={3}>
              {dietRecipes.map((recipe, index) => {
                return (
                  <MealCard
                    key={index}
                    recipe={recipe}
                    like={userPreferences.likes}
                    dislike={userPreferences.dislikes}
                  />
                );
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

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  height: 50vh;
`;

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  margin-left: 175px;
  margin-right: 175px;
  background-color: white;
  height: 643px;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px;
`;

const Underline = styled.div`
  border-bottom: 1px solid var(--select-grey);
`;

export default Explore;
