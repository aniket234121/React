// store/storeDataRedux.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Old Redux actions (manual)
export const INCREMENT = "increment";
export const DECREMENT = "decrement";

const initialState = { counter: 0 };

// ---------------------------------------
// COUNTER REDUCER (normal reducer function)
// ---------------------------------------
export function reducerFunction(state = initialState, action) {
  if (action.type === INCREMENT) {
    return { counter: state.counter + 1 };
  }
  if (action.type === DECREMENT) {
    return { counter: state.counter - 1 };
  }
  return state;
}



