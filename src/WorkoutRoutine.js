import React from "react";
import styled from "styled-components";

const RoutineWrapper = styled.div`
  grid-area: routine;
  background: linear-gradient(#064651, #09a0b9);
  color: white;
  font-weight: bold;
  padding: 10px;
  border: 1px solid cyan;
  border-radius: 5px;
`;

export default function WorkoutRoutine({ routine }) {
  return (
    <RoutineWrapper>
      {routine.length === 0 ? (
        <span>No exercises match your search criteria</span>
      ) : (
        <div>
          <h2>Your Routine</h2>
          {routine.map((exercise, i) => (
            <div key={i}>{exercise}</div>
          ))}
        </div>
      )}
    </RoutineWrapper>
  );
}
