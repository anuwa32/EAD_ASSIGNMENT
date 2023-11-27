import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "./booking.css";

//VIEW All  booking for 1 traveler
const BookingUserWiseView = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const getBookings = () => {
    axios
      .get("http://localhost:5019/api/Reservation/"+id)
      .then((response) => {
        const data = response.data;
        const filteredData = data.filter((item) => !item.isCancelled);
        setBookings(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    localStorage.removeItem("booking");
    getBookings();
  }, []);

  const handleDelete = (itemId) => {
    let data = {
      "isCancelled": true
    }
    axios
      .put(`http://localhost:5019/api/Reservation/${itemId}`,data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Booking Deleted.",
        }).then(() => {
          getBookings();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed.",
        });
      });
  };

  const handleChange = (item) => {
    try {
      const arrayString = JSON.stringify(item);
      localStorage.setItem("booking", arrayString);
    } catch (e) {
    } finally {
      navigate("/bookingupdate");
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center background"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <h3>All Active Bookings of User</h3>
      <br />
      {bookings &&
        bookings.map((item) => (
          <Card
            className="container"
            style={{ height: "px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)" }}
            key={item.id}
          >
            <Card.Body>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "5px" }}
              >
                <h5>Ref ID: {item.referenceId}</h5>
                <br />
                <h5>Name: {item.travallerName}</h5>
                <br />
                <h5>Date: {item.reservationDate}</h5>
                <br />
                <h5>Passengers: {item.noOfPassenger}</h5>
                <br />
                <Button
                  className="btn btn-blue"
                  onClick={() => handleChange(item)}
                >
                  Update
                </Button>
                <br />
                <Button
                  className="btn btn-red"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      <div style={{ marginBottom: "600px" }}></div>
    </div>
  );
};

export default BookingUserWiseView;
