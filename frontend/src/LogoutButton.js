import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <button onClick={() => logout()}> Sign Out</button>;
};

//the logout button is saying if it is authenticated then show a sign out button
//on click it redirects to logout

export default LogoutButton;
