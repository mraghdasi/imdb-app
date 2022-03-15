import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/toast/toastReducer';

const useApiCatcher = () => {
  const dispatch = useDispatch();

  return (errorResponse) => {
    if (errorResponse.networkError?.status === 404) {
      dispatch(setNotificationData({ message: errorResponse.networkError?.message, type: 'error', time: 5000 }));
    } else if (errorResponse?.error) {
      dispatch(setNotificationData({ message: errorResponse?.error?.data?.Message || errorResponse?.error?.data?.message, type: 'error', time: 5000 }));
    }
  };
};

export default useApiCatcher;
