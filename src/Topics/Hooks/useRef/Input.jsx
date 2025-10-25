import React, { forwardRef } from "react";

const Input = forwardRef(({}, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
});

export default Input;
