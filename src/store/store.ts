import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user-redux';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const setUserInfo = (body: any) =>
  store.dispatch(userSlice.actions.setUserInfo(body));

export const logout = () =>
  store.dispatch(userSlice.actions.setUserInfo(null));

export default store;
