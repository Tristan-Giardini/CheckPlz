import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <Button onClick={() => logout()}>Logout</Button>;
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 20px;
  margin: 10px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  text-decoration: none;
`;
//the logout button is saying if it is authenticated then show a sign out button
//on click it redirects to logout

export default LogoutButton;
