<h2 style="color:#ff4d4d;">Q. How does state flow in React?</h2>

### <span style="color:#ff944d;">Answer</span>

- **React always renders top → down.**  
  The tree is evaluated from parent to child every render.

- **Props are one-way: parent → child (never backwards).**  
  Data only flows downward.

- **State updates are async, batched, and trigger re-render.**  
  `setState()` schedules — it never mutates immediately.

- **A re-render means the component function runs again.**  
  State is preserved; variables reset.

- **State lifting exists because siblings cannot share state.**  
  Shared state must live in the parent.

- **Derived state should be computed, not stored.**  
  Otherwise it becomes inconsistent.

- **Never set state inside render.**  
  It causes infinite loops.

---

<h2 style="color:#ff4d4d;">Q. What exactly happens when I call <code>setState(x)</code>?</h2>

### <span style="color:#ff944d;">1. <code>setState</code> does NOT update immediately</span>

React queues the update.

> “Got it. I’ll handle this later.”

---

### <span style="color:#ff944d;">2. React schedules a re-render</span>

React marks the component as **dirty**.

---

### <span style="color:#ff944d;">3. State updates are batched</span>

```js
setState(a);
setState(b);
```

Both go into the same batch.

---

### <span style="color:#ff944d;">4. On the next render, React re-runs your component</span>

- fresh function run
- new state
- variables reset
- state + refs persist

---

### <span style="color:#ff944d;">5. React compares the new Virtual DOM with the old one</span>

This is **reconciliation**.

---

### <span style="color:#ff944d;">6. React commits minimal DOM changes</span>

Only the **needed** updates apply.

---

<h2 style="color:#ff4d4d;">Q. Why does logging state immediately after <code>setState</code> show the old value?</h2>

### Example

```js
setCount(count + 1);
console.log(count); // old value
```

---

### <span style="color:#ff944d;">1. React renders your component and gives you a snapshot</span>

```js
function Counter() {
  console.log(count); // 0
}
```

- snapshot never changes mid-render
- closure captures the old value

---

### <span style="color:#ff944d;">2. Calling setCount queues the update</span>

> “Next state = 1.”

Not applied immediately.

---

### <span style="color:#ff944d;">3. Logging shows the old value because of closures</span>

```js
console.log(count); // still 0
```

NOT because of:

- async
- delay
- event loop
- batching

The real reason → **closure**.

---

### <span style="color:#ff944d;">4. On the next render, React re-runs the component</span>

```js
console.log(count); // now 1
```

---

<h2 style="color:#ff4d4d;">Q. Why does this work?</h2>

```js
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

It increases by **+3**.

Because the **functional updater uses fresh internal state**, not the stale closure.

---

<h3 style="color:#ff944d;">🔥 Mechanism in slow motion</h3>

Initial: `count = 0`

---

#### Call 1

- prev = 0 → 1

#### Call 2

- prev = 1 → 2

#### Call 3

- prev = 2 → 3

---

<h3 style="color:#ff944d;">📌 Update queue</h3>

```
initial = 0
1 → 1
2 → 2
3 → 3
```

---

<h3 style="color:#4CAF50;">✅ Final result → 3</h3>

Functional updates pull from React’s **internal queued state**, not closures.

---

<h2 style="color:#ff4d4d;">Q. What exactly is a stale closure in React, and why does it cause bugs?</h2>

### <span style="color:#ff944d;">Answer</span>

Each render in React gets its **own snapshot of state**.

When you call `setState`, React schedules a **new snapshot for the next render**.

But your current render’s closure still contains the **old snapshot**, because closures freeze the values from the moment the function ran.

---

### <span style="color:#ff944d;">What is a stale closure?</span>

A **stale closure** is when your code continues to use **variables from an older render**, even though newer state exists.

> You’re reading state from the past.

---

### <span style="color:#ff944d;">Why does it cause bugs?</span>

Because the closure has **old state**, but React has **new state queued**.

So using the old variable leads to:

- wrong calculations
- missed updates
- inconsistent UI
- bugs like `+1` when you expected `+2`

---

### <span style="color:#4CAF50;">In one sentence:</span>

---

<h2 style="color:#ff4d4d;">Q. Why does using <code>setCount(count + 1)</code> inside event handlers often cause stale state bugs?</h2>

### <span style="color:#ff944d;">Answer</span>

Because `count` is taken from the **current render’s snapshot**, not the upcoming one.

When you write:

```js
setCount(count + 1);
```

`count` is whatever value existed **during this render**, and that value is frozen inside the closure.

---

### <span style="color:#ff944d;">Why this creates stale state</span>

Even if React has already queued a new state value, your event handler still uses:

- the old `count`
- from the old render
- stored inside the old closure

So multiple calls like:

```js
setCount(count + 1);
setCount(count + 1);
```

all use the **same stale value**, causing incorrect state updates.

---

### <span style="color:#4CAF50;">In one sentence:</span>

**`setCount(count + 1)` uses the outdated state snapshot captured by the closure, so repeated updates operate on stale state instead of the latest value.**

<h2 style="color:#ff4d4d;">Q. Why does the functional updater <code>setCount(prev => prev + 1)</code> avoid stale closure bugs?</h2>

### <span style="color:#4CAF50;">Answer</span>

**Because the functional updater doesn’t use the stale closure — it receives the latest state directly from React’s internal update queue, so every update is applied on top of the truly newest value.**

<h2 style="color:#ff4d4d;">Q. If each render has its own closure, how does React preserve state between renders?</h2>

### <span style="color:#4CAF50;">Answer</span>

React preserves state because the state is **not stored inside your component**.  
React stores all state values **internally (in a hidden array)**, and on every render it hands your component the next saved value.

---

### <span style="color:#2196F3;">In one sentence</span>

**State lives in React, not in your component — each new render simply reads the stored state value from React’s internal memory.**
<h2 style="color:#ff4d4d;">Q. Why does React re-run the component instead of updating variables inside it?</h2>

### <span style="color:#4CAF50;">Answer</span>

**Because every time state changes, React needs to re-draw the UI from scratch — and the easiest way is to simply call your component function again to produce a fresh render.**

React cannot change variables inside an old render because those variables are **frozen inside that render’s closure**.

So React does the simple thing:

**Throw away the old render → create a new one with the updated state.**
