# Memo

React.memo is not a Hook, but a Higher-Order Component (HOC).
It is used to memoize functional components, i.e., to prevent unnecessary re-renders when props have not changed.

## Why We Need React.memo

React re-renders a component every time its parent re-renders, even if the child’s props haven’t changed.

This can:

- Reduce performance in large applications.
- Cause unnecessary DOM updates.
- Waste time in recalculating unchanged UI.

✅ React.memo helps by caching (memoizing) the last rendered output.

Example:- without memo

- Every time you click the button:
- Parent re-renders (✅ expected)
- Child also re-renders (❌ unnecessary — props didn’t change)

---

```javascript
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="Aniket" />
    </div>
  );
}

function Child({ name }) {
  console.log("Child rendered");
  return <p>Hello {name}</p>;
}
```

#### Solution:-

Now:

* When you click “Increment”, only Parent re-renders.
* Child is skipped because name prop didn’t change.

```javascript
const Child = React.memo(function Child({ name }) {
  console.log("Child rendered");
  return <p>Hello {name}</p>;
});
```

###  Common mistakes with memo
| Mistake                                     | Explanation                                                         |
| ------------------------------------------- | ------------------------------------------------------------------- |
| Passing new function or object every render | Causes memo to fail (different reference)                           |
| Overusing memo everywhere                   | Adds comparison overhead; use only when needed                      |
| Thinking it works like `useMemo`            | `React.memo` works on **components**, `useMemo` works on **values** |

