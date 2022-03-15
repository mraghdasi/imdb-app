import { configureStore } from '@reduxjs/toolkit';
import toastData from 'redux/reducer/toast/toastReducer';
import filmSearchStore from 'redux/reducer/film/filmSearchReducer';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    toastData,
    filmSearchStore,
  },
});
