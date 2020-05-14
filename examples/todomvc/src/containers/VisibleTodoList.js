import React from 'react';
import TodoList from '../components/TodoList';
import { store } from '../store';
import { useGlobalImmer } from 'use-global-immer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../constants/TodoFilters';

const getVisibleTodos = (visibilityFilter, todos) => {
  switch (visibilityFilter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + visibilityFilter);
  }
};

const VisibleTodoList = () => {
  const [todos, setTodos] = useGlobalImmer(store.todos);
  const [filter] = useGlobalImmer(store.filter);
  const filteredTodos = getVisibleTodos(filter, todos);

  const findIndex = (todos, id) => todos.findIndex((t) => t.id === id);

  const editTodo = (todo) =>
    setTodos((todos) => {
      const index = findIndex(todos, todo.id);
      todos[index] = todo;
    });

  const deleteTodo = ({ id }) =>
    setTodos((todos) => {
      const index = findIndex(todos, id);
      todos.splice(index, 1);
    });

  const completeTodo = (todoId) => {
    setTodos((todos) => {
      const index = findIndex(todos, todoId);
      todos[index].completed = true;
    });
  };

  return (
    <TodoList
      filteredTodos={filteredTodos}
      editTodo={editTodo}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
  );
};

export default VisibleTodoList;
