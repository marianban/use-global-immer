import * as React from 'react';
import { useImmer } from 'use-immer';
import { GlobalImmerContext } from './GlobalImmerContext';
import { deepFreeze } from './deepFreeze';

export const GlobalImmerProvider = ({ children, store }) => {
  const [state, setState] = useImmer(store.initialState);
  const value = [deepFreeze(state), setState];
  return (
    // TODO: disable deep freeze for prod
    <GlobalImmerContext.Provider value={value}>
      {children}
    </GlobalImmerContext.Provider>
  );
};
