import { v4 } from 'uuid';
import { SHOW_ALL } from './constants/TodoFilters';
import { createImmerStore } from 'use-global-immer';

export const store = createImmerStore({
  todos: [
    {
      text: 'Use Regrok',
      completed: false,
      id: v4(),
    },
  ],
  filter: SHOW_ALL,
});
