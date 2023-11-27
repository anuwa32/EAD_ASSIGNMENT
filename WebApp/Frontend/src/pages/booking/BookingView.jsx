import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./booking.css";

//VIEW All  booking
const BookingView = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const getBookings = () => {
    axios
      .get("http://localhost:5019/api/Reservation")
      .then((response) => {
        const data = response.data;
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center background2"
    >
      <h3>All Active Bookings</h3>
      <br />
      {bookings &&
        bookings.map((booking) => (
          <Card
            className="shadow"
            style={{ height: "1000px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)", marginBottom: "300px" }}
            key={booking.id}
          >
            <Card.Body>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "5px" }}
              >
                <h5>Ref ID: {booking.referenceId}</h5>
                <br />
                <h5>Name: {booking.travallerName}</h5>
                <br />
                <h5>Date: {booking.reservationDate}</h5>
                <br />
                <h5>Passengers: {booking.noOfPassenger}</h5>
                <br />
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default BookingView;
