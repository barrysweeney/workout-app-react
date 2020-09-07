import React, { Component } from "react";
import { FaPause, FaPlay } from 'react-icons/fa';
import styled from "styled-components";
import Button from "./Layout/Button";
import TimerDisplay from "./TimerDisplay";

const TimerWrapper = styled.div`
  grid-area: timer;
  display: grid;
  grid-template-columns: 1fr;
  background: linear-gradient(#064651, #09a0b9);
  grid-gap: 10px;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid cyan;
`;

const HIITController = styled.div`
display: grid;
`

const PlayController = styled.div`
display:grid;
grid-template-columns: 1fr 1fr;
`

export default class WorkoutTimer extends Component {
  state = {
    counter: 0,
    timeOn: "00:40",
    timeOff: "00:20",
    isOn: false,
    paused: true,
  };

  audio = new Audio("https://ia800201.us.archive.org/10/items/Sound_Effects/school%20bell.ogg")

  setTimeOn(e) {
    this.setState({
      timeOn: e.target.value,
      counter: 0,
      paused: true,
    })
  }

  setTimeOff(e) {
    this.setState({
      timeOff: e.target.value,
      counter: 0,
      paused: true,
    })
  }

  async startOffTimer() {
    if (this.state.paused) {
      this.audio.play();
      await this.setState({
        isOn: false,
        paused: false,
      })
      const initialTimeOff = this.state.timeOff;
      let mins = parseInt(this.state.timeOff.split(":")[0]);
      let seconds = parseInt(this.state.timeOff.split(":")[1]);
      while (seconds > 0) {
        if (this.state.paused) {
          break;
        }
        await this.wait(1000);
        seconds -= 1;
        let formattedMins = mins < 10 ? "0" + mins : mins;
        let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        this.setState({
          timeOff: formattedMins + ":" + formattedSeconds,
        })
        if (seconds === 0 && mins > 0) {
          mins -= 1;
          seconds = 60;
        }
      }
      if (!this.state.paused) {
        this.setState({
          timeOff: initialTimeOff,
          paused: true,
        })
        this.startOnTimer();
      }
    }
  }

  wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));


  async startOnTimer() {
    if (this.state.paused) {
      this.audio.play();
      await this.setState({
        isOn: true,
        paused: false,
      })
      const initialTimeOn = this.state.timeOn;
      let mins = parseInt(this.state.timeOn.split(":")[0]);
      let seconds = parseInt(this.state.timeOn.split(":")[1]);
      while (seconds > 0) {
        if (this.state.paused) {
          break;
        }
        await this.wait(1000);
        seconds -= 1;
        let formattedMins = mins < 10 ? "0" + mins : mins;
        let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        this.setState({
          timeOn: formattedMins + ":" + formattedSeconds,
        })
        if (seconds === 0 && mins > 0) {
          mins -= 1;
          seconds = 60;
        }
      }
      if (!this.state.paused) {
        this.setState({
          timeOn: initialTimeOn,
          counter: this.state.counter + 1,
          paused: true,
        })
        this.startOffTimer();
      }
    }
  }

  pauseTimer() {
    this.setState({
      paused: true,
    })
  }

  render() {
    return (
      <TimerWrapper>
        <HIITController>
          <label for="timeOn">Time On</label>
          <input type="time" name="timeOn" min="00:00" max="60:00" defaultValue="00:40" onChange={this.setTimeOn.bind(this)} />
          <label for="timeOff">Time Off</label>
          <input type="time" name="timeOff" min="00:00" max="60:00" defaultValue="00:20" onChange={this.setTimeOff.bind(this)} />
        </HIITController>
        <PlayController>
        <Button  clickHandler={this.startOnTimer.bind(this)}>Start <FaPlay/></Button>
        <Button clickHandler={this.pauseTimer.bind(this)} >Pause <FaPause/></Button>
        </PlayController>
        <TimerDisplay timeRemaining={this.state.isOn ? this.state.timeOn : this.state.timeOff} routine={this.props.routine} isOn={this.state.isOn} counter={this.state.counter} />
      </TimerWrapper>
    );
  }
}