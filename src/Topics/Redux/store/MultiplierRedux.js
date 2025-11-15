import { createSlice } from "@reduxjs/toolkit";
// ---------------------------------------
// MULTIPLIER SLICE (Redux Toolkit)
// ---------------------------------------
export const multiplierSlice = createSlice({
  name: "multiplierSlice",
  initialState: { value: 1 },
  reducers: {
    multiply(state, action) {
      state.value = state.value * action.payload;
    },
  },
});

// Export slice actions
export const mulitplierAction = multiplierSlice.actions;
 

