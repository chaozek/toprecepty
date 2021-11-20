import React from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
import { theme } from "../GlobalStyles";
import { useHistory } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Header = () => {
  const history = useHistory();
  return (
    <Container>
      <Left>
        {history.location.pathname !== "/" && (
          <Link to="/">
            <Button fullWidth>
              <ArrowBackIosIcon style={{ paddingRight: "5px" }} />
              Back
            </Button>
          </Link>
        )}
      </Left>
      <Center>
        <Link to="/">
          <Logo>Top Recipes</Logo>
        </Link>
      </Center>
      <Right>
        <Link to="/add">
          <Button>
            <ControlPointIcon style={{ paddingRight: "5px" }} />
            Add Recipe
          </Button>
        </Link>
      </Right>
    </Container>
  );
};
export const Container = styled.div`
  background-image: url(https://cdn.wallpapersafari.com/32/13/n40HrL.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 30px 0px;
  ${mobile({ padding: "30px 0px 0px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  ${mobile({ order: 2, width: "100%", justifyContent: "center" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-left: 5px;
  ${tablet({ justifyContent: "center", margin: "10px" })}
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  ${tablet({ width: "100%" })}
  ${mobile({ width: "100%", order: 1 })}
`;
const Logo = styled.h1`
  color: ${theme.color.white};
  font-size: 40px;
  text-shadow: 2px 2px 4px #000000;
  transition: all 300ms ease-in-out;
  ${mobile({ marginBottom: "20px" })}

  &:hover {
    color: ${theme.color.orange};
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
  background: ${theme.color.red};
  color: ${theme.color.white};
  border: none;
  height: 32px;
  flex: 1;
  transition: all 300ms ease-in-out;
  width: ${(props) => (props.fullWidth ? "100%" : "")};
  &:hover {
    background-color: ${theme.color.orange};
  }
`;
export default Header;
