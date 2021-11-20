import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import UpperHeader from "../components/UpperHeader";
import Ticker from "react-ticker";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <Container>
      <Ticker>
        {() => (
          <>
            <SliderText>
              <span style={{ color: "red" }}>Warning!</span> This is app in
              development. I'm still adding more features like data validation
              etc., huge code refactoring is in a plan soon! &nbsp;
            </SliderText>
          </>
        )}
      </Ticker>
      <UpperHeader />
      <Header />
      <SearchBar />
      <RecipesList />
    </Container>
  );
};
export const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 5px;
  min-height: 700px;
  background-position: 98% 100%;
  background-repeat: no-repeat;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const SliderText = styled.h3``;
export default Home;
