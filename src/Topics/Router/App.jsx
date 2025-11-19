import React from "react";
import { createBrowserRouter } from "react-router";
import HomePage from "./Pages/HomePage.jsx";
import Contact from "./Pages/ContactPage.jsx";
import { RouterProvider } from "react-router";
import RootLayout from "./Layout/RootLayout.jsx";
import Events from "./Pages/EventsPage.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import EventDetails from "./Pages/EventDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      { path: "/Contact", element: <Contact /> },
      { path: "/Events", element: <Events /> },
      { path: "/Events/:id", element: <EventDetails /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
