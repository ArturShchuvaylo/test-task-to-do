import React, { useState } from "react";

const TodoForm = ({ onSubmit, onCancel, task }) => {
  const [title, setTitle] = useState(task ? task.title : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <label>
        Task Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TodoForm;
