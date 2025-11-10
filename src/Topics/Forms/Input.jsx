import React from "react";

const Input = ({ id, label,error, ...props }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <p>{error}</p>
    </div>
  );
};

export default Input;

const FormExample = () => {
  return (
    <div>
      <Input label={"email"} id={"email"} type={"email"} name={"email"}></Input>
      <Input label={"password"} id={"password"} type={"password"} name={"password"}></Input>
    </div>
  );
};
