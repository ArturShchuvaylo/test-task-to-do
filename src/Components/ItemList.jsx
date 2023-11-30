import React from "react";

const ItemList = ({ displayTasks, setEditingTask, handleDelete, setTitle }) => {
  return displayTasks.map((task) => (
    <li className="task-item " key={task.id}>
      {task.num}:{task.title}
      <div>
        <button
          onClick={() => {
            setEditingTask(task);
            setTitle(task.title);
          }}
        >
          Edit
        </button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </div>
    </li>
  ));
};

export default ItemList;
