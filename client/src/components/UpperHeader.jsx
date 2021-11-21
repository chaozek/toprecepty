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

  useEffect(() => {
    if (
      (location.pathname === "/login" && newUser) ||
      (location.pathname === "/register" && newUser)
    ) {
      history.push("/");
    }
    if (localStorageItem?.token) {
      const decodedToken = decode(localStorageItem.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [newUser, history, dispatch, localStorageItem, location.pathname]);

  useEffect(() => {
    if (localStorageItem) {
      dispatch(auth());
    }
// eslint-disable-next-line
}, [dispatch]);

  return (
    <Container>
      <Left>{newUser ? <p>{newUser.username}</p> : ""}</Left>
      <Right>
        {newUser ? "" : <LinkWrap to="/login">Login</LinkWrap>}
        {newUser ? "" : <LinkWrap to="/register">Register</LinkWrap>}
        {newUser ? <P onClick={() => dispatch(logout())}>Logout</P> : ""}
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
