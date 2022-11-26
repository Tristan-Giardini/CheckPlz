import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const Profile = ({ userId }) => {
  const { user, isAuthenticated } = useAuth0();
  console.log("user id:", user.sub);
  console.log("user", user);
  return (
    isAuthenticated && (
      <Wrapper>
        <Container>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <img src={user.picture}></img>
        </Container>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div``;

const Container = styled.div``;

//Holds the profile info from auth0
//Could probably figure out how to do a proper fetch. Or just deconstruct the user and then render the object values with the keys. If authenticated... proceed

export default Profile;
