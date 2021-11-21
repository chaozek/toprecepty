import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, removeError } from "../redux/recipesSlice";
import { useHistory } from "react-router";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { theme } from "../GlobalStyles";

const FormSeg = () => {
  const [values, setValues] = useState({ val: [] });
  const [textAreaValues, setTextAreaValues] = useState({ tutorial: [] });
  const [singleValues, setSingleValues] = useState({
    values: {
      title: "",
      level: "",
      cookTime: "",
    },
  });
  let count = 1;
  const { error } = useSelector((state) => state.recipes);
  const { status } = useSelector((state) => state.recipes);
  const [uploadedFile, setUploadedFile] = useState();
  const [upload, setUpload] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const createInputs = () => {
    return values.val.map((el, i) => (
      <Item key={i}>
        <Input
          type="text"
          value={el || ""}
          onChange={handleChange.bind(i)}
          onKeyUp={(e) => handleKeyPress(e)}
        />

        <RemoveIcon
          onClick={removeClick.bind(i)}
          style={{
            color: "#fbb03b",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        />
      </Item>
    ));
  };

  function handleChange(event) {
    let vals = [...values.val];
    vals[this] = event.target.value;
    setValues({ val: vals });
  }
  function removeClick() {
    let vals = [...values.val];
    vals.splice(this, 1);
    setValues({ val: vals });
  }
  const addClick = () => {
    setValues({ val: [...values.val, ""] });
  };
  //TEXTAREA
  const createTextArea = () => {
    return textAreaValues.tutorial.map((el, i) => (
      <TextAreaBlock key={count}>
        <Count>{count++}</Count>
        <TextArea
          type="text"
          value={el || ""}
          placeholder={`Recipe Part ${count - 1}`}
          onChange={handleTextAreaChange.bind(i)}
        />
      </TextAreaBlock>
    ));
  };
  const addTextArea = () => {
    setTextAreaValues({ tutorial: [...textAreaValues.tutorial, ""] });
  };
  function handleTextAreaChange(e) {
    let vals = [...textAreaValues.tutorial];
    vals[this] = e.target.value;
    setTextAreaValues({ tutorial: vals });
  }
  const handleClick = () => {
    const clearIngrediences = values.val.filter((e) => e !== "");
    const clearTutorial = textAreaValues.tutorial.filter((e) => e !== "");
    const data = {
      ...singleValues.values,
      ingrediencies: clearIngrediences,
      tutorial: clearTutorial,
      desc: "desc",
      img: uploadedFile,
      name: user?.result?.name,
    };

    dispatch(addRecipe(data));
  };

  const handleSingleValues = (e) => {
    setSingleValues((prev) => ({
      values: { ...prev.values, [e.target.name]: e.target.value },
    }));
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      addClick();
    }
  };
  useEffect(() => {
    if (status === "success") {
      history.push("/");
    }
  }, [status, history]);
  useEffect(() => {
    return () => {
      dispatch(removeError());
    };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeError());
    }, 2000);
  }, [error, dispatch]);

  const handleUpload = (e) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, e.target.files[0].name);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    console.log(e.target.files[0].name);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUpload("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log("IMG", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedFile(downloadURL);
        });
      }
    );
  };
  if (!user?.result?.username) {
    return (
      <Container>
        <Login>
          <Text>
            <LinkWrap to="/login">
              <Text> Login&nbsp; </Text>
            </LinkWrap>
            to create recipes
          </Text>
        </Login>
      </Container>
    );
  }
  return (
    <Container>
      <Form>
        <Section>
          <Header>Recipe details</Header>
          <Inside>
            <Devide>
              <Input
                type="text"
                placeholder="Recipe Name"
                value={singleValues.values.title}
                name="title"
                onChange={handleSingleValues}
                required="required"
              />
              <Input
                placeholder="Prepare Time"
                value={singleValues.values.cookTime}
                onChange={handleSingleValues}
                name="cookTime"
              />
            </Devide>
            <Select
              onChange={handleSingleValues}
              value={singleValues.values.level}
              name="level"
            >
              <Option disabled hidden value="">
                Select Skill Level
              </Option>

              <Option value="Simple">Simple</Option>
              <Option value="Middle">Middle</Option>
              <Option value="Hard">Hard</Option>
            </Select>
            <Image>
              {uploadedFile ? (
                <Img src={uploadedFile} alt="uploadedFile" />
              ) : (
                ""
              )}
            </Image>
            <UploadLabel htmlFor="file">Upload Image</UploadLabel>
            <UploadInput
              type="file"
              onChange={(e) => handleUpload(e)}
              id="file"
              name="myfile"
            />
            <UploadText>{upload}</UploadText>
          </Inside>
        </Section>
        <Section>
          <Header>Ingrediencies</Header>
          <Inside>
            {createInputs()}
            <ControlPointIcon
              style={{
                color: "#fbb03b",
                cursor: "pointer",
                display: "block",
                width: "100%",
              }}
              onClick={addClick}
            />
          </Inside>
        </Section>
        <Section>
          <Header>How to prepare</Header>
          <Inside>
            {createTextArea()}
            <ControlPointIcon
              style={{
                color: "#fbb03b",
                cursor: "pointer",
                display: "block",
                width: "100%",
              }}
              onClick={addTextArea}
            />
          </Inside>
        </Section>
      </Form>
      <Button
        disabled={status === "loading"}
        onClick={handleClick}
        color="fbb03b"
      >
        Save Recipe
      </Button>
      {error ? <Error>{error} </Error> : ""}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Section = styled.div`
  z-index: 100;
`;
const Devide = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
const LinkWrap = styled(Link)`
  z-index: 100;
  display: inline-block;
`;
const Text = styled.div``;
const Login = styled.div`
  display: flex;
  width: 30%;
  height: 30vh;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${theme.color.white};
  margin-top: 5rem;
  z-index: 10;
  ${mobile({ width: "100%" })}

  &::before {
    content: "";
    background-image: url("https://gcc.bhs-tabletop.com/Playground/MAM/1%20-%20Produktbilder/Holz/image-thumb__14517__oneweb_playground_productDetailPreview/745980291000000_per.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    background-size: 80%;

    top: 70%;
    right: 0;
    bottom: 0%;
    left: 50%;
    opacity: 0.5;
    overflow: hidden;
    z-index: 1;
    ${mobile({ backgroundSize: "100%", top: "50%" })}
  }
`;
const UploadLabel = styled.label`
  display: flex;

  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  width: 100%;
  background-color: ${theme.color.orange};
  color: ${theme.color.white};
  cursor: pointer;
  margin: 10px 0px;
`;
const UploadInput = styled.input`
  display: block;
  padding: 20px;
  color: ${theme.color.white};
  background-color: ${theme.color.orange};
  border: none;
  margin: 5px;
  height: 20px;
  display: none;
  color: ${theme.color.white};
`;
export const Error = styled.div`
  position: fixed;
  bottom: 0;
  background-color: ${theme.color.red};
  padding: 10px;
  color: ${theme.color.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 20;
  margin-bottom: 10px;
`;
export const Select = styled.select`
  -webkit-appearance: none;
  background-color: ${theme.color.gray};
  border: none;
  margin: 5px;
  height: 40px;
  border-radius: none;
  width: 100%;
  font-size: 16px;
  color: gray;
  padding-left: 10px;
`;
export const Count = styled.div`
  top: -10px;
  left: -10px;
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
  z-index: 20;
`;
export const Option = styled.option`
  border-radius: none;
  border: none;
  color: black;
`;
export const Image = styled.div`
  width: 100%;
  margin: 0 auto;

  text-align: center;
`;
export const Img = styled.img`
  width: 100px;
`;
const Header = styled.h3`
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  font-weight: 100;
`;

const Form = styled.form`
  width: 80%;
`;
const UploadText = styled.p`
  font-weight: bold;
  color: green;
`;

export const Button = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.padding ? props.padding : "10px")};
  background-color: #${(props) => props.color};
  color: ${theme.color.white};
  margin: ${(props) => (props.margin ? props.margin : "20px 0px;")};
  cursor: pointer;
  transition: all 300ms ease-in-out;

  &:disabled {
    background-color: gray;
    cursor: wait;
  }
  &:hover {
    background-color: ${theme.color.red};
  }
`;

const TextArea = styled.textarea`
  border: none;
  background-color: ${theme.color.gray};
  width: 100%;
  height: 200px;
  margin: 10px;
  padding: 10px;
`;
const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Inside = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.white};
  padding: 20px;
`;
const TextAreaBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${theme.color.white};
  justify-content: center;
  align-items: center;
`;
export const Input = styled.input`
  flex: 1;

  background-color: ${theme.color.gray};
  border: none;
  margin: 5px;
  height: 20px;
  width: 100%;
  min-width: 40%;
`;
export default FormSeg;
