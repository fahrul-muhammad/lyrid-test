import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {showToast} from '../../utils/toast';

const API_URL: string = 'https://reqres.in/api/';

export const GetAllUsers = createAsyncThunk(
  'users/GetAllUser',
  async (_, {fulfillWithValue, rejectWithValue}) => {
    try {
      const responsePageOne = await axios.get(`${API_URL}users?page=1`);
      const responsePageTwo = await axios.get(`${API_URL}users?page=2`);
      const data = [...responsePageOne.data.data, ...responsePageTwo.data.data];
      return fulfillWithValue(data);
    } catch (error: any) {
      showToast({
        position: 'top',
        title: 'Error',
        text: 'Something went wrong',
        type: 'error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

export const EditUserById = createAsyncThunk(
  'users/editUserById',
  async ({id, body}: any, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await axios.patch(`${API_URL}users/${id}`, body);
      showToast({
        position: 'top',
        title: 'Success',
        text: 'Edit Contact Success',
        type: 'success',
      });
      return fulfillWithValue(response.data);
    } catch (error: any) {
      showToast({
        position: 'top',
        title: 'Error',
        text: 'Something went wrong',
        type: 'error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

export const DeleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (id: number, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await axios.delete(`${API_URL}users/${id}`);

      return fulfillWithValue(response.data);
    } catch (error: any) {
      showToast({
        position: 'top',
        title: 'Error',
        text: 'Something went wrong',
        type: 'error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

export const MakeNewUser = createAsyncThunk(
  'users/makeNewUser',
  async (body: any, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await axios.post(`${API_URL}users`, body);
      console.log('RESPONSE MAKE NEW USER : ', response.data);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      showToast({
        position: 'top',
        title: 'Error',
        text: 'Something went wrong',
        type: 'error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

interface userState {
  dataUser: [] | any;
  isLoading: boolean;
  isGetSuccess: boolean;
  error: any;
  isEditSuccess: boolean;
  isDeleteSuccess: boolean;
  newUser: {};
}

const initialState: userState = {
  dataUser: [],
  isLoading: false,
  isGetSuccess: false,
  error: null,
  isEditSuccess: false,
  isDeleteSuccess: false,
  newUser: {},
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUsers(state, {payload}) {
      state.dataUser[payload.objIndex].first_name = payload.body.first_name;
      state.dataUser[payload.objIndex].last_name = payload.body.last_name;
    },
    deleteUsers(state, {payload}) {
      const newData = [...state.dataUser];
      if (payload.objIndex !== -1) {
        newData.splice(payload.objIndex, 1);
      }
      state.dataUser = newData;
    },
    addNewUsertoData(state, {payload}) {
      const newData = [payload.data, ...state.dataUser];
      state.dataUser = newData;
    },
  },
  extraReducers: builder => {
    builder.addCase(GetAllUsers.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.isGetSuccess = false;
      state.dataUser = [];
    }),
      builder.addCase(
        GetAllUsers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.dataUser = action.payload;
          state.error = null;
          state.isGetSuccess = true;
        },
      ),
      builder.addCase(
        GetAllUsers.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.dataUser = [];
          state.isGetSuccess = false;
        },
      );
    builder.addCase(EditUserById.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.isEditSuccess = false;
    }),
      builder.addCase(
        EditUserById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = null;
          state.isEditSuccess = true;
        },
      ),
      builder.addCase(
        EditUserById.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.isEditSuccess = false;
        },
      );
    builder.addCase(DeleteUserById.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.isDeleteSuccess = false;
    }),
      builder.addCase(
        DeleteUserById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = null;
          state.isDeleteSuccess = true;
        },
      ),
      builder.addCase(
        DeleteUserById.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.isDeleteSuccess = false;
        },
      );
    builder.addCase(MakeNewUser.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.newUser = {};
    }),
      builder.addCase(
        MakeNewUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = null;
          state.newUser = action.payload;
        },
      ),
      builder.addCase(
        MakeNewUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.newUser = {};
        },
      );
  },
});

export const {editUsers, deleteUsers, addNewUsertoData} = userSlice.actions;
export default userSlice;
