# Use Global Immer

use-global-immer is a react hook. It lets you define a global app state that can be shared, accessed and modified from your react components.

Don't forget to read the [official immer documentation](https://immerjs.github.io/immer/docs/introduction) before using use-global-immer.

## Installation

immer and use-immer are peer dependencies so you need to install them together with use-global-immer.

```bash
npm i use-global-immer use-immer immer
```

## Get Started

```js
// store.js

import { createImmerStore } from 'use-global-immer';

const store = createImmerStore({
  counter: 0,
});
```

```jsx
// Counter.js

import * as React from 'react';
import { useGlobalImmer } from 'use-global-immer';
import { store } from './store';

export const Counter = () => {
  const [counter, setCounter] = useGlobalImmer(store.counter);
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter((value) => value + 1)}>
        Increment
      </button>
    </div>
  );
};
```

```jsx
// App.js

import * as React from 'react';
import { GlobalImmerProvider } from 'use-global-immer';
import { store } from './store';
import { Counter } from './Counter';

export const App = () => {
  return (
    <GlobalImmerProvider store={store}>
      <Counter />
    </GlobalImmerProvider>
  );
};
```

## Advanced Example

Complete source code: [TodoMVC](https://github.com/marianban/use-global-immer/tree/master/examples/todomvc)

```js
// src/store.js

import { v4 } from 'uuid';
import { SHOW_ALL } from './constants/TodoFilters';
import { createImmerStore } from 'use-global-immer';

export const store = createImmerStore({
  todos: [
    {
      text: 'Use Global Immer',
      completed: false,
      id: v4(),
    },
  ],
  filter: SHOW_ALL,
});
```

In general we don't want to mix our store related logic with react rendering logic. Instead we would like to maintain a clear separation of concerns. There are multiple ways how this can be achieved. Some examples are container components or custom hooks. We are going to use the Container Component pattern, which is a well known redux pattern, so all our store related logic is encapsulated into a container component.

```jsx
// src/containers/Header.js

import Header from '../components/Header';
import React from 'react';
import { v4 } from 'uuid';
import { useGlobalImmer } from 'use-global-immer';
import { store } from '../store';

const ConnectedHeader = () => {
  // if the current state it's not needed you can omit the first value
  const [, setTodos] = useGlobalImmer(store.todos);

  const addTodo = (text) => {
    setTodos(
      (todos) =>
        // the return value of push is the new length
        // however we need to return undefined otherwise todos will be set to length
        // lets use the void operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void) to discard the returned length
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
```

```jsx
import React, { useMemo } from 'react';
import MainSection from '../components/MainSection';
import { useGlobalImmer } from 'use-global-immer';
import { store } from '../store';

const MainSectionContainer = () => {
  const [todos, setTodos] = useGlobalImmer(store.todos);

  // use useMemo to write memoized selectors
  const completedCount = useMemo(
    () =>
      todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
    [todos]
  );

  // alternatively we can use useCallback to avoid recreation of these functions on each render (more: https://kentcdodds.com/blog/usememo-and-usecallback)
  const completeAllTodos = () =>
    setTodos((todos) => void todos.forEach((todo) => (todo.completed = true)));

  const clearCompleted = () =>
    setTodos((todos) => todos.filter((todo) => !todo.completed));

  return (
    <MainSection
      todosCount={todos.length}
      completedCount={completedCount}
      completeAllTodos={completeAllTodos}
      clearCompleted={clearCompleted}
    />
  );
};

export default MainSectionContainer;
```

```jsx
// src/containers/VisibleTodoList.js;

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
```
