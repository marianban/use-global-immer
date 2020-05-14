import Header from '../components/Header';
import React from 'react';
import { v4 } from 'uuid';
import { useGlobalImmer } from 'use-global-immer';
import { store } from '../store';

const ConnectedHeader = () => {
  const [, setTodos] = useGlobalImmer(store.todos);

  const addTodo = (text) => {
    setTodos(
      (todos) =>
        void todos.push({
          text,
          id: v4(),
          completed: false,
        })
    );
  };

  return <Header addTodo={addTodo} />;
};

export default ConnectedHeader;
