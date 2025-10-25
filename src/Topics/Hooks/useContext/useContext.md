# useContext Hook

- The useContext Hook lets us share data between components without having to pass props down through every level of the component tree.

- This is particularly useful when many components need to access the same data or when components are deeply nested.

## Problem without useContext

❓ Why do we need Context?

Normally we pass data via props from parent → child → child → …

But if a value is needed by deeply nested components, this becomes extremely painful:

```javascript
<App>
  <Header user={user}>
    {" "}
    // prop drilling 😭
    <Navbar user={user}>
      <Profile user={user} />
    </Navbar>
  </Header>
</App>
```

This unnecessary passing is called prop drilling.

✅ Context removes this problem → lets us globally share data with any component without manually passing props.

## 🌟 What is Context?

A global storage system inside React only for UI-related state (not a replacement for Redux).
Useful for global values like:

- current logged in user
- dark/light theme
- language
- cart data
- auth token for protected pages

### How Context Works (Flow)

| Step | Action                  | Purpose                                |
| ---- | ----------------------- | -------------------------------------- |
| 1    | `createContext()`       | Creates a Context object               |
| 2    | `<MyContext.Provider>`  | Wraps component tree and PROVIDES data |
| 3    | `useContext(MyContext)` | Any child component can CONSUME data   |

#### note: usually context is defined in store folder in root folder

![alt text](<Screenshot from 2025-10-22 02-17-48.png>)

### 1. Creating a Context and its Context provider

```javascript
import { createContext, useState } from "react";

export const FirstContext = createContext({
  demoObject: {},
  demoArray: [],
  demoVar: "",
  setFirstContextValue: () => {}, // ✅ optional default
});

export const FirstContextProvider = ({ children }) => {
  const [FirstContextValue, setFirstContextValue] = useState({
    demoObject: {},
    demoArray: [],
    demoVar: "",
  });

  return (
    <FirstContext.Provider value={{ FirstContextValue, setFirstContextValue }}>
      {children}
    </FirstContext.Provider>
  );
};
```

---

---

### Why createContext( { value } ) is different that <context.provider value={}>

| Location                              | Purpose                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------ |
| `createContext(defaultValue)`         | ✅ Only used **when no Provider wraps the component** (fallback/default) |
| `<FirstContext.Provider value={...}>` | ✅ The **real live value** that children will actually receive           |

- This only works if someone uses context WITHOUT a Provider above them.

- React does not crash, because we gave it a safe default object.

- The function here is fake, just to avoid errors if someone calls it accidentally.

✅ Think of it like:
“In case Provider is missing, use this default dummy value.”

---

---

### 2. consuming the context in any child component which is wrapped by ContextProvider

```javascript
import React, { useContext } from "react";
import { FirstContext } from "../../Store/FirstContext";

const UseContextConsumer = () => {
  const { FirstContextValue, setFirstContextValue } = useContext(FirstContext);

  // Example function to update context
  const updateDemoVar = () => {
    setFirstContextValue((prev) => ({
      ...prev, // keep previous values
      demoVar: "Updated from Child", // update demoVar only
    }));
  };

  const addToDemoArray = () => {
    setFirstContextValue((prev) => ({
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
```
