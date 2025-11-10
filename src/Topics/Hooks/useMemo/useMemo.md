# useMemo
useMemo is a React Hook that memoizes (caches) the result of a calculation between re-renders.

It prevents recomputing expensive values unless their dependencies change.

    
    const memoizedValue = useMemo(() => computeValue(a, b), [a, b]);

* ### Parameters:

    * Callback function → Function whose result you want to memoize

    * Dependency array → List of variables that, when changed, will recompute the value

* ###  Returns:

    The cached (memoized) value.

## Why We Use useMemo

React re-renders a component every time its state or props change.
During each render, all expressions inside the component body are re-evaluated.

If a calculation is expensive (e.g. filtering a large array, computing totals, etc.), it will slow down performance.

✅ useMemo solves this by:

* Caching the previous result.

* Recomputing only when dependencies actually change.

Example:-

Filter() is executed only when products or filter changes.

---
```javascript

function ProductList({ products, filter }) {
  const filtered = useMemo(
    () => products.filter((p) => p.category === filter),
    [products, filter]
  );

  return (
    <ul>
      {filtered.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}u
```