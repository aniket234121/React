# FormAction

The formAction attribute in HTML specifies the URL where the form data should be sent when a specific Button or Input of type="submit" is clicked.

if we use formaction and pass formaction function then when the form submits it will call that function and pass formdata to the function

```javascript
import { useActionState } from "react";

function handleSignupAction(formData) {
  const email = formData.get("email");

  if (!email.includes("@")) {
    return { error: "Invalid email" };
  }
  return { success: true };
}

export default function SignupForm() {
  const [state, action, isPending] = useActionState(handleSignupAction, {});

  return (
    <form action={action}>
      <input type="email" name="email" placeholder="Enter email" />
      {state?.error && <p>{state.error}</p>}

      <button disabled={isPending}>Sign up</button>
    </form>
  );
}
```

## useFormStatus

useFormStatus() is a React Hook (available in Next.js App Router) that gives you the current state of a <form> submission — like whether it’s pending, successful, or failed — when using Server Actions or form actions.

```javascript
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function MyForm() {
  async function formAction(formData) {
    "use server";
    const name = formData.get("name");
    console.log("Submitted:", name);
  }

  return (
    <form action={formAction}>
      <input type="text" name="name" placeholder="Your name" />
      <SubmitButton />
    </form>
  );
}
```
