import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/Axios";

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/login', userData, { withCredentials: true });
    const res = await axiosInstance.get('/auth/me', { withCredentials: true });
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/register', userData, { withCredentials: true });
    const res = await axiosInstance.get('/auth/me', { withCredentials: true });
    return res.data.user;
  } catch (error) {
     return thunkAPI.rejectWithValue(
        err.response?.data || { error: "Something went wrong" }
      );
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/auth/me', { withCredentials: true });
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
