import React from "react";

const ItemList = ({ displayTasks, setEditingTask, handleDelete, setTitle }) => {
  return displayTasks.map((task) => (
    <li key={task.id}>
      {task.num}:{task.title}
      <>
        <button
          onClick={() => {
            setEditingTask(task);
            setTitle(task.title);
          }}
        >
          Edit
        </button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </>
    </li>
  ));
};

export default ItemList;
