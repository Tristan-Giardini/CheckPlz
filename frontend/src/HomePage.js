import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
import styled from "styled-components";
import Image from "./assets/Groceries-960.jpeg";
import Svg from "./assets/wave.svg";
import plate from "./assets/plate.png";
import produce from "./assets/produceleft.png";

const Homepage = () => {
  return (
    <Wrapper>
      <div>
        <img src={Svg}></img>
      </div>
      <Produce src={produce}></Produce>
      <Plate src={plate}></Plate>
    </Wrapper>
  );
};
// };

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  div {
    margin-top: -125px;
  }
`;

const ImageDiv = styled.div``;

const Produce = styled.img`
  margin-top: -250px;
  max-width: 50%;
  clip-path: inset(0 0 350px 0);
`;

const Plate = styled.img`
  max-width: 25%;
  position: absolute;
  margin-left: 1300px;
  margin-top: 250px;
`;

export default Homepage;
