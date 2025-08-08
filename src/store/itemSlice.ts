/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

export const fetchItems = createAsyncThunk("items/fetch", async () => {
  const response = await api.get("/shop/Item");
  return response.data.data.filter((item: any) => item.itemType === "service");
});

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
    error:  null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default itemSlice.reducer;
