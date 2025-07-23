import React from "react";
import { useParams } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import "./SingleEvent.css";
import { useEffect } from "react";
import { getSingleEvent } from "../../api/events";

const SingleEventPage = () => {
  const { id } = useParams(); // get the id from url

  // 🔥 Dummy Event Data (replace with API later)
  const event = {
    id,
    title: "Campus Tech Meetup 2025",
    description:
      "Join us for an exciting tech meetup where industry leaders and students come together to explore new technologies, network, and innovate. You’ll get a chance to collaborate, learn, and even win cool prizes!",
    image: "https://source.unsplash.com/900x500/?conference,technology",
    totalSeats: 100,
    bookedSeats: 90,
  };

  const seatsLeft = event.totalSeats - event.bookedSeats;

  const handleBooking = () => {
    alert("🎉 Booking successful! (hook API here)");
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getSingleEvent();
      console.log(res);
    };

    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="single-event-container">
        {/* Navbar */}

        {/* Event Card */}
        <div className="single-event-card">
          <img src={event.image} alt={event.title} className="event-image" />

          <div className="event-details">
            <h1 className="event-title">{event.title}</h1>
            <p className="event-description">{event.description}</p>

            <div className="seats-info">
              <span
                className={`seats-left ${
                  seatsLeft > 0 ? "available" : "sold-out"
                }`}
              >
                {seatsLeft > 0
                  ? `🎟️ Seats Left: ${seatsLeft}`
                  : "❌ Fully Booked"}
              </span>
              <span className="total-seats">
                Total Seats: {event.totalSeats}
              </span>
            </div>

            <button
              onClick={handleBooking}
              disabled={seatsLeft === 0}
              className={`book-button ${seatsLeft === 0 ? "disabled" : ""}`}
            >
              {seatsLeft > 0 ? "Book Now" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEventPage;
