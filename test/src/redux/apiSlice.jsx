import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baseUrl: "http://localhost:3001",
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
});

export const BaseUrl = (state) => state.api.baseUrl;
export default apiSlice.reducer;
