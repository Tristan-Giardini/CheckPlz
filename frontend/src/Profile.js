import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import LikedDishes from "./LikedDishes";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { userId } = useContext(UserContext);
  const [userPreferences, setUserPreferences] = useState({});

  useEffect(() => {
    fetch(`/preferences/${userId}`).then((res) => {
      res
        .json()
        .then((data) => {
          setUserPreferences(data.data);
        })
        .catch((e) => console.log("got error", e));
    });
  }, [userId]);

  console.log(userPreferences);

  return (
    isAuthenticated &&
    userPreferences &&
    userPreferences.likes &&
    user && (
      <Wrapper>
        <Container>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <img src={user.picture}></img>
          {userPreferences.likes.map((like, index) => {
            return (
              <>
                <div key={index}>
                  <LikedDishes like={like} />
                </div>
              </>
            );
          })}
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
