import React from "react";
import { useParams } from "react-router";
const EventDetails = () => {
  const params = useParams();
  return (
    <div>
      <h1>EventDetails</h1>
      <p>id:{params.id}</p>
    </div>
  );
};

export default EventDetails;
