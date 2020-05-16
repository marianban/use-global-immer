import React from 'react';
import Header from '../containers/Header';
import MainSection from '../containers/MainSection';
import { GlobalImmerProvider } from 'use-global-immer';
import { store } from '../store';

const App = () => {
  return (
    <GlobalImmerProvider store={store}>
      <Header />
      <MainSection />
    </GlobalImmerProvider>
  );
};

export default App;
