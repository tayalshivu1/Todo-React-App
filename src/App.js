import "./styles.css";
import { useState } from "react";

//Component to display single task
function TaskComponent({ task, taskList, setTaskList }) {
  function deleteTask(id) {
    setTaskList(taskList.filter((task) => task.id !== id));
  }

  function editTask(id) {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, editing: true } : task
      )
    );
  }
  return (
    <div className="task-list">
      <button onClick={() => editTask(task.id)}>edit</button>
      {task.editing ? (
        <EditTaskComponent
          taskObject={task}
          taskList={taskList}
          setTaskList={setTaskList}
        />
      ) : (
        <li key={task.id}>{task.name}</li>
      )}
      <button onClick={() => deleteTask(task.id)}>delete</button>
    </div>
  );
}

//Component to display edit task UI
function EditTaskComponent({ taskObject, taskList, setTaskList }) {
  const [task, setTask] = useState(taskObject.name);
  return (
    <div class="edit-container">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        className="tick-button"
        type="button"
        value="✓"
        onClick={() =>
          setTaskList(
            taskList.map((t) =>
              t.id === taskObject.id ? { ...t, name: task, editing: false } : t
            )
          )
        }
      />
    </div>
  );
}

export default function App() {
  const [taskId, setTaskId] = useState(2);
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([
    { id: 0, name: "first task", editing: false },
    { id: 1, name: "second task", editing: false }
  ]);

  function addTask() {
    setTaskId(taskId + 1);
    setTaskList([...taskList, { id: taskId, name: task, editing: false }]);
  }

  return (
    <div className="App">
      <h1>Todos Track</h1>
      <div className="task-container">
        <label>Enter Task</label>
        <input type="text" onChange={(e) => setTask(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {taskList.map((task) => (
          <div className="tasks-list">
            <TaskComponent
              task={task}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
