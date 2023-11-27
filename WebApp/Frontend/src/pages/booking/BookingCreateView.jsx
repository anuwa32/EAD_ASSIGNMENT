import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import "./booking.css";

//Create Booking  page
const BookingCreateView = () => {
  const { id, nic } = useParams();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const initVal = {
    referenceId: nic,
    name: "",
    travallerProfile: id,
    mobile: "",
    train: "",
    noOfPassenger: 0,
    email: "",
    bookingDate: "",
    isCancelled: false,
  };

  const getBookings = () => {
    axios
      .get("http://localhost:5019/api/Train")
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
  const validations = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
                  .min(10,"Invalid mobile number")
                  .required("Number is required"),
    noOfPassenger: Yup.number().required("Number of passengers is required"),
    bookingDate: Yup.string().required("Date is required"),
    email: Yup.string().required("Email is required"),
    train: Yup.string().required("Train is required"),
  });

  const handleSubmit = async (values, { setSubmit }) => {
    try {
      const response = await axios.post(
        "http://localhost:5019/api/Reservation",
        values
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Booking created.",
        }).then(() => {
          navigate("/bookingHome");
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
      className="d-flex justify-content-center align-items-center background3"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <Card className="container" style={{ height: "600px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)", marginTop: "100px" }}> 
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="topic">Booking Management</h3>
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
                      <label htmlFor="fName" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Name</label>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="mobile" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Mobile No.</label>
                        <Field
                          type="text"
                          name="mobile"
                          id="mobile"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="noOfPassenger" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Passengers</label>
                        <Field
                          type="number"
                          name="noOfPassenger"
                          id="noOfPassenger"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="noOfPassenger"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                      <label htmlFor="noOfPassenger" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Select a Train</label>
                        <Field
                          as="select"
                          name="train"
                          id="train"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className="form-control"
                        >
                          {bookings &&
                            bookings.map((booking) => (
                              <option key={booking.id }  value={booking.id}>{booking.trainName}</option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="train"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                      <label htmlFor="bookingDate" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Date</label>
                        <Field
                          type="datetime-local"
                          name="bookingDate"
                          id="bookingDate"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="bookingDate"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="email" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Email Address</label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="email"
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

export default BookingCreateView;
