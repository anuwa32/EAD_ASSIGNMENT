import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./traveler.css";

//Navigation for Traveler account creation
const AccountsHomeView = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  let statusComp;

  //show activate button
  if (role == "officer") {
    statusComp = (
      <Button 
        className="btn btn-success btn-lg"
        onClick={() => navigate("/viewactivateacc")}
        style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
      >
        Account Status
      </Button>
    );
  } else {
    statusComp = <div></div>;
  }
  
  return (
    <div
      className="d-flex justify-content-center align-items-center background2"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <Card className="container" style={{ height: "480px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)" }}> 
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="topic">Traveler Account Management</h3>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center" style={{marginTop:"40px"}}>
                <Button 
                  className="btn btn-success btn-lg" 
                  onClick={() => navigate("/useracc")}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                >
                  Create Account</Button>
                <br/>
                <Button 
                  className="btn btn-success btn-lg" 
                  onClick={() => navigate("/accview")}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                >
                  View Accounts 
                </Button>
                <br />
                {statusComp}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AccountsHomeView;
