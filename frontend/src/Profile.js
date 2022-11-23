import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <article className="column">{JSON.stringify(user)}</article>
    )
  );
};

//holds the profile info from auth0
//Could probably figure out how to do a proper fetch. Or just deconstruct the user and then render the object values with the keys. If authenticated... proceed

export default Profile;
