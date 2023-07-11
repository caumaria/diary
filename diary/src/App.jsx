import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Pomodoro from "./components/Pomodoro/Pomorodo";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Todolist from './components/TodoList/Todolist'

const Container = styled.div`
  width: 100%;
  padding-top: 6rem;
`;

const MainPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Container>
      <Navbar />
      <MainPage>
        <Routes>
          <Route path="/" element={<Todolist />} />
          <Route path="/timer" element={<Pomodoro />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainPage>
    </Container>
  );
}

export default App;
