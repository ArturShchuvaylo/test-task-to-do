import React, { useState, useEffect } from "react";
import TaskList from "./Components/TaskList";
import ItemList from "./Components/ItemList";

function App() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TaskList>
        <ItemList tasks={tasks} />
      </TaskList>
    </div>
  );
}

export default App;
