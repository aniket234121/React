import React from "react";
import { Link, useNavigate } from "react-router";
import './EventsDetails.css'
const EVENTS = [
  { id: "e1", name: "Rock Music Festival", date: "2025-04-18" },
  { id: "e2", name: "Living & Wellness Expo", date: "2025-06-02" },
  { id: "e3", name: "Riverview Art Exhibition", date: "2025-07-12" },
];

const EventsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="events-page">
      <h1 className="title">Upcoming Events</h1>

      <div className="nav-buttons">
        <button onClick={() => navigate(-1)}>⬅ Go Back</button>
        <button onClick={() => navigate(-2)}>⬅⬅ Back 2 Steps</button>
        <button onClick={() => navigate(1)}>➡ Go Forward</button>
      </div>

      <div className="events-list">
        {EVENTS.map((event) => (
          <Link className="event-card" key={event.id} to={`/events/${event.id}`}>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
