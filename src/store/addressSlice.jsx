import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const DATABASE_URL = "https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (userId) => {
    const res = await axios.get(`${DATABASE_URL}/users/${userId}.json`);
    return res.data?.address || "";
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    currentAddress: "",
    loading: false,
    error: null,
  },
  reducers: {
    setAddress(state, action) {
      state.currentAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAddress = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
