import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, removeStatus } from "../redux/recipesSlice";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { theme } from "../GlobalStyles";
const RecipesList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.recipes.status);
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(removeStatus());
    // eslint-disable-next-line
  }, []);

  const skeletonArray = Array(20).fill("");
  const renderNotFoundBlock = () => {
    return <div>NO RECIPE WAS FOUND, SEARCH AGAIN</div>;
  };
  console.log(status);
  return (
    <Container>
      <Recipes>
        {status === "loading" ? (
          <Recipes>
            {skeletonArray.map((data, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height="150px"
                animation="pulse"
              />
            ))}
          </Recipes>
        ) : (
          recipes.map((s, i) => (
            <LinkWrap key={s._id} to={`recipe/${s._id}`}>
              <Inside image={s.img}></Inside>
              <Header>{s.title}</Header>
            </LinkWrap>
          ))
        )}
      </Recipes>
      {status !== "loading" && recipes.length === 0 && renderNotFoundBlock()}
    </Container>
  );
};
const Container = styled.div``;

const Recipes = styled.div`
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  display: grid;
  column-gap: 10px;
  row-gap: 10px;
  grid-auto-rows: 200px;
  margin: 15px 0rem;
  text-align: center;
  margin: 10px, 0px;
`;
const Inside = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  transition: 0.7s;
  &:hover {
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;
const Header = styled.h2`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 1px 1px 2px rgb(0 0 0 / 50%);
  color: ${theme.color.white};
  transition: color 250ms ease-in-out;
`;
const LinkWrap = styled(Link)`
  position: relative;
  background-color: white;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;

  overflow: hidden;
  &:hover ${Header} {
    color: ${theme.color.orange};
  }
`;

export default RecipesList;
