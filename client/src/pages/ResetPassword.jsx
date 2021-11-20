import styled from "styled-components";
import React, { useEffect } from "react";
import Header from "../components/Header";
import UpperHeader from "../components/UpperHeader";
import ResetPasswordSeg from "../components/ResetPasswordSeg";
import { useLocation } from "react-router";
import ChangePassword from "../components/ChangePassword";
import { removeSuccessfulySent } from "../redux/userSlice";

const ResetPassword = () => {
  let location = useLocation();
  //const path = history.location.pathname.split("/", 3)[2];

  const renderView = () => {
    return location.pathname.split("/").length > 3 ? (
      <ChangePassword />
    ) : (
      <ResetPasswordSeg />
    );
  };
  useEffect(() => {
    renderView();
    return () => {
      removeSuccessfulySent();
    };
    /* eslint-disable */
  }, []);

  return (
    <Container>
      <UpperHeader />
      <Header />
      {renderView()}
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

export default ResetPassword;
