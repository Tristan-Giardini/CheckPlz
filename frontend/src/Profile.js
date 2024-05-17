import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { useEffect, useState, useContext } from "react";
import SimilarRecipeCard from "./SimilarRecipeCard";
import CircularProgress from "@mui/material/CircularProgress";
import ModalComponent from "./ModalComponent";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const { userId, setFailed, setErrorMessage } = useContext(UserContext);
  const [userPreferences, setUserPreferences] = useState({});
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    fetch(`/preferences/${userId}`).then((res) => {
      res
        .json()
        .then((data) => {
          setUserPreferences(data.data);
        })
        .catch((e) => {
          setFailed(true);
          setErrorMessage("Sorry we couldn't find what you were looking for!");
        });
    });
  }, [userId]);

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      setIsModal(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const deleteUser = () => {
    fetch(`/delete-user/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        logout();
        window.alert("User deleted!");
      })
      .catch((e) => {
        console.log("Error deleting user");
      });
  };

  console.log(userPreferences);

  if (!isAuthenticated || !userPreferences || !user || !userPreferences.likes) {
    return (
      <LoadingDiv>
        <div>
          <CircularProgress color="inherit" />
        </div>
      </LoadingDiv>
    );
  } else {
    return (
      <BackgroundDiv>
        <Wrapper>
          <Title>
            <img src={user.picture}></img>
            <Name>
              <h1>{user.name}</h1>
              <div>{user.email}</div>
            </Name>
            <button onClick={() => setIsModal(true)}>Delete account?</button>
          </Title>
          {!isModal ? null : (
            <ModalDiv onClick={() => setIsModal(false)}>
              <ModalComponent setIsModal={setIsModal} deleteUser={deleteUser} />
            </ModalDiv>
          )}
          <BottomDiv>
            <h1>Bookmarked Recipes</h1>
            <Container>
              {userPreferences.likes.map((like, index) => {
                return (
                  <>
                    <div key={index}>
                      <SimilarRecipeCard recipe={like} />
                    </div>
                  </>
                );
              })}
            </Container>
          </BottomDiv>
          <BioDiv>
            <Bio>
              <h2>
                <div>Cooking Rank: Hobby</div>
                <div>Diet: None</div>
                <div>Allergies: None</div>
                <div>Speciality: Italian</div>
                <div>Favorite Dish: Carbonara</div>
              </h2>
            </Bio>
          </BioDiv>
        </Wrapper>
      </BackgroundDiv>
    );
  }
};

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  height: 50vh;
`;

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  margin-left: 175px;
  margin-right: 175px;
  background-color: white;
  height: 643px;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  padding-left: 50px;
  max-width: 1020px;
  border-bottom: 2px solid var(--select-grey);
  img {
    border-radius: 50%;
    width: 5%;
    margin-right: 10px;
  }
  button {
    margin-left: 515px;
  }
`;

const ModalDiv = styled.div`
  position: absolute;
  height: 643px;
  width: 1090px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 50px;
`;

const BioDiv = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  max-width: 600px;
  display: flex;
  flex-direction: row;
`;

const BottomDiv = styled.div`
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  max-width: 1000px;
  height: 500px;
  border-bottom: 2px solid var(--select-grey);
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  h1 {
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 20px;
`;

const BackgroundDiv = styled.div`
  background-color: var(--select-grey);
  width: 100vw;
`;

//Holds the profile info from auth0
//Could probably figure out how to do a proper fetch. Or just deconstruct the user and then render the object values with the keys. If authenticated... proceed

export default Profile;
