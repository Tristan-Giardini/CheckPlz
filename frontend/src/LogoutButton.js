import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <Button onClick={() => logout()}> Sign Out</Button>;
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
//the logout button is saying if it is authenticated then show a sign out button
//on click it redirects to logout

export default LogoutButton;
