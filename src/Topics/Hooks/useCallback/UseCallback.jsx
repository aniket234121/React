import React from "react";
import { useCallback, useState } from "react";
const UseCallback = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Parent +</button>
      <Child onClick={handleClick} />
    </>
  );
};
export default UseCallback;

export const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});
