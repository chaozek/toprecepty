import { css } from "styled-components";
export const desktop = (props) => {
  return css`
    @media only screen and (max-width: 1100px) {
      ${props}
    } ;
  `;
};
export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 750px) {
      ${props}
    } ;
  `;
};
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 550px) {
      ${props}
    } ;
  `;
};
