# useEffect

useEffect is a React hook used to perform side effects in functional components.

Side effects: operations that interact with the outside world or React state indirectly:

- Fetching data from APIs

- Subscribing to events (e.g., window resize, scroll)

- Manipulating the DOM

- Setting timers (setTimeout, setInterval)

```javascript
useEffect(() => {
  // effect (runs AFTER render/mount or update)
  return () => {
    // cleanup (runs BEFORE unmount or BEFORE next effect run)
  };
}, [dependencies]);
```

---

---

| Dependency Array               | Runs When                                              | Use Case                                                   |
| ------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------- |
| ❌ No `[]` (missing)           | EVERY RENDER                                           | Dangerous. Triggers on every re-render. Almost never used. |
| ✅ Empty `[]`                  | ONLY ONCE after initial mount                          | Fetch API on page load, add eventListener, analytics       |
| ✅ With dependencies `[count]` | Runs **every time dependency changes**                 | Sync external system when specific state or prop changes   |
| ✅ Cleanup return function     | Runs **before unmount** OR **before next effect call** | Clear timers, remove listeners, avoid memory leaks         |

---

---

## Variations

### Case 1 — NO dependency array

```javascript
useEffect(() => {
  console.log("Runs after EVERY render");
});
```

    ⚠️ BAD — runs even on minor re-renders. Only used in rare controlled cases.

---

### Case 2 - Empty dependency array []

```javascript
useEffect(() => {
  console.log("Runs ONLY on first mount");
}, []);
```

    ✅ Equivalent to componentDidMount.

    Common for:

    API calls

    event listeners

    connection setup

### Case 3 — With dependencies

```javascript
useEffect(() => {
  console.log(`Runs when count changes`);
}, [count]);
```

    ✅ Very common — runs only when count/dependency changes.

### Case 4 - with cleanup

#### when cleanup function runs

| Situation                            | When cleanup runs                                                          |
| ------------------------------------ | -------------------------------------------------------------------------- |
| **1. Before the effect re-runs**     | → React is about to run the same effect again (because dependency changed) |
| **2. Before the component unmounts** | → React is removing the component from the screen                          |

#### Syntax:-

```javascript
useEffect(() => {
  const timer = setInterval(() => console.log("Running"), 1000);

  return () => clearInterval(timer); // cleanup
}, []);
```

    ✅ Cleanup prevents:

    memory leaks

    duplicate listeners

    react strict mode double effect

## use useEffect hook with Objects and Functions carefully ( i.e useCallback, useMemo)

side effect behaves differently when used with objects and function

useEffect dependencies control when an effect should re-run.
But when you use objects, arrays, or functions as dependencies,
React checks them by reference, not by value.

That means React does shallow comparison →
if the memory reference changes, React thinks it’s a “new” value,
and re-runs your effect — even if the content looks identical.

This causes:

🔁 Unnecessary effect re-runs

⚠️ Infinite loops

❌ Performance issues

### why?

```
const a = { name: "Aniket" };
const b = { name: "Aniket" };

console.log(a === b); // ❌ false (different memory references)
```

so we can't pass dependencies of useEffect as objects and functions directly we have to use some other ways
like :-

- useMemo()
- useCallback()
