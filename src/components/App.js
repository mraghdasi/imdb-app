// import 'antd/dist/antd.css';
import React from 'react';
import MainRouter from './MainRouter';
import { useSelector } from 'react-redux';
import TcToast from './UI/Toast/TcToast';

function App({ className }) {
  const toastNotification = useSelector((state) => state.toastData.toastData);

  return (
    <div className={`${className}`}>
      {toastNotification && <TcToast message={toastNotification?.message} type={toastNotification?.type} time={toastNotification?.time} />}

      <MainRouter />
    </div>
  );
}

export default App;
