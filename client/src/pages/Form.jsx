import styled from "styled-components";
import React from "react";
import FormSeg from "../components/FormSeg";
import Header from "../components/Header";
import UpperHeader from "../components/UpperHeader";

const Form = () => {
  return (
    <Container>
      <UpperHeader />
      <Header />
      <FormSeg />
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
  margin-bottom: 50px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export default Form;
