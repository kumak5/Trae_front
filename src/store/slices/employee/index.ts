import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';

import instance from '../../../config/axiosConfig';

import { InitialState } from './types';

const initialState = {
  isLoggedIn: false,
  employee: null,
  isLoading: 'idle',
  isError: false,
  error: null,
  isModalOpen: false,
} as InitialState;

export const loginEmployee = createAsyncThunk(
  'employee/loginEmployee',
  // eslint-disable-next-line consistent-return
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (token) {
        const response = await instance.post(
          `/employee/checkin/${id}`,
          {},
          config
        );

        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutEmployee = createAsyncThunk(
  'employee/logoutEmployee',
  // eslint-disable-next-line consistent-return
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (token) {
        const response = await instance.post(
          `/employee/checkout/${id}`,
          {},
          config
        );

        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    toggleModal(state, action) {
      state.isModalOpen = action.payload;
    },
    login(state, action) {
      state.employee = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    logout(state) {
      state.employee = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmployee.pending, (state) => {
        if (state.isLoading === 'idle') {
          state.isLoading = 'pending';
          state.isError = false;
          state.error = null;
        }
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        if (state.isLoading === 'pending') {
          state.isLoading = 'idle';
          state.employee = action.payload;
          state.isLoggedIn = !!action.payload;
          state.isError = false;
          state.error = null;
        }
      })
      .addCase(logoutEmployee.fulfilled, (state) => {
        state.employee = null;
        state.isLoggedIn = false;
      });
  },
});

export const { toggleModal, login, logout } = employeeSlice.actions;
export default employeeSlice.reducer;
