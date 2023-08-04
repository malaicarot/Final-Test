import React from 'react'
import "./ToDoUpdateForm.css"
const ToDoUpdateForm = ({
    updateTask,
    changeTaskHandler,
    onUpdateHandler,
    onCancelUpdateHandler
}) => {
  return (
    <div className='updateForm'>
        {/* Update Form */}
        <form className='update'>
            <input
            value={updateTask && updateTask.title}
            onChange={(e) => changeTaskHandler(e)}
            
            />
            <button onClick={onUpdateHandler}>Update</button>
        </form>
        <button className='cancelBtn' onClick={onCancelUpdateHandler}>Cancel</button>
    </div>

  )
}

export default ToDoUpdateForm