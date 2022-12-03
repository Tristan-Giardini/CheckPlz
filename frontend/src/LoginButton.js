import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    )
  );
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 20px;
  padding-bottom: 30px;
  margin: 10px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  text-decoration: none;
`;
//the login is saying if it's not authenticated then show a sign in button
//on click it redirects to login

export default LoginButton;
