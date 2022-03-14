import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message, type, time }) => {
  let toastNotification = null;

  if (type === 'success') {
    toastNotification = toast.success;
  } else if (type === 'error') {
    toastNotification = toast.error;
  } else if (type === 'info') {
    toastNotification = toast.info;
  } else if (type === 'warning') {
    toastNotification = toast.warning;
  }
  toastNotification &&
    toastNotification(message, {
      position: 'bottom-left',
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <ToastContainer
        position='bottom-left'
        autoClose={time}
        theme={'colored'}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Toast;
