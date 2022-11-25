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
      <ImageDiv>
        <Produce src={produce}></Produce>
        <Plate src={plate}></Plate>
      </ImageDiv>
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

const ImageDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Produce = styled.img`
  margin-top: -50px;
  max-width: 50%;
  clip-path: inset(0 0 260px 0);
`;

const Plate = styled.img`
  max-width: 25%;
  position: absolute;
  margin-left: 1000px;
  margin-top: 140px;
`;

export default Homepage;
