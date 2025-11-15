import { createStore } from "redux";

export const INCREMENT = "increment";
export const DECREMENT = "decrement";

const initialState = { counter: 0 };

function reducerFunction(state = { initialState }, action) {
  if (action.type === INCREMENT) {
    return { counter: state.counter + 1 };
  }
  if (action.type === DECREMENT) {
    return { counter: state.counter - 1 };
  }
  return state;
}

const store = createStore(reducerFunction);

export default store;
