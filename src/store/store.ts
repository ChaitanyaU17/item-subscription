import { configureStore } from "@reduxjs/toolkit";
import subscriptionReducer from "./subscriptionSlice";
import itemReducer from "./itemSlice";

export const store = configureStore({
  reducer: {
    subscription: subscriptionReducer,
    items: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
