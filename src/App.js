import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { v4 as uuidv4 } from "uuid";

import TaskList from "./Components/TaskList";
import ItemList from "./Components/ItemList";
import TodoForm from "./Components/TodoForm";

function App() {
  const [tasks, setTasks] = useState(() => {
    return getItemFromStore();
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const tasksPerPage = 10;

  useEffect(() => {
    // Asynchronous function to fetch data from the server
    const fetchData = async () => {
      try {
        // const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        // const data = await response.json();
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    // Calling the fetchData function when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const pageCount = Math.ceil(tasks.length / tasksPerPage);

  const displayTasks = tasks.slice(
    pageNumber * tasksPerPage,
    (pageNumber + 1) * tasksPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleAddTask = (newTask) => {
    let numOfLastItem = tasks ? tasks[tasks.length - 1]?.num || 0 : 0;
    if (title) {
      setTasks([
        ...tasks,
        { id: uuidv4(), num: numOfLastItem + 1, ...newTask },
      ]);
      setTitle("");
    }
  };

  const handleEditTask = (editedTask) => {
    setTasks(
      tasks.map((task) => {
        return task.id === editingTask.id ? { ...task, ...editedTask } : task;
      })
    );
    setEditingTask(null);
    setTitle("");
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTitle("");
  };

  function getItemFromStore() {
    return JSON.parse(localStorage.getItem("tasks"));
  }

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <TodoForm
        title={title}
        setTitle={setTitle}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        onCancel={handleCancelEdit}
        task={editingTask}
      />
      <TaskList>
        <ItemList
          displayTasks={displayTasks}
          setEditingTask={setEditingTask}
          handleDelete={handleDelete}
          setTitle={setTitle}
        />
      </TaskList>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}

export default App;
