import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import TaskList from "./Components/TaskList";
import ItemList from "./Components/ItemList";
import TodoForm from "./Components/TodoForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const tasksPerPage = 10;

  useEffect(() => {
    // Asynchronous function to fetch data from the server
    const fetchData = async () => {
      try {
        // Performing a GET request to the API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        // Handling errors during the request
        console.error("Error fetching tasks:", error);
      }
    };
    // Calling the fetchData function when the component mounts
    fetchData();
  }, []);

  const pageCount = Math.ceil(tasks.length / tasksPerPage);

  const displayTasks = tasks.slice(
    pageNumber * tasksPerPage,
    (pageNumber + 1) * tasksPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  const handleEditTask = (editedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...editedTask } : task
      )
    );
    setEditingTask(null);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <TodoForm
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        onCancel={handleCancelEdit}
        task={editingTask}
      />
      <TaskList>
        <ItemList
          displayTasks={displayTasks}
          setEditingTask={setEditingTask}
          handleDelete={handleDelete}
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
