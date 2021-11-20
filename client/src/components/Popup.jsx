import React from "react";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { theme } from "../GlobalStyles";
const Popup = () => {
  const [display, setDisplay] = useState(true);
  const handleClick = () => {
    setDisplay(false);
  };
  return (
    <>
      {display && (
        <Container>
          <Text>Click on Elements to Edit</Text>
          <Text>You can delete only your recipes && edit its title</Text>
          <Cancel>
            <CancelIcon onClick={handleClick} />
          </Cancel>
        </Container>
      )}
    </>
  );
};
export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 5px;
  left: 5px;
  flex-wrap: wrap;
  background-color: ${theme.color.red};
  padding: 20px;
  border-radius: 50%;
  color: white;
  width: 80px;
  height: 80px;
  text-align: center;
  z-index: 10;
`;
const Cancel = styled.div`
  position: absolute;
  top: 0;
  cursor: pointer;
`;
const Text = styled.p`
  font-size: 10px;
`;
export default Popup;
