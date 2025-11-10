# Custom hook

A Custom Hook is a JavaScript function that starts with the word use and allows you to reuse stateful logic (logic that uses hooks like useState, useEffect, etc.) between multiple components.

They do not render UI, only handle logic and side effects.

| Problem                                     | Solution via Custom Hook                           |
| ------------------------------------------- | -------------------------------------------------- |
| Duplicate logic in multiple components      | Write once inside a custom hook                    |
| Difficult to test or maintain repeated code | Centralize the logic in a reusable function        |
| Complex components (too much logic inside)  | Extract parts of logic into smaller reusable hooks |
| Easier separation of concerns               | UI and logic stay independent                      |

example:-

```javascript
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setData(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => (isMounted = false); // cleanup
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
```
