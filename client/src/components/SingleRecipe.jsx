import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  addStep,
  getRecipe,
  removeRecipe,
  addIngrendience,
} from "../redux/recipeSlice";
import { Skeleton } from "@mui/material";
import { Button, Option, Select } from "./FormSeg";
import { editRecipe, removeRecipeFromArray } from "../redux/recipesSlice";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Popup from "./Popup";
import { getUser, removeDetails } from "../redux/recipeDetailSlice";
import { theme } from "../GlobalStyles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const SingleRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state.recipe);
  const { Recipesstatus } = useSelector((state) => state.recipes);
  const { status } = useSelector((state) => state.recipe);
  const creatorName = useSelector((state) => state.recipeDetail);
  let count = 1;
  const [editMode, setEditMode] = useState({
    type: "",
    mode: false,
    listEl: "",
  });
  const [changeRecipe, setChangeRecipe] = useState({});
  const newUser = useSelector((state) => state.user.user.result);
  let slug = useParams();
  // Just For Showing different ways to get ID from URL...
  const path = history.location.pathname.split("/", 3)[2];
  console.log(recipe);
  useEffect(() => {
    dispatch(getRecipe(path));
    return () => {
      dispatch(removeRecipe());
    };
  }, [dispatch, path, slug]);

  useEffect(() => {
    setChangeRecipe(recipe);
  }, [recipe, Recipesstatus]);

  useEffect(() => {
    if (recipe.creator !== undefined) {
      dispatch(getUser({ id: recipe.creator }));
    }
    return () => {
      dispatch(removeDetails());
    };
    // eslint-disable-next-line
  }, [recipe.creator]);

  const handleDelete = () => {
    dispatch(removeRecipeFromArray(slug.id));
    history.push("/");
  };

  const changeEditMode = (type, i) => {
    setEditMode((prev) => ({
      ...prev,
      type: type,
      mode: !editMode.mode,
      listEl: i,
    }));
  };

  const saveChangeRecipe = () => {
    dispatch(editRecipe(changeRecipe));
    setEditMode(!editMode);
    setEditMode({
      type: "",
      mode: false,
      listEl: "",
    });
    dispatch(getRecipe(path));
  };
  useEffect(() => {
    dispatch(getRecipe(path));
  }, [dispatch, path]);


  const handleChangeRecipe = (e, type, i) => {
    if (type === "ingrediencies") {
      let temp_state = [...recipe.ingrediencies];
      let temp_element = temp_state[i];
      temp_element = e.target.value;

      temp_state[i] = temp_element;
      setChangeRecipe((prev) => ({
        ...prev,
        ingrediencies: temp_state,
      }));
    } else if (type === "tutorial") {
      let temp_state = [...recipe.tutorial];
      let temp_element = temp_state[i];
      temp_element = e.target.value;
      temp_state[i] = temp_element;

      setChangeRecipe((prev) => ({
        ...prev,
        tutorial: temp_state,
      }));
    } else {
      setChangeRecipe((prev) => ({
        ...prev,
        [type]: e.target.value,
      }));
    }
  };

  const renderEditView = (type) => {
    return (
      <InputWrapper>
        <Input
          value={changeRecipe[type] || ""}
          onChange={(e) => handleChangeRecipe(e, type)}
          type="text"
        />
        <Button color="ed1c24" onClick={saveChangeRecipe}>
          SAVE
        </Button>
      </InputWrapper>
    );
  };

  const renderEditDropdownView = () => {
    return (
      <InputWrapper>
        <Select
          onChange={(e) => handleChangeRecipe(e, "level")}
          value={changeRecipe.level || ""}
          name="level"
        >
          <Option value="Simple">Simple</Option>
          <Option value="Middle">Middle</Option>
          <Option value="Hard">Hard</Option>
        </Select>
        <Button color="ed1c24" onClick={saveChangeRecipe}>
          SAVE
        </Button>
      </InputWrapper>
    );
  };

  const renderEditListView = () => {
    if (editMode.type === "tutorial") {
      return (
        <>
          <TextArea
            value={changeRecipe.tutorial[editMode.listEl] || ""}
            onChange={(e) => handleChangeRecipe(e, "tutorial", editMode.listEl)}
            type="text"
          />
          <ButtonWrapper>
            <Button color="ed1c24" onClick={saveChangeRecipe}>
              SAVE
            </Button>
          </ButtonWrapper>
        </>
      );
    } else if (editMode.type === "ingrediencies") {
      return (
        <>
          <Input
            value={changeRecipe.ingrediencies[editMode.listEl] || ""}
            onChange={(e) =>
              handleChangeRecipe(e, "ingrediencies", editMode.listEl)
            }
            type="text"
          />
          <Button color="ed1c24" onClick={saveChangeRecipe}>
            SAVE
          </Button>
        </>
      );
    }
  };
  const renderSkeleton = (count = 1, width, variant) => {
    const skeletonArray = Array(count).fill("");
    return skeletonArray.map((item, i) => (
      <Skeleton key={i} variant={variant} width={width} />
    ));
  };

  const handleAddStep = (type) => {
    if (type === "ingrendience") {
      dispatch(addIngrendience());
    } else {
      dispatch(addStep());
    }
  };

  return (
    <Wrapper>
      <Popup />
      {newUser?._id === recipe.creator}
      {newUser?._id === recipe.creator ? (
        editMode.mode && editMode.type === "title" ? (
          <Header>{renderEditView("title")}</Header>
        ) : (
          <Header onClick={() => changeEditMode("title")}>
            {recipe.title}
          </Header>
        )
      ) : (
        <Header cursor="true">{recipe.title}</Header>
      )}
      <Container>
        <Left>
          <BlockHeader>Info</BlockHeader>
          {status === "loading" ? (
            <>
              {renderSkeleton(1, "50%", "text")}
              {renderSkeleton(1, "30%", "text")}
              {renderSkeleton(1, "50%", "text")}
              {renderSkeleton(1, "30%", "text")}
            </>
          ) : (
            <>
              <Section>
                <AccessTimeIcon />
                <TextSection>
                  <SectionHeader>Prepare Time:</SectionHeader>
                  {editMode.mode && editMode.type === "cookTime" ? (
                    <div> {renderEditView("cookTime")} </div>
                  ) : (
                    <Text onClick={() => changeEditMode("cookTime")}>
                      {recipe.cookTime}
                    </Text>
                  )}
                </TextSection>
              </Section>
              <Section>
                <LocalDiningIcon />
                <TextSection>
                  <SectionHeader>Skills:</SectionHeader>
                  {editMode.mode && editMode.type === "level" ? (
                    <div>{renderEditDropdownView("level")}</div>
                  ) : (
                    <Text onClick={() => changeEditMode("level")}>
                      {recipe.level}
                    </Text>
                  )}
                </TextSection>
              </Section>
              <Section>
                <PersonOutlineIcon />
                <TextSection>
                  <SectionHeader>Author:</SectionHeader>
                  {creatorName.status === "loading" ? (
                    renderSkeleton(1, "100%", "text")
                  ) : (
                    <Text>{creatorName?.authorName}</Text>
                  )}
                </TextSection>
              </Section>
            </>
          )}
        </Left>
        {status === "loading" ? (
          <Skeleton variant="rectangular" height="450px" width="450px" />
        ) : (
          <RightImage>
            <Image src={recipe.img} />
          </RightImage>
        )}
      </Container>
      <Container>
        <Left>
          <BlockHeader>Ingrediencies</BlockHeader>
          {editMode.mode && editMode.type === "ingrediencies" ? (
            renderEditListView("ingrediencies")
          ) : status === "loading" ? (
            <>{renderSkeleton(10, "text")}</>
          ) : (
            recipe.ingrediencies.map((p, i) => (
              <Ul key={i}>
                <Li onClick={() => changeEditMode("ingrediencies", i)}>
                  <ArrowForwardIosIcon
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      color: `${theme.color.orange}`,
                      width: "20px",
                    }}
                  />
                  {p}
                </Li>
              </Ul>
            ))
          )}
          {editMode.type === "ingrediencies" ? (
            ""
          ) : (
            <Button
              onClick={() => handleAddStep("ingrendience")}
              color="FBB03B"
              padding="9px"
            >
              <ControlPointIcon
                style={{ fontSize: "17px", marginRight: "5px" }}
              />
              Add Ingrendience
            </Button>
          )}
        </Left>
        <Right tutorial>
          <BlockHeader>How To Prepare</BlockHeader>
          {editMode.mode && editMode.type === "tutorial" ? (
            renderEditListView("tutorial")
          ) : status === "loading" ? (
            <>
              <SkeletonTut
                variant="rectangular"
                height="200px"
                animation="pulse"
              />
              <SkeletonTut
                variant="rectangular"
                height="200px"
                animation="pulse"
              />
              <SkeletonTut
                variant="rectangular"
                height="200px"
                animation="pulse"
              />
            </>
          ) : (
            recipe.tutorial.map((p, i) => (
              <div key={i}>
                <TutorialBlock onClick={() => changeEditMode("tutorial", i)}>
                  <Text>{p}</Text>
                  <Count>{count++}</Count>
                </TutorialBlock>
              </div>
            ))
          )}
          {editMode.type === "tutorial" ? (
            ""
          ) : (
            <Button onClick={handleAddStep} color="FBB03B" padding="9px">
              <ControlPointIcon
                style={{ fontSize: "17px", marginRight: "5px" }}
              />
              Add Step
            </Button>
          )}
        </Right>
      </Container>
      <ButtonWrapper>
        {newUser?._id === recipe.creator && (
          <Button onClick={handleDelete} color="ed1c24">
            DELETE RECIPE
          </Button>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  position: relative;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 20vh;
  border: none;
  padding: 5px;
  background-color: ${theme.color.gray};
`;
const SkeletonTut = styled(Skeleton)`
  margin: 10px;
`;
const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;
const Input = styled.input`
  font-size: 20px;
  width: 90%;
  border-radius: 10px;

  background-color: ${theme.color.gray};
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Left = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${theme.color.white};
  margin: 10px;
  min-width: 200px;
  border-radius: 5px;
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.color.white};
  padding: 10px 0px;
`;
const SectionHeader = styled.h4``;
const Header = styled.h1`
  margin: 0 auto;
  text-align: center;
  cursor: ${(props) => (props.cursor ? "not-allowed" : "cursor")};
  padding: 20px 0px;
`;

const Text = styled.p`
  cursor: pointer;
  padding: 10px 0px;
  border-radius: 10px;
  &:hover {
    background-color: ${theme.color.gray};
  }
`;
const Ul = styled.ul`
  padding: 0;
`;
const TutorialBlock = styled.div`
  position: relative;
  background-color: ${theme.color.white};
  min-height: 100px;
  margin-bottom: 20px;
  background-color: ${theme.color.gray};
  border-left: 2px dashed ${theme.color.orange};
  padding: 20px;
`;
const Li = styled.li`
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px;
  &:hover {
    background-color: ${theme.color.gray};
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlockHeader = styled.h2`
  padding-bottom: 20px;
`;
const Count = styled.div`
  position: absolute;
  top: -10px;
  left: -15px;
  height: 25px;
  border-radius: 50%;
  width: 25px;
  background-color: ${theme.color.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.white};
  font-weight: bold;
  font-size: 20px;
  z-index: 5;
`;
const Image = styled.img`
  min-width: 100%;
  width: 40%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
`;
const Right = styled.div`
  flex: 2;
  padding: 20px;
  background-color: ${theme.color.white};
  margin: 10px;
  font-family: "Patrick Hand", cursive;
  border-radius: 5px;
`;
const RightImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 10px;
  min-width: 200px;
`;
export default SingleRecipe;
