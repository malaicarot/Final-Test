import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquare,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "./ToDoList.css";
const ToDoList = ({
  toDoList,
  onCheckboxTaskHandler,
  onDeleteHandler,
  setUpdateTask,
  clearAllTask,
}) => {
  return (
    <div className="taskToDo">
      {/* Display Todo */}
      {toDoList &&
        toDoList.map((task) => {
          return (
            <React.Fragment>
              <div className="todoItem">
                <ul className={task.status ? "done" : ""}>
                  <li className="taskTitle">
                    <p>{task.title}</p>
                    <span onClick={() => onCheckboxTaskHandler(task.id)}>
                      <FontAwesomeIcon
                        icon={task.status === false ? faSquare : faSquareCheck}
                      />
                    </span>
                    <span onClick={() => onDeleteHandler(task.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span
                      onClick={() =>
                        setUpdateTask({
                          id: task.id,
                          title: task.title,
                          status: task.status ? true : false,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          );
        })}
      {toDoList.length >= 3 ? (
        <div className="clearAll">
          <button className="clearAllBtn" onClick={clearAllTask}>
            Clear All
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ToDoList;
