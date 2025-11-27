# Authentication

Authentication is the process of verifying who the user is.
In React apps, this usually involves:

- Logging in a user

- Storing authentication tokens (JWT)

- Protecting routes

- Maintaining session state

## Common Authentication Methods

### Token-based authentication (most common)

- The backend returns a JWT (JSON Web Token) after login.

- React stores the token (usually in memory, localStorage, or httpOnly cookies).

- The token is sent with API requests for protected resources.

### Session-based authentication

- The server stores a session in memory/database.

- A session ID is sent via cookies.

## Where tokens are stored

| Storage Option            | Pros                | Cons                                                             |
| ------------------------- | ------------------- | ---------------------------------------------------------------- |
| **localStorage**          | Easy, persistent    | Vulnerable to XSS                                                |
| **sessionStorage**        | Clears on tab close | Still XSS vulnerable                                             |
| **HTTP-only cookie**      | More secure         | Requires backend config                                          |
| **React State / Context** | Very secure         | Does not persist on refresh unless combined with backend/session |

## Query Parameters

Extra data passed in the URL after ?

Example:

    /products?page=2&sort=asc

They are used for:

- Pagination

- Filters

- Sorting

- Search keywords

- Sharing state via URL

### 1. Read Query parameters

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const sort = searchParams.get("sort");

### 2. Set/Update Query Parameters

    const [searchParams, setSearchParams] = useSearchParams();

    setSearchParams({ page: 3, sort: "desc" });

### 3. Delete Query Parameters

    params.delete("filter");
    setParams(params);

### 4. Using Query Params for Navigation

React Router allows manual navigation:

    navigate("?page=4&category=phones");

Or merge with existing params:

    navigate({
    pathname: "/products",
    search: `?${params.toString()}`,
    });

### Example- URL decide the mode for UI login or signup

```javascript
import { useSearchParams, Link, Form } from "react-router-dom";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login"; // default
  const isLogin = mode === "login";

  return (
    <>
      {/* React Router Form */}
      <Form method="post">
        <input type="hidden" name="mode" value={mode} />

        <div>
          <label>Email:</label>
          <input name="email" type="email" required />
        </div>

        <div>
          <label>Password:</label>
          <input name="password" type="password" required />
        </div>

        <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
      </Form>

      {/* Toggle link based on query param */}
      <p>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Signup" : "Login"}
        </Link>
      </p>
    </>
  );
};

export default AuthForm;
```

### Auth Action

An action in React Router handles form submissions (POST/PUT/PATCH/DELETE).
For auth, the action:

- Reads form data

- Checks mode (login or signup)

- Sends request to backend

- Handles errors

- Returns data or redirects

Route setup

    {
    path: "/auth",
    element: <AuthForm />,
    action: authAction,
    } 


```javascript
export async function action({ request }) {
  const formData = await request.formData();

  const mode = formData.get("mode"); // login/signup
  const email = formData.get("email");
  const password = formData.get("password");

  if (mode !== "login" && mode !== "signup") {
    throw new Error("Unsupported mode");
  }

  // API endpoint
  const url =
    mode === "login"
      ? "https://example.com/login"
      : "https://example.com/signup";

  // Sending request to backend
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  // Handle validation or server errors
  if (!response.ok) {
    return {
      error: "Authentication failed. Check credentials.",
    };
  }

  const data = await response.json();

  // Example: Store token
  localStorage.setItem("token", data.token);

  // Redirect user after success
  return redirect("/dashboard");
}
```
