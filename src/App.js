import React, { Component } from "react";
import { Container } from "./Layout/Container";
import { WorkoutHeader } from "./Layout/WorkoutHeader";
import WorkoutFilter from "./WorkoutFilter";
import WorkoutRoutine from "./WorkoutRoutine";

class App extends Component {
  state = {
    routine: [],
    target: [],
    limit: 10,
  };

  componentDidMount() {
    this.getRandomWorkout();
  }

  async getRandomWorkout() {
    const response = await fetch(
      `http://localhost:8080/workout?type=${this.state.target.join(
        ","
      )}&limit=${this.state.limit}`
    );
    const data = await response.json();
    this.setState({
      routine: data.exercises,
    });
  }

  changeTarget(e) {
    const inputElements = [...e.currentTarget.childNodes].filter(
      (n) => n instanceof HTMLInputElement && n.checked
    );
    const target = [];
    inputElements.forEach((input) => target.push(input.name));
    this.setState({
      target: target,
    });
  }

  changeLimit(e) {
    this.setState({
      limit: e.target.value,
    });
  }

  render() {
    return (
      <Container>
        <WorkoutHeader>
          <h1>Random Workout Generator</h1>
        </WorkoutHeader>
        <WorkoutFilter
          changeTarget={this.changeTarget.bind(this)}
          changeLimit={this.changeLimit.bind(this)}
          getRandomWorkout={this.getRandomWorkout.bind(this)}
        />
        <WorkoutRoutine routine={this.state.routine} />
      </Container>
    );
  }
}

export default App;
