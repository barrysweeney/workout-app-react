import React from "react";

export default function WorkoutLimit({ changeLimit }) {
  return (
    <div>
      <label htmlFor="limit">Max No. Random Exercises</label>
      <input
        type="number"
        name="limit"
        min="1"
        defaultValue="10"
        max="20"
        onChange={changeLimit}
      />
    </div>
  );
}
