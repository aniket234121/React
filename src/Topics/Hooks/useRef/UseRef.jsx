import React from "react";
import { useRef } from "react";

//counting the renders on changing the input using ref 
const UseRef = () => {
  const inputRef = useRef();
  const [renderCount,setRenderCount]=useState(0)
  const handleChange=()=>{
    setRenderCount(prev=>prev+1)
  }
  useEffect(()=>{
    inputRef.current=inputRef.current+1
  })
  return (
    <div>
      <h2>use Ref</h2>
      <input type="text"  onChange={handleChange}/>
      <p>render count:{renderCount}</p>
    </div>
  );
};

export default UseRef;
