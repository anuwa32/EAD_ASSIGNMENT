import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./booking.css";

//VIEW Travelers
const BookingUsersView = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const getBookings = () => {
    axios
      .get("http://localhost:5019/api/TravelerProfile?isActive=true")
      .then((response) => {
        const data = response.data;
        setAccounts(data);
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
    style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    className="d-flex flex-column justify-content-center align-items-center background3"
    >
      <h3>Travelers</h3>
      <br />
      {accounts &&
        accounts.map((account) => (
          <Card
            className="shadow"
            style={{ height: "600px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)", marginTop: "100px" }}
            key={account.id}
          >
            <Card.Body>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "5px" }}
              >
                <h5>First Name: {account.firstName}</h5>
                <br />
                <h5>Last Name: {account.lastName}</h5>
                <br />
                <h5>NIC: {account.nic}</h5>
                <br />
                <Button
                  className="btn btn-success btn-lg" 
                  onClick={() => navigate(`/bookingadd/${account.id}/${account.nic}`)}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px" }}
                >
                  Create Booking
                </Button>
                <br />
                <Button
                  className="btn btn-success btn-lg" 
                  onClick={() => navigate(`/bookingview/${account.nic}`)}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px" }}
                >
                  View Bookings
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default BookingUsersView;
