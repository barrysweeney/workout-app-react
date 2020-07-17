import React from "react";
import styled from "styled-components";

const HeadingWrapper = styled.header`
  grid-area: header;
`;

export default function WorkoutHeader() {
  return (
    <HeadingWrapper>
      <h1>Random Workout Generator</h1>
    </HeadingWrapper>
  );
}
