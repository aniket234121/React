import React from "react";
import { NavLink } from "react-router";
import "./MainNavigation.css";
const MainNavigation = () => {
  return (
    <header>
      <nav>
        <ul className="links">
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
