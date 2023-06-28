import { useState } from "react";
import Task from "./Task";

const Todolist = () => {
  const [newTask, setNewTask] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (event) => setNewTask(event.target.value);

  const addTask = () => {
    const task = {
      id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setList([...list, task]);
  };

  const completeTask = (id) => {
    setList(list.map((task) => {
      if (task.id === id) {
        return {...task, completed: !task.completed }
      } return task;
    }))
  }

  const deletetask = (id) => {
    setList(list.filter((task) => task.id !== id));
  }

  return (
    <div>
      <input onChange={handleChange} type="text" required />
      <button onClick={addTask}>add</button>

      <div>
        <h1>tasks:</h1>

        {list.map((task) => {
          return <Task 

          taskName={task.taskName} 
          id={task.id} 
          key={task.id}
          deletetask={deletetask}
          completed={task.completed}
          completeTask={completeTask}          
          
          />
        })}
      </div>
    </div>
  );
};

export default Todolist;
