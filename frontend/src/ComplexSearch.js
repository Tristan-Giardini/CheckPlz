import { useState, useRef } from "react";
import styled from "styled-components";
import MealCard from "./MealCard";
import Carousel from "styled-components-carousel";

const ComplexSearch = () => {
  const ref = useRef(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/filtered-recipes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setFilteredRecipes(data.data.results);
      });
  };

  console.log("form", formData);

  return (
    <>
      <FormDiv>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            name="ingredients"
            placeholder="eggs, tomatoes, ..."
            onChange={handleChange}
          />
          <div>
            <p>Choose Your Diet</p>
            <input
              type="radio"
              name="diet"
              value="none"
              onChange={handleChange}
            />
            none
            <input
              type="radio"
              name="diet"
              value="vegan"
              onChange={handleChange}
            />
            vegan
            <input
              type="radio"
              name="diet"
              value="vegetarian"
              onChange={handleChange}
            />
            vegetarian
            <input
              type="radio"
              name="diet"
              value="ketogenic"
              onChange={handleChange}
            />
            ketogenic
            <input
              type="radio"
              name="diet"
              value="pescatarian"
              onChange={handleChange}
            />
            pescatarian
          </div>
          <div>
            <p>Choose Your Cuisine</p>
            <input
              type="radio"
              value="any"
              name="cuisine"
              onChange={handleChange}
            />
            any
            <input
              type="radio"
              value="african"
              name="cuisine"
              onChange={handleChange}
            />
            african
            <input
              type="radio"
              value="american"
              name="cuisine"
              onChange={handleChange}
            />
            american
            <input
              type="radio"
              value="italian"
              name="cuisine"
              onChange={handleChange}
            />
            italian
            <input
              type="radio"
              value="mexican"
              name="cuisine"
              onChange={handleChange}
            />
            mexican
          </div>
          <button>Search</button>
        </Form>
      </FormDiv>
      {filteredRecipes ? (
        <>
          <Container>
            <h1>Results</h1>
            <Carousel infinite={false} shouldIndicator={false} slidesToShow={4}>
              {filteredRecipes.map((recipe, index) => {
                return <MealCard key={index} recipe={recipe} />;
              })}
            </Carousel>
          </Container>
        </>
      ) : (
        ""
      )}
    </>
  );
};

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  div {
    padding: 20px;
  }
`;

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px;
`;

export default ComplexSearch;
