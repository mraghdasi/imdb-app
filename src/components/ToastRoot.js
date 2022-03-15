import React from 'react';
import { useSelector } from 'react-redux';
import Toast from './UI/Toast/Toast';

const ToastRoot = () => {
  const toastNotification = useSelector((state) => state.toastData.toastData);
  return toastNotification && <Toast message={toastNotification?.message} type={toastNotification?.type} time={toastNotification?.time} />;
};

export default ToastRoot;
