import React from "react";

export default function WorkoutTarget({ changeTarget }) {
  return (
    <div>
      <h2>Workout Targets</h2>
      <form action="" onChange={changeTarget}>
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
      </form>
    </div>
  );
}
