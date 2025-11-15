import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INCREMENT } from "./store/CounterRedux";
import { mulitplierAction } from "./store/MultiplierRedux";
import "./Redux.css";

const Redux = () => {
  const counter = useSelector((state) => state.counter.counter);
  const multiplierValue = useSelector((state) => state.multiplier.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: INCREMENT });
  };

  const handleMultiplier = () => {
    dispatch(mulitplierAction.multiply(5));
  };

  return (
    <div className="redux-container">
      <h2>Redux</h2>

      <p>{counter}</p>
      <button className="redux-btn increment" onClick={handleClick}>
        Increase Counter
      </button>

      <p>{multiplierValue}</p>
      <button className="redux-btn multiply" onClick={handleMultiplier}>
        Multiply by 5
      </button>

      <p>Using Redux Store</p>
    </div>
  );
};

export default Redux;
