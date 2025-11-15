# REDUX

Redux is a state management library used to manage application-level state in predictable, testable, centralized manner.
It is most commonly used with React, but it works with any JS framework.

## Why Redux?

Without Redux (Typical problems)

- State is scattered across many components.

- Deep component trees → props drilling hell.

- Hard to debug → “Who changed this state?”

- Complex apps need shared state (auth, cart, notifications, theme, UI state, API cache).

Redux solves this by:

- Creating one single source of truth → Store

- Updating state using pure functions → reducers

- Triggering updates using actions (plain JS objects)

- Enforcing predictability → same input = same output

- Making state changes traceable → devtools, time-travel debugging

## Basic REDUX

install packages redux & react-redux:

    npm i redux
    npm i react-redux

## Steps

### 1. Create Store using createStore and pass a reducer function to it .

```javascript
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
```

### 2. Using the store by useSelector to extract some portion and useDispatch to dispatch actions

```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INCREMENT } from "./store/storeDataRedux";
const Redux = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: INCREMENT });
  };
  return (
    <div>
      <h2>Redux</h2>
      <p>{counter}</p>
      <button onClick={handleClick}>increase counter</button>
      <p>using redux store </p>
    </div>
  );
};

export default Redux;
```
#### React-Redux provides two main hooks to interact with the Redux store:

- useSelector → Read data from the store

useSelector is a React hook that allows a component to extract the required portion of the Redux state from the store.

    const data = useSelector((state) => state.someSlice.data);

- useDispatch → Send actions to the store

useDispatch returns the dispatch function used to send actions to Redux.

    const dispatch=useDispatch()
