import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./train.css";

//Create Train   schedules  page
const TrainCreateView = () => {
  const navigate = useNavigate();
  const initVal = {
    trainId: "",
    trainName: "",
    numOfComps: "",
    starttime: "",
    day: "",
    startStation: "",
    endStation: "",
  };

  //form validations
  const validations = Yup.object().shape({
    trainId: Yup.string().required("Train Id is required"),
    trainName: Yup.string().required("Train Name is required"),
    numOfComps: Yup.number().required("Number of components is required"),
    starttime: Yup.string().required("Time is required"),
    day: Yup.string().required("Day is required"),
    startStation: Yup.string().required("Start Station is required"),
    endStation: Yup.string().required("End Station is required"),
  });

  //save schedules
  const handleSubmit = async (values, { setSubmit }) => {
    let data = {
      trainId: values.trainId,
      trainName: values.trainName,
      numberOfComponents: values.numOfComps,
      isCancelled: false,
      isActive: true,
      scheduleList: [
        {
            starttime:values.starttime,
            day: values.day,
            startStationName:values.startStation,
            endStationName:values.endStation
        }
    ]
    };

    try {
      const response = await axios.post(
        "http://localhost:5019/api/Train",
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Schedule Created.",
        }).then(() => {
          navigate("/trainhome");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed.",
      });
    }
    setSubmit(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center background1"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <Card className="container" style={{ height: "800px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)", marginTop: "100px" }}> 
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="topic">Create Schedule</h2>
              </div>
              <Formik
                initialValues={initVal}
                validationSchema={validations}
                onSubmit={handleSubmit}
              >
                {({ isSubmit, isValid, dirty }) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <Form>
                      <div className="form-group">
                      <label htmlFor="trainId" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "150px" }}>Train ID</label>
                        <Field
                          type="text"
                          name="trainId"
                          id="trainId"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="trainId"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="trainName" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "150px" }}>Train Name</label>
                        <Field
                          type="text"
                          name="trainName"
                          id="trainName"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="trainName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="numOfComps" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "150px" }}>Components</label>
                        <Field
                          type="number"
                          name="numOfComps"
                          id="numOfComps"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="numOfComps"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                      <label htmlFor="day" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "150px" }}>Day</label>
                        <Field
                          as="select"
                          name="day"
                          id="day"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className="form-control"
                        >
                          <option value="">Select a day</option>
                          <option value="Sunday">Sunday</option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                        </Field>
                        <ErrorMessage
                          name="day"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                      <label htmlFor="starttime" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "150px" }}>Start Time</label>
                        <Field
                          type="datetime-local"
                          name="starttime"
                          id="starttime"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="starttime"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="startStation" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "150px" }}>Starting Station</label>
                        <Field
                          type="text"
                          name="startStation"
                          id="startStation"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="startStation"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                      <label htmlFor="endStation" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "150px" }}>Ending Station</label>
                        <Field
                          type="text"
                          name="endStation"
                          id="endStation"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="endStation"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <Button
                          type="submit"
                          className="btn btn-success btn-lg"
                          disabled={isSubmit}
                          style={{ fontWeight: "bold", boxShadow: "1px 1px 50px rgba(231, 231, 231, 0.9)", borderRadius: "5px", padding: "10px 20px", fontSize: "18px" }}
                        >
                          {isSubmit ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                      <br />
                    </Form>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TrainCreateView;
