import { useState } from "react";
import styled from "styled-components";
import Complete from "../../assets/IconComplete.svg";
import Trash from "../../assets/IconTrash.svg";
import Edit from "../../assets/IconEdit.svg";
import Calendar from "../../assets/IconCalendar.svg";
import Add from "../../assets/IconAdd.svg";

const TodoListContainer = styled.div`
  background-color: #fffafb;
  padding: 1rem;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  font-family: "Jua", sans-serif;
  border-radius: 1.25rem;
`;

const TodoContainer = styled.div`
  width: 22.75rem;
  height: auto;
  border-radius: 1.25rem;
  border: 2px solid #ff7fa6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 22.75rem;
  height: 4rem;
`;

const TaskGap = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const TaskContainer = styled.div`
  width: 21.75rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 8px 0px rgba(255, 172, 197, 0.5);
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const DailyTitle = styled.h1`
  font-size: 1.5rem;
  text-transform: uppercase;
  padding: 1rem 0;
  font-family: Jua;
  letter-spacing: 0.2rem;
  color: #7f3e52;
`;

const TaskButtons = styled.button`
  background-color: #fffafb;
  border: none;
  width: 36px;
  height: 36px;
`;

const EditButton = styled.button`
  background-color: #fffafb;
  border: none;
  width: 10px;
  height: 11px;
`;

const TaskName = styled.div`
  width: 11rem;
  color: #7f3e52;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

const TaskDate = styled.div`
  width: 11rem;
`;

const EditingInput = styled.input`
  border-color: hsla(342, 100%, 75%, 0.2);
  height: 0.7rem;
`;

const Icon = styled.i`
  color: #ff7fa6;
`;

const TaskInput = styled.input`
  background-color: #fff5f6;
  border-radius: 0.75rem;
  border: none;
  padding: 0.75rem;
  width: 16rem;
  font-family: Jua, sans-serif;
  text-transform: uppercase;
`;

const AddButton = styled.button`
  background: none;
  border: none;
`;

const ImgAddButton = styled.img`
  width: 44px;
  height: 44px;
  margin-top: .35rem;
`;

const Todolist = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (task.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: task,
        completed: false,
      };
      setList([...list].concat(newTodo));
      setTask("");
    }
  }

  function deleteTask(id) {
    let updatedTasks = [...list].filter((todo) => todo.id !== id);
    setList(updatedTasks);
  }

  function toggleComplete(id) {
    let updatedTasks = [...list].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setList(updatedTasks);
  }

  function submitEdits(id) {
    const updatedTasks = [...list].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setList(updatedTasks);
    setEditing(null);
  }

  return (
    <TodoListContainer>
      <DailyTitle>Daily • Plan</DailyTitle>

      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <TaskInput
            type="text"
            placeholder='Add new task'
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <AddButton type="submit">
            <ImgAddButton src={Add} alt="Add task" />
          </AddButton>
        </Form>
      </FormContainer>

      <TodoContainer>
        • • •
        {list.map((todo) => (
          <TaskContainer key={todo.id} style={{ opacity: todo.completed ? "30%" : "100%" }}>
            <TaskGap>
              <Center>
                {todo.id === editing ? (
                  <EditButton onClick={() => submitEdits(todo.id)}>
                    <Icon className="fa fa-check"></Icon>
                  </EditButton>
                ) : (
                  <EditButton onClick={() => setEditing(todo.id)}>
                    <img src={Edit} alt="Edit" />
                  </EditButton>
                )}

                <Center>
                  {todo.id === editing ? (
                    <EditingInput
                      type="text"
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  ) : (
                    <TaskName>{todo.text}</TaskName>
                  )}
                </Center>
              </Center>

              <Center>
                <EditButton>
                  <img src={Calendar} alt="Icon of a Calendar" />
                </EditButton>
                <TaskDate>data</TaskDate>
              </Center>
            </TaskGap>

            <Center>
              <TaskButtons onClick={() => toggleComplete(todo.id)}>
                <img src={Complete} alt="Toggle Complete" />
              </TaskButtons>

              <TaskButtons onClick={() => deleteTask(todo.id)}>
                <img src={Trash} alt="Delete Task" />
              </TaskButtons>
            </Center>
          </TaskContainer>
        ))}
      </TodoContainer>
    </TodoListContainer>
  );
};

export default Todolist;
