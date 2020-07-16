import React from "react";

export default function WorkoutLimit({ changeLimit }) {
  return (
    <div>
      <h2>Maximum Exercises</h2>
      <input
        type="number"
        name="limit"
        min="1"
        defaultValue="10"
        max="20"
        onChange={changeLimit}
        style={{ width: `130px` }}
      />
    </div>
  );
}
