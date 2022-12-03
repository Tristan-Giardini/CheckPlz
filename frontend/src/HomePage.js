import { useEffect, useContext } from "react";
import styled from "styled-components";
import chefcooking from "./assets/chefcooking.png";
import chefcooking2 from "./assets/chefcooking2.png";
import Svg from "./assets/wave.svg";
import plate from "./assets/plate.png";
import produce from "./assets/Produce2.png";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";

const Homepage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { setUserId } = useContext(UserContext);
  let newUser = {};

  if (isAuthenticated) {
    newUser = { ...user, _id: user.sub };
    setUserId(newUser._id);
    sessionStorage.setItem("userId", newUser._id);
  }

  useEffect(() => {
    user &&
      newUser &&
      fetch("user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }, [isAuthenticated]);

  return (
    <Wrapper>
      <div>
        <img src={Svg}></img>
      </div>
      <TagLine>Turn your scraps...</TagLine>
      <ChefCooking src={chefcooking}></ChefCooking>
      <ChefCooking2 src={chefcooking2}></ChefCooking2>
      <Produce src={produce}></Produce>
      <Plate src={plate}></Plate>
      <TagLine2>...into snacks!</TagLine2>
    </Wrapper>
  );
};
// };

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  div {
    margin-top: -75px;
  }
`;

const Produce = styled.img`
  margin-top: 180px;
  max-width: 50%;
  position: absolute;
  overflow: hidden;
  z-index: -1;
`;

const ChefCooking = styled.img`
  max-width: 30%;
  position: absolute;
  left: 325px;
  top: 75px;
`;

const ChefCooking2 = styled.img`
  max-width: 30%;
  position: absolute;
  left: 670px;
  top: 275px;
  transform: scaleX(-1);
`;

const Plate = styled.img`
  max-width: 25%;
  position: absolute;
  margin-left: 965px;
  margin-top: 100px;
`;

const TagLine = styled.div`
  font-family: "Caveat", serif;
  z-index: 3000;
  position: absolute;
  top: 115px;
  left: 100px;
  font-size: 50px;
`;

const TagLine2 = styled.div`
  font-family: "Caveat", serif;
  z-index: 3000;
  position: absolute;
  font-size: 50px;
  top: 600px;
  left: 1100px;
`;

export default Homepage;
