import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { theme } from "../GlobalStyles";
import { getRecipes, searchRecipe } from "../redux/recipesSlice";
import { Search } from "@material-ui/icons";
import styled from "styled-components";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (history.location !== "/") {
      dispatch(searchRecipe(term));
      if (term.length > 0) {
        dispatch(searchRecipe(term));
      } else {
        dispatch(getRecipes());
      }
      setTerm("");
    }
  };

  return (
    <SearchContainer>
      <Form onSubmit={submitHandler}>
        <Input
          value={term}
          placeholder="search recipe"
          onChange={(e) => setTerm(e.target.value)}
        />
        <SearchIcon
          style={{ color: "white", fontSize: "16px", height: "32px" }}
          onClick={submitHandler}
        />
      </Form>
    </SearchContainer>
  );
};

const Input = styled.input`
  border: none;
  height: 22px;
  padding: 5px;
  background-color: white;
  text-align: left;
  width: 100%;
`;
const SearchContainer = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  height: 22px;
`;
const SearchIcon = styled(Search)`
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
  background: ${theme.color.orange};
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
`;
export default SearchBar;
