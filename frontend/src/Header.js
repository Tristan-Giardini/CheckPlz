import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { GiCookingGlove } from "react-icons/gi";

const Header = () => {
  const { isLoading, error, isAuthenticated } = useAuth0(); //imported for conditional rendering

  return (
    <Wrapper>
      <Container>
        <div>
          <Logo to={"/"}>
            CheckPlz <GiCookingGlove />
          </Logo>
        </div>
        <ExploreSearch>
          <ExploreNav to={`/explore`}>Explore</ExploreNav>
          <SearchNav to={"/search"}>Search</SearchNav>
          {isAuthenticated ? (
            <ProfileNav to={"/profile"}>Profile</ProfileNav>
          ) : (
            ""
          )}
        </ExploreSearch>
        <div>
          {/* <NavLink to={"/profile"}>Profile</NavLink> */}
          {error && <p>Authentication Error</p>}
          {error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && (
            <>
              <LoginButton />
              <LogoutButton />
            </>
          )}
        </div>
      </Container>
      <Underline></Underline>
      {/* <GradientDiv></GradientDiv> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2000;
  background-color: transparent;
`;

const ExploreSearch = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 700px;
  margin-top: 10px;
`;

const ExploreNav = styled(NavLink)`
  padding: 20px;
  margin: 10px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const SearchNav = styled(NavLink)`
  padding: 20px;
  margin: 10px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const ProfileNav = styled(NavLink)`
  padding: 20px;
  margin: 10px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  height: 80px;
  background-color: var(--darker-pink);
`;

const Logo = styled(NavLink)`
  font-family: "Shrikhand", cursive;
  font-size: 40px;
  text-decoration: none;
  color: black;
`;

const Underline = styled.div`
  border-bottom: 1px solid black;
`;

export default Header;
