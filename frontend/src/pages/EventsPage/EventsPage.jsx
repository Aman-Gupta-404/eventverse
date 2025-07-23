import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import EventCard from "../../components/eventCard/EventCard";
import FilterBar from "../../components/filterBar/FilterBar";
import "./Events.css";
import { getEvents } from "../../api/events";

function Events() {
  const [events, setEvents] = useState([]);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getEvents(sort);
        console.log({ result });
        if (result.status === 200) {
          setEvents(result.data.data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, [sort]);

  return (
    <>
      <Navbar />
      <div className="events-page">
        <h1 className="events-page__title">All Events</h1>
        <FilterBar sort={sort} setSort={setSort} />
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Events;
