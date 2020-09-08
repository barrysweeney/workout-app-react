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
    restBetweenRounds: "01:00",
    rounds: 3,
    isOn: false,
    paused: true,
    currentRound: 1,
    complete: false,
    resting: false,
  };

  shortBell = new Audio("https://ia800201.us.archive.org/10/items/Sound_Effects/school%20bell.ogg");
  longBell = new Audio("https://ia800201.us.archive.org/10/items/Sound_Effects/schoolbell%20long.ogg");

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

  setRounds(e) {
    this.setState({
      rounds: e.target.value,
      counter: 0,
      paused: true,
    })
  }

  setRestBetweenRounds(e) {
    this.setState({
      restBetweenRounds: e.target.value,
      counter: 0,
      paused: true,
    })
  }

  async startRestBetweenRoundTimer() {
    if (this.state.paused) {
      this.shortBell.play();
      await this.setState({
        isOn: false,
        resting: true,
        paused: false,
      })
      const initialRestTime = this.state.restBetweenRounds;
      let mins = parseInt(this.state.restBetweenRounds.split(":")[0]);
      let seconds = parseInt(this.state.restBetweenRounds.split(":")[1]);
      while (seconds > 0) {
        if (this.state.paused) {
          break;
        }
        await this.wait(1000);
        seconds -= 1;
        let formattedMins = mins < 10 ? "0" + mins : mins;
        let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        this.setState({
          restBetweenRounds: formattedMins + ":" + formattedSeconds,
        })
        if (seconds === 0 && mins > 0) {
          mins -= 1;
          seconds = 60;
        }
      }
      if (!this.state.paused) {
        this.setState({
          restBetweenRounds: initialRestTime,
          paused: true,
        })
        this.startOnTimer();
      }
    }
  }

  async startOffTimer() {
    if (this.state.paused) {
      this.shortBell.play();
      await this.setState({
        isOn: false,
        paused: false,
        resting: false,
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
    if (this.props.routine.length > 0) {
      if (this.state.currentRound > this.state.rounds) {
        this.setState({
          complete: true,
          currentRound: 1,
          resting: false,
        })
        this.longBell.play();
      } else {
        if (this.state.paused) {
          this.shortBell.play();
          await this.setState({
            isOn: true,
            paused: false,
            complete: false,
            resting: false,
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
            if (this.state.counter + 1 === this.props.routine.length) {
              this.setState({
                timeOn: initialTimeOn,
                counter: 0,
                paused: true,
                currentRound: this.state.currentRound + 1,
              })
              this.startRestBetweenRoundTimer();
            } else {
              this.setState({
                timeOn: initialTimeOn,
                counter: this.state.counter + 1,
                paused: true,
                resting: false,
              })
              this.startOffTimer();
            }

          }
        }
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
          <label for="rounds">Rounds</label>
          <input
            type="number"
            name="rounds"
            min="1"
            defaultValue="3"
            max="100"
            onChange={this.setRounds.bind(this)}
            style={{ width: `130px` }}
          />
          <label for="roundRest">Rest Between Rounds</label>
          <input
            type="time"
            min="00:00" max="60:00" defaultValue="01:00"
            name="roundRest"
            onChange={this.setRestBetweenRounds.bind(this)}
          />
        </HIITController>
        <PlayController>
          <Button clickHandler={this.startOnTimer.bind(this)}>Start <FaPlay /></Button>
          <Button clickHandler={this.pauseTimer.bind(this)} >Pause <FaPause /></Button>
        </PlayController>
        {this.state.complete ? <div>Workout complete</div> :
          <TimerDisplay timeRemaining={this.state.resting ? this.state.restBetweenRounds : this.state.isOn ? this.state.timeOn : this.state.timeOff} routine={this.props.routine} isOn={this.state.isOn} counter={this.state.counter} round={this.state.currentRound} />
        }
      </TimerWrapper>
    );
  }
}