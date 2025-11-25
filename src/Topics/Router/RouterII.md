# Router II

## Dynamic Route?

A dynamic route is a route with a URL parameter.
A URL parameter is defined using a colon (:) in the route path.

Example:

    /products/:productId

Here productId is dynamic — it can be any value.

### Why Do We Need Dynamic Routing?

- To load details based on an ID (product, user, order).
- To reuse the same page for multiple data entries.
- To build scalable URL structures with parameters.
- To enable SEO-friendly URLs instead of search params.

### How to Define Dynamic Route?

    { path: "/Events/:id", element: <EventDetails /> },

- :productId is a placeholder.

- Any value in its place matches the route.

### Read the Dynamic Params

```javascript
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();

  return <h1>Product ID: {productId}</h1>;
}
```

- useParams() returns an object of all params.
- If route is /products/10.

### Adding Links for Dynamic Routes

You generate the URL dynamically using template literals.

```javascript
<Link to={`/products/${product.id}`}>{product.name}</Link>
```

## Relative and Absolute Paths

### Absolute Path:-

Starts with /

Always resolves from the root of the app, no matter where the component is located.

Example route:

    { path: "/products", element: <Products /> }

Example link:

    <Link to="/products">Products</Link>

Meaning:

- It ignores parent routes.
- It does not depend on where the link is rendered.

### Relative Path:-

Does NOT start with /

It resolves relative to the parent route where it is defined or rendered.

Example nested route:

    {
    path: "details",
    element: <ProductDetails />
    }

If the parent route is:

    /products/:id

Final URL becomes:

    /products/:id/details

## Index Routes

An index route is a child route that:

- Has no path

- Renders by default when the parent route is matched

- Represents the homepage of a nested route section

```javascript

{
  path: "/products",
  element: <ProductsLayout />,
  children: [
    {
      index: true,
      element: <ProductsList />,
    },
    {
      path: ":productId",
      element: <ProductDetails />,
    },
  ],
}

```

## Loader

A loader is a function attached to a route.
It:

- runs before rendering the component,

- fetches data (async allowed),

- returns data for the component,

- makes data available via useLoaderData().

#### 1. loader signature define

```javascript
export async function loader({ params, request }) {
  // fetch or compute something
  return data;
}
```

#### 2. Attaching a loader to route

```javascript
import { createBrowserRouter } from "react-router-dom";
import Products, { loader as productsLoader } from "./Products";

const router = createBrowserRouter([
  {
    path: "/products",
    element: <Products />,
    loader: productsLoader,
  },
]);

export default router;
```

#### 3. Using the loader data from route

```javascript
import { useLoaderData } from "react-router-dom";

function Products() {
  const products = useLoaderData();

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}

export default Products;
```

## Returning Responses in loader()

A loader() must return something that React Router can use as data, or throw something (error or Response).

It never returns JSX.

React Router expects loader output to be one of these:

- Plain data (objects, arrays, primitives)

- Response objects

- redirect()

- throw Response() for errors

- defer() for streaming

### 1. Returning Plain Data (Most Common)

You can return JSON, arrays, objects, strings, etc.

Example:

```javascript
export async function loader() {
  const res = await fetch("https://api.com/products");
  const data = await res.json();
  return data;
}
```

Usage:

    const products = useLoaderData();

### 2. Returning a Response Object

Useful when you want complete control over:-

- Headers

- Status codes

- Content type

Example:

```javascript
export async function loader() {
  return new Response("Hello from loader", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
```

In component:

    const text = useLoaderData(); // "Hello from loader"

- React Router automatically reads the body

### 3. Throwing a Response (For Error Boundaries)

Instead of returning, you throw.

Example:

```javascript
export async function loader() {
  const res = await fetch("https://api.com/user");

  if (!res.ok) {
    throw new Response("User not found", { status: 404 });
  }

  return res.json();
}
```

- React Router automatically sends this to errorElement

## useRouteLoaderData

it is used to access loader data from any route, especially when:

routes are nested

- you want data from a parent route

- you want data from a layout route

- you want data from a route that is not the current one

This is different from useLoaderData() which only accesses the current route's loader.

### How to Use It

#### Step 1: Give the Route an id

```javascript
const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader: async () => {
      const res = await fetch("/api/me");
      return res.json();
    },
    element: <RootLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
```

- The id can be any string.

- Without an id, you cannot use useRouteLoaderData.

---

#### Step 2: Access That Data Using useRouteLoaderData

Inside any child component:

```javascript
import { useRouteLoaderData } from "react-router-dom";

function Profile() {
  const { user } = useRouteLoaderData("root");

  return <h2>Welcome {user.name}</h2>;
}
```

## Action

The action function handles form submissions or mutations at the route level.

