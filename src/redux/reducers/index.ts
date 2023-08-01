import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction} from '@reduxjs/toolkit';
import authSlice from '../slice/auth';
import userSlice from '../slice/users';

const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export const rootReducer = (state: any, action: PayloadAction<string>) => {
  return reducers(state, action);
};

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [authSlice.name],
};
