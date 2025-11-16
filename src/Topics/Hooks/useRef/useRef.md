# useRef

A hook that gives you a persistent box (like { current: … }) whose .current value:

- does NOT trigger re-render when changed

- stays the same across renders (like useState, but silent)

- can hold DOM element OR any mutable value (number/object/function/timer id)

### useRef() only returns one item. It returns an Object called current.

        const demoRef=useRef()
        demoRef.current={ name:"jane",age:12}

## Problem solves

If we tried to count how many times our application renders using the useState Hook, we would be caught in an infinite loop since this Hook itself causes a re-render.

```javascript
import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <p>Type in the input field:</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}
```

## Accessing dom elements directly

create ref and attach the ref to the element and use its current property to access the elements value.

```javascript
const inputRef = useRef(); // default: undefined
<input ref={inputRef} />;
button.onClick = () => inputRef.current.focus();
```

---

---

# forwardRef

React’s forwardRef is a special higher-order function that allows a parent to pass a ref directly to a child component’s DOM element — even if the child is a normal function component.

Normally, function components cannot receive refs (because refs only work on DOM or class components).
forwardRef fixes that limitation, making function components “ref-friendly.”

- We wrap our input component with forwardRef
- The component receives a ref as its second parameter
- The parent can now control the input element directly

#### React 19- we can pass a ref as a prop but not as a ref special property for that we would have to use forward refs

```javascript

<Child ref={myRef} />  // React special behavior — requires forwardRef ✅

<Child inputRef={myRef} />  // Just a prop — manual handling ✅

```

### Why do we need forwardRef?

- When parent needs direct DOM control — focusing inputs, scrolling divs, measuring height
- When wrapping 3rd-party components / UI libraries
- When creating custom reusable input components
- When building Portals, Modals, Toasts, Tooltips
- When using Imperative “trigger” APIs (via useImperativeHandle)

```javascript
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
```

---

```javascript
import React, { forwardRef } from "react";

const Input = forwardRef(({}, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
});

export default Input;
```
