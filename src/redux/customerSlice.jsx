// src/features/customer/customerSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerNames: [],
  selectedCustomer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerNames: (state, action) => {
      state.customerNames = action.payload;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const { setCustomerNames, setSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
