# useActionState

useActionState is a React hook that lets you tie an action function (often a form submission handler) to component state in a declarative way.

syntax:-

```javascript
const [formState, formAction, isPending] = useActionState(
  actionFn,
  initialState
);
```

### Parameters

**actionFn** - is a function you define (could be a server action or client action) that will run when the form is submitted.

**initialState** is the initial value for the state returned by the hook.

### Return

**formState** is the current state (initially initialState, then updated after each action invocation).

**formAction** is the action handler you pass to a Form element (via its action prop) or a Button (via formAction prop) so the form submission is wired correctly.

**isPending (or pending)** is a boolean flag that indicates if the action is currently in progress. Useful for showing loading/spinner states.


## Summary

- useActionState → hook to manage state that comes from an action (often a form submission).

- Returns [state, formAction, isPending].

- formAction is passed to

```
    <form action={…}> or <button formAction={…}>
```
* so when form is submitted the actionFn runs.

- The actionFn receives previous state + FormData, and returns new state.

- While the action runs, isPending = true.

- Works well for server-forms (progressive enhancement) and client forms.

- Use formAction prop for multiple buttons in one form to allow different submission handlers.

- Use isPending for disabling UI/feedback.

- Use state to reflect results (success, error, etc.).
