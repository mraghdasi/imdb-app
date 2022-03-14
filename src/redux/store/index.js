import { configureStore } from '@reduxjs/toolkit';
import toastData from 'redux/reducer/toast/toastReducer';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    toastData,
  },
});
