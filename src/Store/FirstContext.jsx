import { createContext, useState } from "react";

export const FirstContext = createContext({
  FirstContextValue: {
    demoObject: {id:1,name:'abcd'},
    demoArray: ['apple','orange','guava'],
    demoVar: "", // ✅ optional default
  },
  setFirstContextValue:()=>{}
});

export const FirstContextProvider = ({ children }) => {
  const [FirstContextValue, setFirstContextValue] = useState({
    demoObject: {},
    demoArray: [],
    demoVar: "demo val",
  });

  return (
    <FirstContext.Provider value={{ FirstContextValue, setFirstContextValue }}>
      {children}
    </FirstContext.Provider>
  );
};
