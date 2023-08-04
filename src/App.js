import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./components/ToDoList/ToDoList";
import ToDoAddForm from "./components/ToDoAddForm/ToDoAddForm";
import ToDoUpdateForm from "./components/ToDoUpdateForm/ToDoUpdateForm";
import { toDoListStorage } from "./util/localStorage";
function App() {
  const [toDoList, setToDoList] = useState(toDoListStorage.load());
  const [newTask, setNewTask] = useState(null);
  const [updateTask, setUpdateTask] = useState(null);
  const [filterByStatus, setFilterByStatus] = useState("all");
  // Add
  const onAddHandler = (e) => {
    e.preventDefault();
    if (newTask) {
      const newToDo = {
        id: uuidv4(),
        title: newTask,
        status: false,
      };
      const newTodoList = [...toDoListStorage.load(), newToDo];
      toDoListStorage.save(newTodoList)
      setToDoList(newTodoList);
      setNewTask("");
    } else {
      alert("Not Found Infor");
    }
  };

  //  Delete
  const onDeleteHandler = (id) => {
    const filterToDoTask = toDoList.filter((task) => task.id !== id);
    setToDoList(filterToDoTask);
  };

  // CheckBox
  const onCheckboxTaskHandler = (id) => {
    setToDoList(
      toDoList.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  // Change Task For Update
  const changeTaskHandler = (e) => {
    const updateInforTask = {
      id: updateTask.id,
      title: e.target.value,
      status: updateTask.status ? true : false,
    };
    setUpdateTask(updateInforTask);
  };

  // Update
  const onUpdateHandler = (e) => {
    e.preventDefault();
    const filterChangeTask = [...toDoList].filter(
      (task) => task.id !== updateTask.id
    );
    const updateTodo = [...filterChangeTask, updateTask];
    setToDoList(updateTodo);
    setUpdateTask("");
  };

  // Cancel Update
  const onCancelUpdateHandler = () => {
    setUpdateTask("");
  };

  // Clear All
  const clearAllTask = () => {
    toDoListStorage.removeAll();
    setToDoList([]);
    setFilterByStatus('all')
  };

  // Filter By Status
  const onFilterByStatus = (toDoStatus) => {
    let filteredToDo = [];
    switch (toDoStatus) {
      case 'all':
        filteredToDo = toDoListStorage.load();
        break;
      case 'active':
        filteredToDo = toDoListStorage.load().filter((todo) => todo === !todo.status)
        break;
      case 'completed':
        filteredToDo = toDoListStorage.load().filter((todo) => todo === todo.status)
        break;
      default:
        filteredToDo = toDoListStorage.load();
    }
    setToDoList(filteredToDo);
    setFilterByStatus(toDoStatus)
  };
  return (
    <div className="app">
      <div className="Logo">
        <h1>#Todo</h1>
      </div>
      <div className="filterByStatus">
        <p onClick={() => onFilterByStatus('all')}>All</p>
        <p onClick={() => onFilterByStatus('active')}>Active</p>
        <p onClick={() => onFilterByStatus('completed')}>Completed</p>
      </div>
      <div className="todoBox">
        {/* Form */}
        {updateTask && updateTask ? (
          <>
            <ToDoUpdateForm
              updateTask={updateTask}
              changeTaskHandler={changeTaskHandler}
              onUpdateHandler={onUpdateHandler}
              onCancelUpdateHandler={onCancelUpdateHandler}
            />
          </>
        ) : (
          <ToDoAddForm
            newTask={newTask}
            setNewTask={setNewTask}
            onAddHandler={onAddHandler}
          />
        )}

        <ToDoList
          toDoList={toDoList}
          onCheckboxTaskHandler={onCheckboxTaskHandler}
          onDeleteHandler={onDeleteHandler}
          setUpdateTask={setUpdateTask}
          clearAllTask={clearAllTask}
        />
        {toDoList && toDoList.length ? "" : "No task..."}
      </div>
    </div>
  );
}

export default App;
