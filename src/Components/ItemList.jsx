import React from "react";

const ItemList = ({ tasks }) => {
  return tasks.map((task) => <li key={task.id}>{task.title}</li>);
};

export default ItemList;
