import { createGlobalStyle } from "styled-components";
export const theme = {
  color: {
    gray: "#f6f6f6",
    orange: "#fbb03b",
    red: "#ed1c24",
    darkGray: "#f7e6e5",
    white: "white",
  },
};

export const GlobalStyles = createGlobalStyle`
input {
  all: unset;
}
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    font-family: 'Rubik', sans-serif;
    background-color: ${theme.color.gray};
;
html{
  background-color: ${theme.color.gray};

}
  }
a{
  text-decoration: none !important;

}
  ul{
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: black;

  }


input:focus,textarea:focus {
    outline : none ;
}
input::-ms-clear {
    display : none ;
}
textarea {
    resize: none ;
    font-size:16px;
}

button{
  -webkit-appearance: none;
-moz-appearance: none;
appearance: none;
}
input{
  font-size: 16px;
  padding: 10px;
}
input[type="date"]::-webkit-datetime-edit-text,
input[type="date"]::-webkit-datetime-edit-month-field,
input[type="date"]::-webkit-datetime-edit-day-field,
input[type="date"]::-webkit-datetime-edit-year-field {
  color: ${theme.color.gray};
}
input[type="date"].date-input--has-value::-webkit-datetime-edit-text,
input[type="date"].date-input--has-value::-webkit-datetime-edit-month-field,
input[type="date"].date-input--has-value::-webkit-datetime-edit-day-field,
input[type="date"].date-input--has-value::-webkit-datetime-edit-year-field {
}
input[type=checkbox] {
  -webkit-appearance: none;
  -moz-appearance:    none;
  appearance:         none;
}

input[type="radio"]{
    -webkit-appearance: radio !important;
    padding: 0
}

::placeholder,
  ::-webkit-input-placeholder {

  }
  :-ms-input-placeholder {

  }
label{
  display: block;
  font-size: 14px;
  padding: 1rem 0rem 0rem 0rem;

}

`;
