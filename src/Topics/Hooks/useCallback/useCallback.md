# useCallback

useCallback is a React Hook that memoizes (caches) a function so that the same function reference is preserved across renders unless its dependencies change.

so until the dependency is changed the function with same reference is used not created again if it changes the function is recreated with different reference

syntax:-

```javascript
const memoizedFn = useCallback(() => {
  // function logic
}, [dependencies]);
```

## Why do we need useCallback?

- Prevent unnecessary re-renders of child components

- Stabilize function reference when used inside useEffect

- Improve performance in large applications

## Use Case

```javascript
const Parent = () => {
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

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});
```
