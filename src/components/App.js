import React from 'react';
import MainRouter from './MainRouter';
import ToastRoot from './ToastRoot';

function App({ className }) {
  return (
    <div className={`${className}`}>
      <ToastRoot />
      <MainRouter />
    </div>
  );
}

export default App;
