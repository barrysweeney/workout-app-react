import styled from "styled-components";
// screens larger than 580px have a 2 column CSS Grid layout
// below this the app switches to a single column stacked layout
export const Container = styled.div`
  width: 80vw;
  margin: 20px auto;
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "header header"
    "filter routine";
  @media only screen and (max-width: 580px) {
    grid-template-areas:
      "header"
      "filter"
      "routine";
  }
`;
