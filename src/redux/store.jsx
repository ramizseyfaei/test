import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import customerReducer from './customerSlice'

export const store = configureStore({
  reducer: {
    api: apiReducer,
    customer: customerReducer,
  },
});
