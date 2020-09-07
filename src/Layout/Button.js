import styled from "styled-components";
import React from "react";

const ButtonWrapper = styled.button`
  padding: 10px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  background: black;
  border: 1px solid white;
  :hover {
    background: white;
    color: black;
    border: 1px solid black;
  }
`;

export default function Button ({children, clickHandler}){
  return (
    <ButtonWrapper onClick={clickHandler}>
      {children}
    </ButtonWrapper>
  );
}
