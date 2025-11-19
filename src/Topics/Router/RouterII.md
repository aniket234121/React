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

## How to Define Dynamic Route?

    { path: "/Events/:id", element: <EventDetails /> },

- :productId is a placeholder.

- Any value in its place matches the route.

## Read the Dynamic Params
