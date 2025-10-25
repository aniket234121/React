import React, { useEffect } from "react";

const UseEffect = () => {
  const [firstRender, setFirstRender] = useState();
  const [lastRender, setLastRender] = useState();
  const [clicked,setClicked]=useState(false)

  // side effect with no dependencies runs once
  useEffect(() => {
    console.log("firstrender")
    setFirstRender((prev) => new Date());
  }, []);

  //side effect will run every render if omit the dependency
  useEffect(() => {
    console.log("lastRender")
    setLastRender(() => new Date());
  });

  //side effect will run when the dependencies change
  useEffect(() => {
    console.log("useeffect runs when button clicked")
    return ()=>{
      console.log("this is cleanup function of clicked side effect")
      
    }
  }, [clicked]);

  

  return (
    <div>
      <h2>Use Effect</h2>
      <p>fist render: {firstRender}, last render: {lastRender}</p>
      <button onClick={()=>setClicked((prev)=>!prev)}>click me</button>
    </div>
  );
};

export default UseEffect;
