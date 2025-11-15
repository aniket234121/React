import { multiplierSlice } from "./MultiplierRedux";
import { reducerFunction } from "./CounterRedux";
import { configureStore } from "@reduxjs/toolkit";
// ---------------------------------------
// STORE CONFIG
// ---------------------------------------
const store = configureStore({
  reducer: {
    counter: reducerFunction,
    multiplier: multiplierSlice.reducer,
  },
});

export default store;
