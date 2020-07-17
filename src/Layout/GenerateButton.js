import styled from "styled-components";
import React from "react";

const GenerateButtonWrapper = styled.button`
  margin: 10px 0;
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

export default function GenerateButton({ getRandomWorkout }) {
  return (
    <GenerateButtonWrapper onClick={getRandomWorkout}>
      Generate Workout
    </GenerateButtonWrapper>
  );
}