This replaces handling POST/PUT/DELETE inside components and moves it into the router configuration.

An action is a function defined inside a route object that is triggered when a route receives a:

- POST

- PUT

- PATCH

- DELETE

submission.

It handles operations like:

- Creating data

- Updating data

- Deleting data

- Validating form input

- Redirecting after submission

### How action Works (Flow)

1. User submits <Form method="post">
2. React Router intercepts
3. Calls the matched route's action

   Action returns:

   - redirect

   - data

   - errors

   - nothing (void)

4. UI updates or navigates accordingly

```javascript
import { Form } from "react-router-dom";

export default function ContactForm() {
  return (
    <Form method="post">
      <input name="name" placeholder="Your Name" />
      <textarea name="message" />
      <button type="submit">Send</button>
    </Form>
  );
}
```

#### defining action in any component in which we want to use the route

```javascript
export const action = async ({ request }) => {
  const formData = await request.formData();
  //sending data to db logic can be written here
  const name = formData.get("name");
  const message = formData.get("message");

  console.log(name, message);

  return redirect("/thank-you");
};
```

#### using that action in the route

```javascript
import { action as eventsAction } from "./EventsDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "Contact", element: <Contact /> },
      {
        path: "Events",
        action: eventsAction, //using that event action here
        children: [
          { index: true, element: <Events /> },
          { path: ":id", element: <EventDetails /> },
        ],
      },
    ],
  },
]);
```

### useSubmit()

useSubmit is a hook that lets you submit:

- a Form

- a FormData object

- a plain object

WITHOUT needing a < Form> element.

It’s like calling form.submit() but integrated with React Router’s actions, loaders, and navigation.

#### Why use useSubmit

- Submit data based on events (button click, API response, etc.)
- Submit WITHOUT <Form>
- Trigger a specific route’s action
- Trigger a specific route’s action
- Works with navigation, revalidation, loaders
- Allows full control over method & replace behavior

```javascript
const submit = useSubmit();

const handleClick = () => {
  submit({ name: "aniket" }, { method: "post" });
};
```

```java

{
  path: "/profile",
  action: async ({ request }) => {       //action method
    const fd = await request.formData();
    console.log(fd.get("name")); // "aniket"
    return redirect("/done");     //redirect to done page
  },
  element: <Profile />,
}

```

### redirect()

it is used inside loaders or actions to navigate after:

- form submission

- mutation

- saving data

- login validation

It triggers a navigation after the action finishes.

### useActionData():-

useActionData() is a hook that lets your component read the data returned by an action() function after a form submission.

It is specifically used with:

- Route actions

- < Form> or < fetcher.Form> submissions

- POST, PUT, PATCH, DELETE logic

- Server-style mutations

#### calling action when loginPage submit form.

```javascript
{
  path: "/login",
  element: <LoginPage />,
  action: loginAction,
}
```

---

#### return object error/success from action

```javascript
export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email.includes("@")) {
    return { error: "Invalid email format!" };
  }

  return { success: true };
}
```

---

#### reading the return data by useActionData hook

```javascript
import { Form, useActionData } from "react-router-dom";

export default function LoginPage() {
  const actionData = useActionData(); // <--- read returned data

  return (
    <>
      {actionData?.error && <p>{actionData.error}</p>}
      {actionData?.success && <p>Logged in successfully!</p>}

      <Form method="post">
        <input name="email" />
        <button>Login</button>
      </Form>
    </>
  );
}
```

### useFetcher()

useFetcher() is a powerful hook that lets you submit forms, load data, or trigger actions WITHOUT navigating.

Think of it as:

- background form submission
- background data fetching
- run actions without page change
- run loaders from anywhere
- fully controlled, programmatic Form behavior

This is something <Form> cannot do on its own.

| Feature            | Description                                   |
| ------------------ | --------------------------------------------- |
| `fetcher.Form`     | submit form without navigating                |
| `fetcher.submit()` | manual submission                             |
| `fetcher.load()`   | run any loader without navigating             |
| `fetcher.data`     | returned loader/action data                   |
| `fetcher.state`    | idle, submitting, loading                     |
| Purpose            | background fetch + background form submission |

#### defining the route and action
```javascript
{
  path: "/tasks",
  action: addTaskAction,
}
```

---
#### action function to run on submit on that route
```javascript
export async function addTaskAction({ request }) {
  const data = await request.formData();
  return { added: data.get("task") };
}
```

---
#### using useFetcher to not navigate and perform background submission
```javascript
const fetcher = useFetcher();

<fetcher.Form method="post" action="/tasks">
  <input name="task" />
  <button>Add</button>
</fetcher.Form>;

{
  fetcher.data?.added && <p>Added: {fetcher.data.added}</p>;
}
```
