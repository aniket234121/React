import React from "react";
import { useRef } from "react";
import Input from "./Input";

const ForwardRef = () => {
  const inputRef = useRef();

  return (
    <div>
      <h2>forward ref</h2>
      <p>parent component</p>
      <Input ref={inputRef}></Input>
    </div>
  );
};

export default ForwardRef;
