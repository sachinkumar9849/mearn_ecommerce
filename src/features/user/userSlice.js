import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  fetchLoggedInUserOrder, fetchLoggedInUserOrders } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.userOrders = action.payload;
    })
  },
});
export const { clearSelectedProduct } = userSlice.actions;


export const selectUserOrders = (state) => state.user.userOrders;


export default userSlice.reducer;
