import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    )
  );
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  display: inline-block;
  cursor: pointer;
  /* border-style: solid;
  border-radius: 1px;
  border-color: transparent; */
  color: black;
  font-size: 20px;
  padding-top: 9px;
  /* padding: 18px;
  margin: 10px; */
  text-decoration: none;
  /* :hover {
    border-style: solid;
    border-radius: 1px;
    border-color: black;
  } */
`;
//the login is saying if it's not authenticated then show a sign in button
//on click it redirects to login

export default LoginButton;
