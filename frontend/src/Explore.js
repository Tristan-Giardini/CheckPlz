import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import MealCard from "./MealCard";
import Carousel from "styled-components-carousel";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Explore = () => {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [cuisineRecipes, setCuisineRecipes] = useState(null);
  const [dietRecipes, setDietRecipes] = useState(null);
  const [cuisine, setCuisine] = useState(null);
  const [diet, setDiet] = useState(null);
  const { userId, user } = useContext(UserContext);
  const [userPreferences, setUserPreferences] = useState({});

  // const handleUserPreferences = () => {
  //   fetch(`/preferences/${userId}`).then((res) => {
  //     res
  //       .json()
  //       .then((data) => {
  //         console.log(data);
  //         setUserPreferences(data.data);
  //       })
  //       .catch((e) => console.log("got error", e));
  //   });
  // };

  useEffect(() => {
    fetch(`/preferences/${userId}`).then((res) => {
      res
        .json()
        .then((data) => {
          console.log(data);
          setUserPreferences(data.data);
        })
        .catch((e) => console.log("got error", e));
    });
  }, [userId]);

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
  }, [userPreferences]);

  // const handleUserPreferences = () => {
  //   fetch(`/preferences/${userId}`).then((res) => {
  //     res
  //       .json()
  //       .then((data) => {
  //         console.log(data);
  //         setUserPreferences(data.data);
  //       })
  //       .catch((e) => console.log("got error", e));
  //   });
  // };

  // useEffect(() => {
  //   fetch(`/preferences/${userId}`).then((res) => {
  //     res
  //       .json()
  //       .then((data) => {
  //         console.log(data);
  //         setUserPreferences(data.data);
  //       })
  //       .catch((e) => console.log("got error", e));
  //   });
  // }, [userId]);

  if (
    !randomRecipes ||
    !dietRecipes ||
    !cuisineRecipes ||
    !userPreferences.likes ||
    !userPreferences.dislikes
  ) {
    return <h1>Loading...</h1>;
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
