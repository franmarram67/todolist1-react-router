import type { Route } from "./+types/_index";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "TodoList1" },
    { name: "description", content: "Welcome to TodoList1!" },
  ];
}

let nextId = 0;

interface Task {
  id: number,
  name: string,
  completed: boolean
}

export default function Home() {
  const [taskName, setTaskName] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  function addTask() {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        name: taskName,
        completed: false
      }
    ]);
    setTaskName("");
  }

  function removeTask(taskId: number) {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  function completeTask(taskId: number) {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: true
        }
      }
      return task;
    }));
  }

  function incompleteTask(taskId: number) {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: false
        }
      }
      return task;
    }));
  }

  const addTaskKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (taskName && taskName.length !== 0 && event.key === 'Enter') {
      setButtonPressed(true);
    }
  }

  const addTaskKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (taskName && taskName.length !== 0 && event.key === 'Enter') {
      setButtonPressed(false);
      addTask();
    }
  }

  let addTaskButton;
  if (!taskName || taskName.length === 0) {
    addTaskButton = <button className="border border-gray-400 rounded-sm bg-gray-400 px-4 py-2 hover:cursor-not-allowed " type="button">Add task</button>
  } else {
    let buttonClassBase = "border rounded-sm px-4 py-2 ";
    let buttonColor = buttonPressed ? "border-red-600 bg-red-600" : "border-red-400 bg-red-400 hover:cursor-pointer hover:bg-red-500 hover:border-red-500 active:border-red-600 active:bg-red-600";
    let buttonClass = buttonClassBase + buttonColor;
    addTaskButton = <button
      onClick={addTask}
      className={buttonClass}
      type="button"
    >Add task</button>
  }

  return <div className="px-8 py-4">
    <h1 className="font-bold text-2xl mb-4">TodoList1</h1>
    <main>
      <div className="mb-4">
        <input
          className="border border-zinc-900 rounded-sm px-4 py-2 mr-4 focus:outline-solid focus:outline-1"
          type="text"
          onKeyDown={addTaskKeyDown}
          onKeyUp={addTaskKeyUp}
          placeholder="Task name..."
          onChange={e => setTaskName(e.target.value)}
          value={taskName}
        />
        {addTaskButton}
      </div>
      <div>
        {tasks.map(task => {
          let taskButtons;
          let taskTextClass;
          if (!task.completed) {
            taskButtons = <>
              <button
                className="border rounded-sm px-4 py-2 border-red-400 bg-red-400 hover:cursor-pointer hover:bg-red-500 hover:border-red-500 active:border-red-600 active:bg-red-600 mr-2"
                type="button"
                onClick={() => removeTask(task.id)}
              >
                Remove
              </button>
              <button
                className="border rounded-sm px-4 py-2 border-green-400 bg-green-400 hover:cursor-pointer hover:bg-green-500 hover:border-green-500 active:border-green-600 active:bg-green-600"
                type="button"
                onClick={() => completeTask(task.id)}
              >
                Complete
              </button>
            </>;
            taskTextClass = "mr-3";
          } else {
            taskButtons = <>
              <button
                className="border rounded-sm px-4 py-2 border-red-400 bg-red-400 hover:cursor-pointer hover:bg-red-500 hover:border-red-500 active:border-red-600 active:bg-red-600 mr-2"
                type="button"
                onClick={() => removeTask(task.id)}
              >
                Remove
              </button>
              <button
                className="border rounded-sm px-4 py-2 border-amber-400 bg-amber-400 hover:cursor-pointer hover:bg-amber-500 hover:border-amber-500 active:border-amber-600 active:bg-amber-600"
                type="button"
                onClick={() => incompleteTask(task.id)}
              >
                Incomplete
              </button>
            </>;
            taskTextClass = "mr-3 line-through";
          }
          return <div key={task.id} className="flex flex-row justify-start items-center mb-2">
            <div className="bg-red-500 rounded-3xl w-3 h-3 mr-3"></div>
            <p className={taskTextClass}>{task.name}</p>
            {taskButtons}
          </div>
        })}
      </div>
    </main>
  </div>;
}
