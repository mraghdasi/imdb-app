import { useDispatch } from 'react-redux';
import { removeFinancial } from 'redux/reducer/Financial/FinancialReducer';
import { removeOrderList } from 'redux/reducer/ListOrders/listOrdersReducer';
import { logout } from 'redux/reducer/Login/loginReducer';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { removeUserBranches } from 'redux/reducer/UserBranches/UserBranchesReducer';

const useApiCatcher = () => {
  const dispatch = useDispatch();

  return (errorResponse) => {
    if (errorResponse.networkError?.message === 'Network Error') {
      dispatch(setNotificationData({ message: 'اینترنت قطع می‌باشد. دوباره تلاش کنید', type: 'error', time: 5000 }));
    } else if (errorResponse.networkError?.code === 'ECONNABORTED') {
      dispatch(setNotificationData({ message: 'پاسخی از سمت سرور دریافت نشد. صفحه را رفرش کنید', type: 'error', time: 5000 }));
    } else if (errorResponse?.error?.status === 401) {
      dispatch(setNotificationData({ message: errorResponse?.error?.data?.Message || errorResponse?.error?.data?.message, type: 'error', time: 5000 }));
      dispatch(logout());
      dispatch(removeUserBranches());
      dispatch(removeFinancial());
      dispatch(removeOrderList());
    } else if(errorResponse?.error?.status === 403) {
      dispatch(setNotificationData({ message: 'کاربر مورد نظر به این بخش دسترسی ندارد', type: 'error', time: 5000 }));
    }
     else if (errorResponse?.error) {
      dispatch(setNotificationData({ message: errorResponse?.error?.data?.Message || errorResponse?.error?.data?.message, type: 'error', time: 5000 }));
    }
  };
};

export default useApiCatcher;
