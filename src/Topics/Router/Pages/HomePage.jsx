import React from "react";
import { Link } from "react-router";
const HomePage = () => {
  return (
    <div>
      <h1>This is a Home Page</h1>
      <Link to={"/Contact"}>Contact Page</Link>
      <a style={{ margin: "20px" }} href="/Contact">
        Contact Page with anchor cause refresh
      </a>
      <Link to={"/something"}>This link will take to error page(unknown url)</Link>
    </div>
  );
};

export default HomePage;
