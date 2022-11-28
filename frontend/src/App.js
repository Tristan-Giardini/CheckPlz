import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Recipe from "./Recipe";
import Footer from "./Footer";
import ComplexSearch from "./ComplexSearch";
import Explore from "./Explore";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const { userId } = useContext(UserContext);
  const [userPreferences, setUserPreferences] = useState({});

  // useEffect(() => {
  //   fetch(`/preferences/${userId}`).then((res) => {
  //     res
  //       .json()
  //       .then((data) => {
  //         setUserPreferences(data.data);
  //       })
  //       .catch((e) => console.log("got error", e));
  //   });
  // }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<ComplexSearch />} />
        <Route
          path="/explore"
          element={<Explore userPreferences={userPreferences} />}
        />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
