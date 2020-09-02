import React from "react";
import styled from "styled-components";

const CheckboxForm = styled.form`
  display: grid;
  grid-template-columns: 200px 100px;
`;

export default function WorkoutTarget({ changeTarget }) {
  return (
    <div>
      <h2>Workout Targets</h2>
      <CheckboxForm onChange={changeTarget}>
        <label htmlFor="legs">Legs</label>
        <input type="checkbox" name="legs" defaultChecked />
        <label htmlFor="back">Back</label>
        <input type="checkbox" name="back" defaultChecked />
        <label htmlFor="abdominal">Abs</label>
        <input type="checkbox" name="abdominal" defaultChecked />
        <label htmlFor="arms">Arms</label>
        <input type="checkbox" name="arms" defaultChecked />
        <label htmlFor="chest">Chest</label>
        <input type="checkbox" name="chest" defaultChecked />
        <label htmlFor="bjj">BJJ Solo Drills</label>
        <input type="checkbox" name="bjj" defaultChecked />
      </CheckboxForm>
    </div>
  );
}
