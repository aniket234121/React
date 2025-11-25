import React from "react";
import { Outlet } from "react-router";
import EventNavigation from "../components/EventNavigation";
const EventRootLayout = () => {
  return (
    <div>
      <EventNavigation></EventNavigation>
      <Outlet />
    </div>
  );
};

export default EventRootLayout;
