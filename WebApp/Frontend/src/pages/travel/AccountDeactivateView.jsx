import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./traveler.css";

//Traveler accounts activate
const AccountDeactivateView = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const getAccounts = () => {
    axios
      .get("http://localhost:5019/api/TravelerProfile?isActive=false")
      .then((response) => {
        const data = response.data;
        setAccounts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getAccounts();
  }, []);

  //Send data to backend
  const handleDelete = (itemId) => {
    let data = {
      AccStatus: true,
    };
    axios
      .put(`http://localhost:5019/api/TravelerProfile/${itemId}`, data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Activated.",
        }).then(() => {
          navigate(`/viewactivateacc`);
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

  return (
    <div
      style={{ marginTop: "150px" }}
      className="d-flex flex-column justify-content-center align-items-center background2"
    >
      <h3>All Deactivated Accounts</h3>
      <br />
      <Button className="btn btn-green" onClick={() => navigate(`/viewactivateacc`)}>
        View Activated Accounts
      </Button>
      <br />
      {accounts &&
        accounts.map((account) => (
          <Card 
            className="container" 
            style={{ height: "480px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)" }}
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
                <br />
                <Button
                  className="btn btn-warning btn-lg"
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px" }}
                  onClick={() => handleDelete(account.nic)}
                >
                  Actiavte Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default AccountDeactivateView;
