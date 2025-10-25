import React, { useContext } from "react";
import { FirstContext } from "../../../Store/FirstContext";

const UseContextConsumer = () => {
    
  const { FirstContextValue, setFirstContextValue } = useContext(FirstContext);

  // Example function to update context
  const updateDemoVar = () => {
    setFirstContextValue(prev => ({
      ...prev,                       // keep previous values
      demoVar: "Updated from Child", // update demoVar only
    }));
  };

  const addToDemoArray = () => {
    setFirstContextValue(prev => ({
      ...prev,
      demoArray: [...prev.demoArray, "New Item"], // push into array
    }));
  };

  return (
    <div>
      <h2>Any Child consumer components</h2>

      <p>demoVar: {FirstContextValue.demoVar}</p>

      <p>demoArray:</p>
      {FirstContextValue.demoArray.length === 0 ? (
        <p>No items yet</p>
      ) : (
        FirstContextValue.demoArray.map((item, index) => (
          <p key={index}>{item}</p>
        ))
      )}

      <button onClick={updateDemoVar}>Update demoVar</button>
      <button onClick={addToDemoArray}>Add to demoArray</button>
    </div>
  );
};

export default UseContextConsumer;
