import React from "react";
import "./ToDoAddForm.css"
const ToDoAddForm = ({ newTask, setNewTask, onAddHandler }) => {
  return (
    <>
      {/* Add Form */}
      <form className="inputForm">
        <input placeholder="New Task" value={newTask} onChange={(e) => setNewTask(e.target.value) }/>
        <button onClick={onAddHandler}>Add</button>
      </form>
    </>
  );
};

export default ToDoAddForm;
