import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: { toastData: null },
  reducers: {
    setNotificationData: (state, action) => {
      state.toastData = {
        type: action.payload.type,
        message: action.payload.message,
        time: action.payload.time,
      };
    },
  },
});

export const { setNotificationData } = toastSlice.actions;

export default toastSlice.reducer;
