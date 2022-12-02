import { useState, useRef } from "react";
import styled from "styled-components";
import MealCard from "./MealCard";
import Svg from "./assets/bottomwave.svg";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
import Carousel from "styled-components-carousel";

const ComplexSearch = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [formData, setFormData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDietHidden, setIsDietHidden] = useState(true);
  const [isCuisineHidden, setIsCuisineHidden] = useState(true);
  const [userPreferences, setUserPreferences] = useState({});
  const { userId } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: [e.target.value],
    });
  };

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

  const handleKeyDown = () => {
    setIsDisabled(false);
  };

  const like = false;
  const dislike = false;

  if (!userPreferences.likes || !userPreferences.dislikes) {
    <h1>Loading...</h1>;
  } else {
    return (
      <>
        <BackgroundDiv>
          <Wrapper>
            <DietButton
              onClick={() => {
                setIsDietHidden((prev) => !isDietHidden);
              }}
            >
              {isDietHidden ? "more diets..." : "...less diets"}
            </DietButton>
            <CuisineButton
              onClick={() => {
                setIsCuisineHidden((prev) => !isCuisineHidden);
              }}
            >
              {isCuisineHidden ? "more cuisines..." : "...less cuisines"}
            </CuisineButton>
            <FormDiv>
              <Form onSubmit={handleSubmit}>
                <TextInput
                  type="text"
                  name="ingredients"
                  placeholder="eggs, tomatoes, ..."
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <ChoicesDiv>
                  <DietDiv>
                    <p>Choose Your Diet</p>
                    <PrimaryDiet>
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
                    </PrimaryDiet>
                    {!isDietHidden ? (
                      <HiddenDiets>
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
                        <input
                          type="radio"
                          name="diet"
                          value="gluten free"
                          onChange={handleChange}
                        />
                        gluten free
                        <input
                          type="radio"
                          name="diet"
                          value="paleo"
                          onChange={handleChange}
                        />
                        paleo
                        <input
                          type="radio"
                          name="diet"
                          value="whole30"
                          onChange={handleChange}
                        />
                        whole30
                      </HiddenDiets>
                    ) : (
                      ""
                    )}
                  </DietDiv>
                  <CuisineDiv>
                    <p>Choose Your Cuisine</p>
                    <PrimaryCuisine>
                      <input
                        type="radio"
                        value="any"
                        name="cuisine"
                        onChange={handleChange}
                      />
                      any
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
                    </PrimaryCuisine>
                    {!isCuisineHidden ? (
                      <HiddenCuisine>
                        <input
                          type="radio"
                          value="caribbean"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        caribbean
                        <input
                          type="radio"
                          value="chinese"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        chinese
                        <input
                          type="radio"
                          value="french"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        french
                        <input
                          type="radio"
                          value="greek"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        greek
                        <input
                          type="radio"
                          value="indian"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        indian
                        <input
                          type="radio"
                          value="japanese"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        japanese
                        <input
                          type="radio"
                          value="jewish"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        jewish
                        <input
                          type="radio"
                          value="korean"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        korean
                        <input
                          type="radio"
                          value="mediterranean"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        mediterranean
                        <input
                          type="radio"
                          value="middle eastern"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        middle eastern
                        <input
                          type="radio"
                          value="southern"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        spanish
                        <input
                          type="radio"
                          value="thai"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        thai{" "}
                        <input
                          type="radio"
                          value="vietnamese"
                          name="cuisine"
                          onChange={handleChange}
                        />
                        vietnamese
                      </HiddenCuisine>
                    ) : (
                      ""
                    )}
                  </CuisineDiv>
                </ChoicesDiv>
                <Button isDisabled={isDisabled}>Search</Button>
              </Form>
            </FormDiv>

            {filteredRecipes ? (
              <>
                <Container>
                  <h1>Results</h1>
                  {/* <MealCardWrapper> */}
                  <Carousel
                    infinite={false}
                    showIndicator={false}
                    slidesToShow={3}
                  >
                    {filteredRecipes.map((recipe, index) => {
                      return (
                        <MealCard
                          key={index}
                          recipe={recipe}
                          like={userPreferences.likes}
                          dislike={userPreferences.dislikes}
                        />
                      );
                    })}
                  </Carousel>
                  {/* </MealCardWrapper> */}
                </Container>
              </>
            ) : (
              ""
            )}
          </Wrapper>
          <Wave>
            <img src={Svg}></img>
            <BottomDiv></BottomDiv>
          </Wave>
        </BackgroundDiv>
      </>
    );
  }
};

const BackgroundDiv = styled.div`
  background-color: var(--select-grey);
  width: 100vw;
`;

const BottomDiv = styled.div`
  background-color: var(--darker-pink);
  height: 600px;
  margin-top: -10px;
`;

const TextInput = styled.input`
  box-shadow: 0 0 5pt 0.5pt #d3d3d3;
  appearance: none;
  outline: none;
  border: none;
  height: 40px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 20px;
  background: linear-gradient(90deg, #222, #222) center bottom/0 2px no-repeat,
    linear-gradient(90deg, #ccc, #ccc) left bottom/100% 2px no-repeat,
    linear-gradient(90deg, #fafafa, #fafafa) left bottom/100% no-repeat;
  transition: background-size 0.3s ease;
  :focus {
    background-size: 100% 2px, 100% 2px, 100%;
  }
`;

const DietButton = styled.button`
  position: absolute;
  margin-top: 160px;
  margin-left: 490px;
  font-size: 11px;
  background: none;
  border: none;
  :hover {
    cursor: pointer;
    color: var(--darker-pink);
  }
`;
const CuisineButton = styled.button`
  position: absolute;
  margin-top: 278px;
  margin-right: 490px;
  font-size: 11px;
  background: none;
  border: none;
  :hover {
    cursor: pointer;
    color: var(--darker-pink);
  }
`;

const ChoicesDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const DietDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrimaryDiet = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const HiddenDiets = styled.div`
  width: 300px;
`;

const HiddenCuisine = styled.div`
  width: 300px;
`;

const PrimaryCuisine = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const CuisineDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 215px;
  margin-right: 215px;
  background-color: white;
  height: 620px;
  /* overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none; */
  }
`;

const MealCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1000px;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 995px;
  h1 {
    margin: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  div {
    padding: 20px;
  }
  z-index: 2001;
`;

const FormDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
`;

const Wave = styled.div`
  margin-top: -300px;
`;

const Button = styled.button`
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.isDisabled ? "50%" : "100%")};
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #e5989a 5%, #f6f6f6 100%);
  background-color: #e5989a;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  color: #666666;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  :hover {
    background: ${(props) =>
      props.isDisabled
        ? ""
        : "linear-gradient(to bottom, #f6f6f6 5%, #e5989a 100%)"};
    background-color: ${(props) => (props.isDisabled ? "" : "#f6f6f6")};
  }
`;

export default ComplexSearch;
