import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./train.css";

const TrainHomeView = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center background1"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <Card className="container" style={{ height: "400px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)" }}> 
        <Card.Body>
          <Row>
            <Col className="fixed">
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="topic">Train Schedules Management</h2>
              </div>

              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginTop: "40px" }}
              >
                <Button
                  className="btn btn-success btn-lg"
                  onClick={() => navigate("/trainadd")}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                  >
                  Create Schedules
                </Button>
                <br />
                <Button
                  className="btn btn-success btn-lg"
                  onClick={() => navigate("/trainview")}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                >
                  View Schedules
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TrainHomeView;
