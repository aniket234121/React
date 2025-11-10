import React from "react";
import { useState } from "react";
const useInput = (defaultValue,validationFunc) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid=validationFunc(enteredValue)

  function handleInputChange(event) {
    setEnteredValue(event.target.value)
    setDidEdit(false)
  }
  function handleInputBlur()
  {
    setDidEdit(true)
  }
  return {
    value:enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError:didEdit&&!valueIsValid
  }
};

export default useInput;
