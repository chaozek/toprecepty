import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import SingleRecipe from "../components/SingleRecipe";
import UpperHeader from "../components/UpperHeader";
const Recipe = () => {
  return (
    <Container>
      <UpperHeader />
      <Header />
      <SingleRecipe />
    </Container>
  );
};
const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 5px;
  min-height: 700px;
  background-position: 98% 100%;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export default Recipe;
