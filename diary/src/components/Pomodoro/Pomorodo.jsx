import { useState, useEffect } from "react";
import Titles from "../../styles/reusableh1";
import styled from "styled-components";
import Inputs from "../../styles/reusableInput";

const PomodoroContainer = styled.div`
  background-color: #fffafb;
  padding: 1rem;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  font-family: "Jua", sans-serif;
  border-radius: 1.25rem;
`;

const TimerContainer = styled.div`
  width: 22.75rem;
  height: auto;
  border-radius: 1.25rem;
  border: 2px solid #ff7fa6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 0;
`;

const DivCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const Timer = styled.p`
  font-size: 4rem;
`;

const TimerButtons = styled.button`
  color: #7f3e52;
  border: none;
  box-shadow: 0px 4px 8px 0px rgba(255, 172, 197, 0.5);
  padding: 8px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin: 0 0.6rem;
  background-color: #fff5f6;
  font-family: "Jua", sans-serif;
`;

const Pomodoro = () => {
  const [selectTime, setSelectTime] = useState(25 * 60);
  const [Running, setRunning] = useState(false);
  const [Break, setBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (Running) {
      interval = setInterval(() => {
        setSelectTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (selectTime === 0) {
      setRunning(false);
      setBreak((prevBreak) => !prevBreak);
      setSelectTime(Break ? 25 * 60 : selectTime);
    }

    return () => clearInterval(interval);
  }, [Running, selectTime, Break]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleReset = () => {
    setRunning(false);
    setBreak(false);
    setSelectTime(25 * 60);
  };

  const handleTimeChange = (event) => {
    const timeInMinutes = parseInt(event.target.value, 10);
    const timeInSeconds = Math.max(25, Math.min(timeInMinutes * 60, 60 * 60));
    setSelectTime(timeInSeconds);
  };

  const handleShortBreak = () => {
    setRunning(false);
    setBreak(true);
    setSelectTime(5 * 60);
  };

  const handleLongBreak = () => {
    setRunning(false);
    setBreak(true);
    setSelectTime(10 * 60);
  };

  return (
    <PomodoroContainer>
      <Titles>Focus Time</Titles>

      <TimerContainer>
        <Inputs
          placeholder="Timer"
          type="number"
          min="25"
          max="60"
          step="5"
          value={!Running ? selectTime / 60 : ""}
          onChange={handleTimeChange}
        />
        <DivCenter>
          <TimerButtons onClick={handleShortBreak}>Short Break</TimerButtons>
          <TimerButtons onClick={handleLongBreak}>Long Break</TimerButtons>
        </DivCenter>

        <Timer>{formatTime(selectTime)}</Timer>

        <div>
          <TimerButtons onClick={() => setRunning(true)}>Start</TimerButtons>
          <TimerButtons onClick={handleReset}>Reset</TimerButtons>
        </div>
      </TimerContainer>
    </PomodoroContainer>
  );
};

export default Pomodoro;
