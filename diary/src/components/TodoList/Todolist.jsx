import { useState } from "react";
import styled from 'styled-components'


const TodoContainer = styled.div`
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
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button type="submit">Add Todo</button>
      </form>

      {list.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {todo.id === editing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === editing ? (
              <button onClick={() => submitEdits(todo.id)}>
                <i className="fa fa-edit" style={{ color: "green" }}></i>
              </button>
            ) : (
              <button onClick={() => setEditing(todo.id)}>
                <i className="fa fa-edit"></i>
              </button>
            )}
            <button onClick={() => toggleComplete(todo.id)}>
              <i className="fa fa-check circle"></i>
            </button>

            <button onClick={() => deleteTask(todo.id)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todolist;
