import { useState, useEffect } from "react";
import Button from "../../styles/reusableButton";
import styled from "styled-components";

const DivCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PomodoroInput = styled.input`
  font-size: 1.2rem;
  width: 84px;
  margin: 0 0.6rem;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: rgba(34, 122, 195, 0.8113620448179272) 27%;
`;

const Timer = styled.p`
    font-size: 4rem;
`;

const Pomodoro1 = () => {
  const [selectTime, setSelectTime] = useState(25 * 60); // Selected time in seconds
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
    <div>
      <h1>Focus Time</h1>

      <DivCenter>
        <PomodoroInput
          placeholder="Timer"
          type="number"
          min="25"
          max="60"
          step="5"
          value={!Running ? selectTime / 60 : ""}
          onChange={handleTimeChange}
        />
        <Button onClick={handleShortBreak}>Short Break</Button>
        <Button onClick={handleLongBreak}>Long Break</Button>
      </DivCenter>

      <Timer>{formatTime(selectTime)}</Timer>

      <div>
        <Button onClick={() => setRunning(true)}>Start</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
};

export default Pomodoro1;
