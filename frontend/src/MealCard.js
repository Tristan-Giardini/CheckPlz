import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MealCard = ({ recipe }) => {
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
          <div>🤢</div>
          <div>😍</div>
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

const Title = styled.div`
  font-size: 20px;
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
  flex-direction: row;
  position: absolute;
  margin-left: 160px;
  margin-top: 220px;

  div {
    font-size: 30px;
  }
`;

export default MealCard;
