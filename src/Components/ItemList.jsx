import React from "react";

const ItemList = ({ displayTasks, setEditingTask, handleDelete }) => {
  return displayTasks.map((task) => (
    <li key={task.id}>
      {task.id}:{task.title}
      <>
        <button onClick={() => setEditingTask(task)}>Edit</button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </>
    </li>
  ));
};

export default ItemList;
