import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "./train.css";

//view trains
const TrainsView = () => {
  const [trains, setTrain] = useState([]);
  const navigate = useNavigate();

  //get train data
  const getTrains = () => {
    axios
      .get("http://localhost:5019/api/Train")
      .then((response) => {
        const trainData = response.data;
        setTrain(trainData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    localStorage.removeItem("trains");
    getTrains();
  }, []);

  //delele train schedules
  const handleDelete = (trainNo) => {
    axios
      .delete(`http://localhost:5019/api/TravelerProfile/${trainNo}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Train Deleted.",
        }).then(() => {
          getTrains();
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

  //update train schedules
  const handleChange = (trainData) => {
    try {
      const arrayString = JSON.stringify(trainData);
      localStorage.setItem("trains", arrayString);
    } catch (e) {
    } finally {
      navigate("/trainupdate");
    }
  };

  return (
    <div
    className="d-flex flex-column justify-content-center align-items-center background1"
    style={{ marginTop: "50px" }}
    >
      <h2>All Active Trains</h2>
      <br />
      {trains &&
        trains.map((train) => (
          <Card
            className="container"
            style={{ height: "1000px", width: "1000px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)", marginBottom: "20px" }}
            key={train.id}
          >
            <Card.Body>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ marginBottom: "100px", marginTop: "400px" }}
              >
                <h5>Train Name: {train.trainName}</h5>
                <br />
                <h5>Compartment: {train.numberOfComponents}</h5>
                <br />
                <h5>Start: {train.scheduleList[0].startStationName}</h5>
                <br />
                <h5>End: {train.scheduleList[0].endStationName}</h5>
                <br />
                <h5>Time: {train.scheduleList[0].starttime}</h5>
                <br />
                <Button
                  className="btn btn-primary btn-lg" 
                  onClick={() => handleChange(train)}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                >
                  Update Schedule
                </Button>
                <br />
                <Button
                  className="btn btn-danger btn-lg" 
                  onClick={() => handleDelete(train.id)}
                  style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px", width: "300px"}}
                >
                  Delete Schedule
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default TrainsView;
