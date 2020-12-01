import React, { Component } from "react";
import { Container } from "./Layout/Container";
import WorkoutHeader from "./Layout/WorkoutHeader";
import WorkoutFilter from "./WorkoutFilter";
import WorkoutRoutine from "./WorkoutRoutine";

class App extends Component {
  state = {
    routine: [],
    target: [],
    limit: 10,
  };

  // display a routine of 10 random exercises on page load
  componentDidMount() {
    this.getRandomWorkout();
  }

  // GET request for workout based on filters stored in state
  // response routine is then stored in state
  async getRandomWorkout() {
    const response = await fetch(
      `https://fast-eyrie-14303.herokuapp.com/workout?type=${this.state.target.join(
        ","
      )}&limit=${this.state.limit}`
    );
    const data = await response.json();
    this.setState({
      routine: data.exercises,
    });
  }

  // specifies the target muscle groups
  // pushes the muscle groups of checked input boxes to state
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

  // stores the max number of exercises to return in to state
  changeLimit(e) {
    this.setState({
      limit: e.target.value,
    });
  }

  render() {
    return (
      <Container>
        <WorkoutHeader />
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
