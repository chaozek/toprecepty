import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../GlobalStyles";
import { mobile } from "../responsive";
import { useState } from "react";
import { resetPassword } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "./FormSeg";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";

const ResetPasswordSeg = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ email: "" });
  const [disabled, setDisabled] = useState(false);
  const { error } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.user);
  const { successfulySent } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };
  useEffect(() => {
    status === "success" && setDisabled(true);
  }, [successfulySent, status]);
  const handleChange = (e) => {
    setEmail((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  return (
    <Container>
      <Form>
        <Head>Forgot password?</Head>
        <Input
          name="e-mail"
          placeholder="E-mail"
          value={email.email}
          onChange={(e) => handleChange(e)}
        />

        {successfulySent ? (
          <Success>{successfulySent}</Success>
        ) : (
          <Button onClick={handleSubmit} disabled={disabled}>
            {status === "loading" ? (
              <HourglassFullIcon />
            ) : (
              "Send Reset Link To Your E-mail"
            )}
          </Button>
        )}
        <Text>
          Already have an account? <Link to="/login">Login now</Link>
        </Text>
        {error ? <Error>{error} </Error> : ""}
      </Form>
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
const Head = styled.h2`
  transition: color 250ms ease-in-out;
  padding: 10px;
`;
const Success = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9e3ab;
  background-color: #8bc34a;
  padding: 10px 0px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100%;
  margin: 10px 10px;
  border: none;
  padding: 10px 10px;
  background-color: #${(props) => (props.color ? props.color : "f6f6f6")};
  color: ${(props) => (props.fontColor ? props.fontColor : "gray")};
  text-align: ${(props) => (props.center ? "center" : "")};
`;
const Button = styled.button`
  width: 100%;
  margin: 10px 10px;
  border: none;
  padding: 10px 10px;
  color: white;
  background-color: #fbb03b;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
const Text = styled.p`
  text-align: center;
  margin-bottom: 10px;
`;
export default ResetPasswordSeg;
