import { useContext } from 'react';
import { GlobalImmerContext } from './GlobalImmerContext';

export const useGlobalImmer = (storeProp) => {
  const [globalState, setGlobalState] = useContext(GlobalImmerContext);
  const state = globalState[storeProp.key];
  const setState = (updater) => {
    if (typeof updater === 'function') {
      setGlobalState((globalState) => {
        const result = updater(globalState[storeProp.key]);
        if (result) {
          globalState[storeProp.key] = result;
        }
      });
    } else {
      throw new Error('Updater must be a function');
    }
  };
  return [state, setState];
};
