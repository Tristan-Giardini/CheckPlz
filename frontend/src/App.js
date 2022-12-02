import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Recipe from "./Recipe";
import ComplexSearch from "./ComplexSearch";
import Explore from "./Explore";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<ComplexSearch />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
