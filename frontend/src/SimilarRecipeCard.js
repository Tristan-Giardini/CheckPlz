import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
        <StyledNavLink to={`/recipe/${recommendedRecipe.id}`}>
          <Wrapper>
            <div>{recommendedRecipe.title}</div>
            <ImageDiv>
              <img src={recommendedRecipe.image}></img>
            </ImageDiv>
          </Wrapper>
        </StyledNavLink>
      </>
    );
  }
};

const Wrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;

  div {
    margin-top: 10px;
    margin-left: 10px;
  }
  :hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: var(--select-grey);
  }
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImageDiv = styled.div`
  img {
    width: 30%;
    border-radius: 20%;
  }
  margin-left: 10px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  transition: 0.2s ease-in-out;
  :hover {
    color: var(--dark-pink);
    font-weight: bolder;
  }
`;

export default SimilarRecipeCard;
