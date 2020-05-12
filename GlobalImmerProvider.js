import React from 'react';
import { useImmer } from 'use-immer';
import { GlobalImmerContext } from './GlobalImmerContext';
import { deepFreeze } from './deepFreeze';

export const GlobalImmerProvider = ({ children, store }) => {
  const [state, setState] = useImmer(store.initialState);
  return (
    <GlobalImmerContext.Provider value={[deepFreeze(state), setState]}>
      {children}
    </GlobalImmerContext.Provider>
  );
};
