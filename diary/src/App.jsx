import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Todolist from "./components/TodoList/Todolist";
import Pomodoro from "./components/Pomodoro/Pomorodo";
import styled from 'styled-components'
import Navbar from "./components/Navbar/Navbar";

const Container = styled.div`
  width: 100vw;
`;

function App() {
  return (
    <Container>
      <Navbar
       />
      <Routes>
        <Route path="/" element={<Todolist />} />
        <Route path="/timer" element={<Pomodoro />} />
        <Route path="*" element={<Navigate to="/" />} />
        hi
      </Routes>
    </Container>
  );
}

export default App;
