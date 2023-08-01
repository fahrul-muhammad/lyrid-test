import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {showToast} from '../../utils/toast';

const API_URL: string = 'https://reqres.in/api/';

interface typeBody {
  email: string;
  password: string;
}

export const LoginUser = createAsyncThunk(
  'auth/Login',
  async (body: typeBody, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await axios.post(`${API_URL}login`, body);
      showToast({
        position: 'top',
        title: 'Login Success',
        text: 'Welcome to myContact. 👋',
        type: 'success',
      });
      return fulfillWithValue(response.data);
    } catch (error: any) {
      showToast({
        position: 'top',
        title: 'Login Error',
        text: error.response.data.error,
        type: 'error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

export const RegisterUser = createAsyncThunk(
  'auth/Register',
  async (body: typeBody, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await axios.post(`${API_URL}register`, body);
      showToast({
        position: 'top',
        title: 'Register Success',
        text: 'Welcome to myContact. 👋',
        type: 'success',
      });
      return fulfillWithValue(response.data);
    } catch (error: any) {
      showToast({
        position: 'top',
        title: 'Login Error',
        text: error.response.data.error,
        type: 'error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

interface AuthState {
  dataLogin: {};
  dataRegister: {};
  isLoading: boolean;
  isLoginSuccess: boolean;
  isRegisterSuccess: boolean;
  error: any;
}

const initialState: AuthState = {
  dataLogin: {},
  dataRegister: {},
  isLoading: false,
  isLoginSuccess: false,
  isRegisterSuccess: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(LoginUser.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.isLoginSuccess = false;
      state.dataLogin = {};
    }),
      builder.addCase(
        LoginUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.dataLogin = action.payload;
          state.error = null;
          state.isLoginSuccess = true;
        },
      ),
      builder.addCase(
        LoginUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.dataLogin = {};
          state.isLoginSuccess = false;
        },
      );
    builder.addCase(RegisterUser.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.isRegisterSuccess = false;
      state.dataRegister = {};
    }),
      builder.addCase(
        RegisterUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.dataRegister = action.payload;
          state.error = null;
          state.isRegisterSuccess = true;
        },
      ),
      builder.addCase(
        RegisterUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.dataRegister = {};
          state.isRegisterSuccess = false;
        },
      );
  },
});

export default authSlice;
