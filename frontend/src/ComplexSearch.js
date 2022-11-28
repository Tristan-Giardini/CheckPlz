import { useState, useRef } from "react";
import styled from "styled-components";
import MealCard from "./MealCard";
import Carousel from "styled-components-carousel";
import Svg from "./assets/bottomwave.svg";

const ComplexSearch = () => {
  const ref = useRef(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: [e.target.value],
    });
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
      <BackgroundDiv>
        <Wrapper>
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
                <MealCardWrapper>
                  {filteredRecipes.map((recipe, index) => {
                    return <MealCard key={index} recipe={recipe} />;
                  })}
                </MealCardWrapper>
              </Container>
            </>
          ) : (
            ""
          )}
        </Wrapper>
        <Wave>
          <img src={Svg}></img>
        </Wave>
      </BackgroundDiv>
    </>
  );
};

const BackgroundDiv = styled.div`
  background-color: var(--select-grey);
`;

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 215px;
  margin-right: 215px;
  background-color: white;
  height: 620px;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MealCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1200px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 995px;
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
  margin-top: 40px;
`;

const Wave = styled.div`
  margin-top: -300px;
`;

export default ComplexSearch;
