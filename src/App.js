import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Асинхронная функция для получения данных с сервера
    const fetchData = async () => {
      try {
        // Выполнение GET-запроса к API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        // Обработка ошибок при выполнении запроса
        console.error("Error fetching tasks:", error);
      }
    };

    // Вызов функции fetchData при монтировании компонента
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
