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
