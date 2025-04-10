import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './TodoForm.css'; // Optional styling

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    
    if (!trimmedTitle) {
      setError('Todo title cannot be empty');
      return;
    }
    
    try {
      addTodo(trimmedTitle);
      setTitle('');
      setError('');
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-group">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(''); // Clear error when user types
          }}
          placeholder="Add a new todo..."
          aria-label="Todo title"
          className={error ? 'error' : ''}
        />
        <button type="submit" aria-label="Add todo">
          Add Todo
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoForm;