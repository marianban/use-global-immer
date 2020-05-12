# Use Global Immer

## Installation

```bash
npm i use-global-immer use-immer immer
```

## Get Started

```js
// store.js

import { createImmerStore } from 'useGlobalImmer';

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
      <button onClick={() => setCounter(value => void value +)}>Increment</button>
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
