import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Error } from "../components/FormSeg";
import Header from "../components/Header";
import UpperHeader from "../components/UpperHeader";
import { theme } from "../GlobalStyles";
import { removeUserError, signin } from "../redux/userSlice";
import { mobile } from "../responsive";

const Login = () => {
  const { error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(removeUserError());
    }, 2000);
  }, [error, dispatch]);
  return (
    <Container>
      <UpperHeader />
      <Header />
      <Form onSubmit={handleSubmit}>
        <Head>Login</Head>
        <Input
          name="email"
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => handleChange(e)}
        />
        <Input
          value="Login"
          type="submit"
          placeholder="Login"
          color="FBB03B"
          fontColor="white"
          cursor="pointer"
          center
        />
        <Text>
          Not Registered? <Link to="/register">Register Now</Link>
        </Text>
        <Text>
          Forgot Password? <Link to="/password-reset">Reset Password</Link>
        </Text>
        {error ? <Error>{error} </Error> : ""}
      </Form>
    </Container>
  );
};
const Input = styled.input`
  width: 100%;
  margin: 10px 10px;
  border: none;
  padding: 10px 10px;
  background-color: #${(props) => (props.color ? props.color : "f6f6f6")};
  color: ${(props) => (props.fontColor ? props.fontColor : "gray")};
  cursor: ${(props) => props.cursor};
  text-align: ${(props) => (props.center ? "center" : "")};
`;
const Head = styled.h2`
  transition: color 250ms ease-in-out;
  padding: 10px;
`;
const Text = styled.p`
  text-align: center;
  margin-bottom: 10px;
  display: block;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 50px auto;
  background-color: ${theme.color.white};
  ${mobile({ width: "100%" })}
`;
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
export default Login;
