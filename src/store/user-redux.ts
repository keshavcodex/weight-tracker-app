import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserInfo(state, action) {
      return {...state, ...action.payload};
    },
  },
});
