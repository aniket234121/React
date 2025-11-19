import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router";
const RootLayout = () => {
  return <div>
    <MainNavigation></MainNavigation>
    <Outlet></Outlet>
  </div>;
};

export default RootLayout;
