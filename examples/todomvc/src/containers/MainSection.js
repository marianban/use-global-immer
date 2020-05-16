import React, { useMemo } from 'react';
import MainSection from '../components/MainSection';
import { useGlobalImmer } from 'use-global-immer';
import { store } from '../store';

const MainSectionContainer = () => {
  const [todos, setTodos] = useGlobalImmer(store.todos);
  const todosCount = todos.length;

  const completedCount = useMemo(
    () =>
      todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
    [todos]
  );

  const completeAllTodos = () =>
    setTodos((todos) => void todos.forEach((todo) => (todo.completed = true)));

  const clearCompleted = () =>
    setTodos((todos) => todos.filter((todo) => !todo.completed));

  return (
    <MainSection
      todosCount={todosCount}
      completedCount={completedCount}
      completeAllTodos={completeAllTodos}
      clearCompleted={clearCompleted}
    />
  );
};

export default MainSectionContainer;
