import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth, logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
const UpperHeader = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const localStorageItem = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const newUser = useSelector((state) => state?.user.user.result);
  let userNameLenght = newUser?.username.length;
  useEffect(() => {
    if (
      (location.pathname === "/login" && userNameLenght > 0) ||
      (location.pathname === "/register" && userNameLenght > 0)
    ) {
      history.push("/");
    }
    if (localStorageItem?.token) {
      const decodedToken = decode(localStorageItem.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  });

  useEffect(() => {
    if (localStorageItem) {
      dispatch(auth());
    }
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <Container>
      <Left>{newUser ? <p>{newUser.username.toUpperCase()}</p> : ""}</Left>
      <Right>
        {userNameLenght > 0 ? "" : <LinkWrap to="/login">Login</LinkWrap>}
        {userNameLenght > 0 ? "" : <LinkWrap to="/register">Register</LinkWrap>}
        {userNameLenght > 0 ? (
          <P onClick={() => dispatch(logout())}>Logout</P>
        ) : (
          ""
        )}
      </Right>
    </Container>
  );
};

export default UpperHeader;
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;
const Left = styled.div`
  flex: 1;
  padding: 10px;
`;
const P = styled.p`
  cursor: pointer;
`;
const LinkWrap = styled(Link)`
  margin: 0px 10px;
`;
