import React from 'react';
import MainRouter from './MainRouter';
import { useSelector } from 'react-redux';
import Toast from './UI/Toast/Toast';

function App({ className }) {
  const toastNotification = useSelector((state) => state.toastData.toastData);

  return (
    <div className={`${className}`}>
      {toastNotification && <Toast message={toastNotification?.message} type={toastNotification?.type} time={toastNotification?.time} />}

      <MainRouter />
    </div>
  );
}

export default App;
