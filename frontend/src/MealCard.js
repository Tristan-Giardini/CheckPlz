import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const MealCard = ({ recipe, userPreferences }) => {
  const { user } = useAuth0();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { userId } = useContext(UserContext);

  const likes = { recipe: recipe.id, id: userId };

  const handleDislike = () => {
    setIsDisliked((previsDisliked) => !isDisliked);
    setIsLiked(false);
    if (!isDisliked) {
      fetch("/dislike", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likes),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (isDisliked) {
      fetch("/remove-dislike", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likes),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleLike = () => {
    setIsLiked((previsLiked) => !isLiked);
    setIsDisliked(false);
    if (!isLiked) {
      fetch("/like", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likes),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (isLiked) {
      fetch("/remove-like", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likes),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {/* {userPreferences.likes.forEach((item) => {
          if (item === recipe.id) {
            setIsLiked(true);
          }
        })} */}
      {/* <Body> */}
      {/* <Wrapper> */}
      {/* <Gross>Gross</Gross> */}
      <Emojis>
        <Dislike
          onClick={handleDislike}
          isLiked={isLiked}
          isDisliked={isDisliked}
        >
          🤢
        </Dislike>
        <Like onClick={handleLike} isLiked={isLiked} isDisliked={isDisliked}>
          😍
        </Like>
      </Emojis>
      <Container isLiked={isLiked} isDisliked={isDisliked}>
        <StyledNavLink to={`/recipe/${recipe.id}`}>
          <img src={recipe.image} />
          <Title>{recipe.title}</Title>
        </StyledNavLink>
        <div>Serves {recipe.servings}</div>
        <div>Ready in {recipe.readyInMinutes} minutes</div>
      </Container>
      {/* </Wrapper> */}
      {/* </Body> */}
    </>
  );
};

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  position: relative;
  border-style: solid;
  border-width: 1px;
  border-color: var(--off-white);
  background-color: ${(props) =>
    props.isLiked ? "red" : props.isDisliked ? "lightgreen" : "white"};
  width: 255px;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  opacity: ${(props) => (props.isDisliked ? "50%" : "")};
  img {
    max-width: 250px;
    border-radius: 10px;
  }
  div {
    padding: 5px;
  }
  transition: 1s ease-in-out;
  :hover {
    background-color: ${(props) =>
      props.isLiked
        ? "red"
        : props.isDisliked
        ? "lightgreen"
        : "var(--select-grey)"};
  }
`;

// const Gross = styled.div`
//   position: absolute;
//   font-family: "Nosifer", cursive;
//   margin-top: 200px;
//   margin-left: 30px;
//   font-size: 60px;
//   z-index: 2000;
//   transform: rotate(-30deg);
//   /* display: ${(props) =>
//     props.isLiked ? "none" : props.isDisliked ? "inline" : "none"}; */
//   visibility: ${(props) =>
//     props.isLiked ? "hidden" : props.isDisliked ? "visible" : "hidden"};
// `;

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
  margin-left: 260px;
  margin-top: 260px;
  div {
    font-size: 30px;
  }
  z-index: 2000;
`;

const Like = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  font-size: 30px;
  opacity: ${(props) => (props.isDisliked ? "50%" : "")};
`;

const Dislike = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  font-size: 30px;
  opacity: ${(props) => (props.isLiked ? "50%" : "")};
`;

export default MealCard;
