import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const MealCard = ({ recipe, like, dislike }) => {
  const [isLiked, setIsLiked] = useState(like.some((id) => id === recipe.id));
  const [isDisliked, setIsDisliked] = useState(
    dislike.some((id) => id === recipe.id)
  );
  const { userId } = useContext(UserContext);

  const likes = { recipe: recipe.id, id: userId };

  const handleDislike = () => {
    setIsDisliked((prevDisliked) => !isDisliked);
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
    setIsLiked((prevLiked) => !isLiked);
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
      {isDisliked ? <Gross>Gross</Gross> : null}
      <Container isLiked={isLiked} isDisliked={isDisliked}>
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
        <StyledNavLink to={`/recipe/${recipe.id}`}>
          <img src={recipe.image} />
          <Title>{recipe.title}</Title>
        </StyledNavLink>
        <div>Serves {recipe.servings}</div>
        <div>Ready in {recipe.readyInMinutes} minutes</div>
      </Container>
    </>
  );
};
// };

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  position: relative;
  border-style: solid;
  border-width: 1px;
  border-color: var(--off-white);
  background-color: ${(props) =>
    props.isLiked ? "white" : props.isDisliked ? "#94C74B" : "white"};
  border: ${(props) =>
    props.isLiked
      ? "2px solid #E15052"
      : props.isDisliked
      ? "#94C74B"
      : "white"};

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
        ? "var(--select-grey)"
        : props.isDisliked
        ? "#94C74B"
        : "var(--select-grey)"};
  }
`;

const Gross = styled.div`
  position: absolute;
  font-family: "Frijole", cursive;
  margin-top: 78px;
  margin-left: 30px;
  font-size: 60px;
  z-index: 3000;
  transform: rotate(-30deg);
  color: #1d1d1d;
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
  margin-left: 220px;
  margin-top: 220px;
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
