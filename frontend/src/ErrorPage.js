import React, { useContext } from "react";
import { FaBomb } from "react-icons/fa";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const ErrorPage = () => {
  const { errorMessage } = useContext(UserContext);
  return (
    <StyledDiv>
      <div className="text">
        <FaBomb size="100" />
      </div>
      <div className="error">An unknown error has occured!</div>
      <div className="trip">{errorMessage}</div>
      <div>Either refresh the page...</div>

      <a href={`/`}>Or please return home!</a>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  height: 30rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 25px;

  .error {
    font-weight: bold;
    padding: 60px;
  }

  .trip {
    margin-top: -20px;
  }

  .bomb {
    size: 100px;
  }
`;

export default ErrorPage;
