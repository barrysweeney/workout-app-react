import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import WorkoutTarget from "./WorkoutTarget";
import WorkoutLimit from "./WorkoutLimit";

class App extends Component {
  state = {
    routine: [],
    target: [],
    limit: 10,
  };

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
        <header>
          <h1>Random Workout Generator</h1>
        </header>
        <span role="img" aria-label="flexed bicep">
          💪
        </span>
        <button onClick={this.getRandomWorkout.bind(this)}>
          Generate Workout
        </button>
        <WorkoutTarget changeTarget={this.changeTarget.bind(this)} />
        <WorkoutLimit changeLimit={this.changeLimit.bind(this)} />
        <div>
          {this.state.routine.map((exercise) => (
            <div>{exercise}</div>
          ))}
        </div>
      </Container>
    );
  }
}

export default App;
