# Router

A Router is a system that maps a URL (like /about or /products/12) to a specific part of your application UI.

In traditional websites, the browser sends a request to the server for every page.
In single-page applications (SPAs) like React apps, the browser loads only one HTML file, and the router controls which components appear as the URL changes — without triggering a full-page refresh.

    npm i react-router

## Why Routing Is Needed

#### Routing is essential because:

- Display different UI screens based on the URL

  Example: /home → Home page, /users → Users page.

- Allow navigation without reloading the page

  Provides a smooth SPA experience.

- Keep app state while changing views

  Since no full refresh happens, your React component state can stay intact.

- Enable bookmarking & sharing

  URLs like /product/25 make your app linkable.

## Defining Routes (React Router v6) Basic (old way)

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

| Component             | Purpose                                                               |
| --------------------- | --------------------------------------------------------------------- |
| **`<BrowserRouter>`** | Wraps your entire app; listens to URL changes using HTML5 history API |
| **`<Routes>`**        | Container for all your routes; chooses the _best_ matching route      |
| **`<Route>`**         | Defines one specific URL → component mapping                          |

## Route Matching Rules

React Router v6 introduced simpler, more intuitive matching rules.

## 1. Exact Match (default in v6)

In React Router v6, all routes match exactly by default.

Example:

    <Route path="/about" element={<About />} />

- This will only match /about
- It will not match /about/us unless you define a nested route.

## 2. Exclusive Match (v6 behavior)

React Router v6 uses exclusive matching with a feature called ranking:

Among all matching routes, the router automatically selects the most specific and best-matching route.

Only one route renders at a time (unless nested).

Example:

**Routes**:

    /users
    /users/:id

**URL**:

    /users/10

**Router chooses**:

    /users/:id   → because it is more specific

## Defining Routes (new recommended way v6.4+)

### createBrowserRouter

createBrowserRouter is a React Router v6.4+ function used to create a browser-based router using the HTML5 History API.

Why it exists

It replaces the older <BrowserRouter> + <Routes> pattern to support the newer Data APIs:

- loader

- action

- errorElement

- route-based async data

- deferred data

- nested layouts

```javascript
import { createBrowserRouter } from "react-router";
import HomePage from "./Pages/HomePage.jsx";
import Contact from "./Pages/Contact.jsx";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/Contact", element: <Contact /> }, //mulitple routes give in array
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
```

### RouterProvider

RouterProvider is a React component that activates the router created by createBrowserRouter.

You MUST wrap your app with it.

It:

- injects the router context into your app

- runs loaders/actions

- handles navigation

- renders the matched route’s component

- handles errors + async boundaries

- coordinates suspense + deferred data

## Navigating Pages with **Link and NavLink** of react-router

## Link

Link is a React Router component used to navigate between routes without reloading the page.

Why it is used

- Prevents full page refresh

- Faster navigation

- Preserves React app state

- Uses browser history API (pushState)

It replaces the need for:

    <a href="/about"></a>

**because < a > causes a full page refresh, while <Link> uses client-side navigation.**

**Syntax:-**

    <Link to="/about">Go to About</Link>

example:-

```javascript
const HomePage = () => {
  return (
    <div>
      <h1>This is a Home Page</h1>
      <Link to={"/Contact"}>Contact Page</Link>
      <a style={{ margin: "20px" }} href="/Contact">
        Contact Page with anchor cause refresh
      </a>
    </div>
  );
};
```

## NavLink

NavLink is like Link but with active styling built-in.

It automatically detects if the link matches the current URL and applies:

- className

- style

- children function

Useful for navigation menus and highlighting the current page.

#### Why NavLink is used

- Automatically highlights the active page

- Better UX for navigation bars

- Handles dynamic matching (exact/partial)

```javascript
<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active-link" : "")}
>
  About
</NavLink>
```

Example:-

```javascript
import React from "react";
import { Link } from "react-router";
const MainNavigation = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {" "}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/Contact"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/Events"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
```

## Matching Behavior

### Default behavior

- NavLink matches partially.

          Example:
          If URL = /about/team

  Then:

      <NavLink to="/about">About</NavLink>

is active.

### Exact Matching (end prop)

- To make it match exactly:

        <NavLink to="/about" end>
        About
        </NavLink>

#### **Now /about/team will not activate this link.**

## Layouts & Nested Routes

### Layout

**A Layout is a component that:**

- Wraps multiple pages

- Provides shared UI (navbar, sidebar, footer)

- Stays consistent across route changes

- Renders child pages inside it using < Outlet />

- Think of it as a “parent template” for a group of routes.

#### Why Layouts Exist

- Avoid repeating common UI in every page

- Create clean route structures

- Support nested routing

- Combine multiple levels of layout (app → dashboard → settings)

Example:-

```javascript
import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router";
const RootLayout = () => {
  return (
    <div>
      <MainNavigation></MainNavigation>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
```

## Nested Routes

### Nested routes allow you to:

- Create a hierarchy of pages

- Group routes logically under a layout

- hare UI and data between parent and children

- How Nested Routes Work

- Define route structure using an array of route objects:

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      { path: "/Contact", element: <Contact /> },
      { path: "/Events", element: <Events /> },
    ],
  },
]);
```

#### 1. Parent Route

- Holds the Layout component

- Must include < Outlet />

- Children render inside the outlet

      {
        path: "/",
        element: <RootLayout />,
        children: [...]
      }

#### 2. Child Routes

- Render inside the parent layout’s <Outlet>

- Use index: true for default child route

Example:

    children: [
          {
            index: true, // for default child page to load
            path: "/",
            element: <HomePage />,
          },
          { path: "/Contact", element: <Contact /> },
          { path: "/Events", element: <Events /> },
        ],

## Showing Error Pages

### errorElement

In React Router (especially React Router v6.4+ with the Data Router APIs), you can define error pages using the errorElement property in your route configuration.

This allows you to show a custom error UI when:

- A loader throws an error

- An action throws an error

- A component inside the route throws during rendering

- The route path is not matched (if you use a catch-all route)

```javascript
import ErrorPage from "./Pages/ErrorPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, //adding error page for errors
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      { path: "/Contact", element: <Contact /> },
      { path: "/Events", element: <Events /> },
    ],
  },
]);
```

### Handling the error in ErrorPage

---

```javascript
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <pre>{error.statusText || error.message}</pre>
    </div>
  );
}
```

#### Route-Level Error Boundaries

Each child route can also define its own errorElement.

## Navigating Programmatically

### useNavigate()

navigate from inside a component

useNavigate() gives you a function for navigation.

- Works inside components.

- Works on click handlers, after API calls, forms, etc.

```javascript
import { useNavigate } from "react-router-dom";

function MyComp() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/")}>Go Home</button>;
}
```

### navigating like browser back/forward

```javascript
import React from "react";
import { useNavigate } from "react-router";

const EventsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>EventsPage</div>
      <button onClick={() => navigate(-1)}>go back 1 step from browser</button>
      <button onClick={() => navigate(-2)}>go back 2 step from browser</button>

      <button onClick={() => navigate(1)}>
        go forward 1 step from browser
      </button>
    </>
  );
};

export default EventsPage;
```
