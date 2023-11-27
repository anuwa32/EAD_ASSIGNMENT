import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "./traveler.css";

//view traveler accounts
const AccountsView = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const getAccounts = () => {
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
    getAccounts();
  }, []);
  
  //delete accounts
  const handleDelete = (accountID) => {
    axios
      .delete(`http://localhost:5019/api/TravelerProfile/${accountID}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account Deleted.",
        }).then(() => {
          getAccounts();
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
      className="d-flex flex-column justify-content-center align-items-center background2"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <h2>All Accounts</h2>
      <br />
      {accounts &&
        accounts.map((account) => (
          <Card
            className="container"
            style={{ height: "1000px", width: "1000px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)", marginTop: "200px" }}
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
                  className="btn btn-primary btn-lg" 
                  onClick={() => navigate(`/userupdate/${account.nic}`)}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                >
                  Update Account
                </Button>
                <br />
                <Button
                  className="btn btn-danger btn-lg" 
                  onClick={() => handleDelete(account.id)}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                >
                  Delete Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default AccountsView;
