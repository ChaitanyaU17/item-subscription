/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";
import type { SubscriptionData } from "./subscription";

interface SubscriptionState {
  submitted: SubscriptionData | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  submitted: null,
  loading: false,
  error: null,
};

export const submitSubscription = createAsyncThunk(
  "subscription/submit",
  async (payload: any) => {
    const response = await api.post("/shop/subscription", payload);
    return response.data.data as SubscriptionData;
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        submitSubscription.fulfilled,
        (state, action: PayloadAction<SubscriptionData>) => {
          state.loading = false;
          state.submitted = action.payload;
        }
      )
      .addCase(submitSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to submit subscription";
      });
  },
});

export default subscriptionSlice.reducer;