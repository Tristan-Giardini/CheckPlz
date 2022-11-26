import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const MealCard = ({ recipe }) => {
  const { user, isAuthenticated } = useAuth0();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleDislike = () => {
    setIsDisliked(true);
  };
  const handleLike = () => {
    setIsLiked(true);
  };

  return (
    <>
      {/* <Body> */}
      {/* <Wrapper> */}
      <Container>
        <StyledNavLink to={`/recipe/${recipe.id}`}>
          <img src={recipe.image} />
          <Title>{recipe.title}</Title>
        </StyledNavLink>
        <div>Serves {recipe.servings}</div>
        <div>Ready in {recipe.readyInMinutes} minutes</div>
        <Emojis>
          <button onClick={handleDislike}>🤢</button>
          <button onClick={handleLike}>😍</button>
        </Emojis>
      </Container>
      {/* </Wrapper> */}
      {/* </Body> */}
    </>
  );
};

// const Body = styled.div`
//   margin-left: 100px;
//   margin-right: 100px;
// `;

// const Wrapper = styled.div`
//   border-style: solid;
//   border-width: 1px;
//   height: 400px;
//   display: flex;
// `;

const Container = styled.div`
  position: relative;
  border-style: solid;
  border-width: 1px;
  border-color: var(--off-white);
  width: 255px;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 30px;
  border-radius: 10px;
  img {
    max-width: 250px;
    border-radius: 10px;
  }
  div {
    padding: 5px;
  }
  transition: 1s ease-in-out;
  :hover {
    background-color: var(--select-grey);
  }
`;

const LikedContainer = styled.div`
  position: relative;
  border-style: solid;
  border-width: 1px;
  border-color: var(--off-white);
  width: 255px;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 30px;
  border-radius: 10px;
  background-color: red;
  img {
    max-width: 250px;
    border-radius: 10px;
  }
  div {
    padding: 5px;
  }
  transition: 1s ease-in-out;
  :hover {
    background-color: var(--select-grey);
  }
`;

const DislikedContainer = styled.div`
  position: relative;
  border-style: solid;
  border-width: 1px;
  border-color: var(--off-white);
  width: 255px;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 30px;
  border-radius: 10px;
  background-color: green;
  img {
    max-width: 250px;
    border-radius: 10px;
  }
  div {
    padding: 5px;
  }
  transition: 1s ease-in-out;
  :hover {
    background-color: var(--select-grey);
  }
`;

const Title = styled.div`
  font-size: 20px;
  height: 60px;
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

const Emojis = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: space-between;
  margin-left: 200px;
  margin-top: 220px;
  button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    font-size: 30px;
  }
  div {
    font-size: 30px;
  }
`;

export default MealCard;
