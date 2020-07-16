import React from "react";
import WorkoutTarget from "./WorkoutTarget";
import WorkoutLimit from "./WorkoutLimit";
import GenerateButton from "./Layout/GenerateButton";
import styled from "styled-components";

const FilterWrapper = styled.div`
  grid-area: filter;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(#064651, #09a0b9);
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid cyan;
  @media only screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

export default function WorkoutFilter({
  changeLimit,
  changeTarget,
  getRandomWorkout,
}) {
  return (
    <FilterWrapper>
      <WorkoutTarget changeTarget={changeTarget} />
      <div>
        <WorkoutLimit changeLimit={changeLimit} />
        <GenerateButton getRandomWorkout={getRandomWorkout} />
      </div>
    </FilterWrapper>
  );
}
