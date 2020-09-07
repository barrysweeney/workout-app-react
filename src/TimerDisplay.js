import React from 'react'
import styled from 'styled-components';

const DisplayContainer = styled.div`
display: grid;
margin: 0 auto;
grid-gap: 10px;
`

const TimeContainer = styled.div`
font-size: 40px;
`

const ExerciseContainer = styled.div`
font-size: 25px;
`

export default function TimerDisplay({timeRemaining, routine, counter, isOn}) {
    return (
        <DisplayContainer>
            <TimeContainer>
            {timeRemaining}
            </TimeContainer>
            
            {/* production: */}
            <ExerciseContainer>
            {isOn ? routine[counter] : null} 
            </ExerciseContainer>
           

            {/* development: */}
            {/* <ExerciseContainer>
            {isOn ? "Pushups" : "Rest"}
            </ExerciseContainer> */}
        </DisplayContainer>
    )
}