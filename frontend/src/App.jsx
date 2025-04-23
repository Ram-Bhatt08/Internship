import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './Components/TodoForm/TodoForm';
import TodoList from './Components/TodoList/TodoList';

// Point to your backend API, not MongoDB directly
const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTodos([response.data, ...todos]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !todoToUpdate.completed
      });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="app">
     <center> <h1>Todo List</h1> </center>
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

export default App;