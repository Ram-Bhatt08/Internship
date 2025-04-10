import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="todo-list">
      {sortedTodos.length === 0 ? (
        <div className="empty-state">
          <p>No todos yet. Add one above!</p>
        </div>
      ) : (
        <ul className="todo-items">
          {sortedTodos.map(todo => (
            <li key={todo._id}>
              <TodoItem
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string,
    })
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func,
};

export default TodoList;