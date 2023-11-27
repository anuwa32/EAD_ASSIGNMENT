import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./LoginView.css";

//LoginView page
const LoginView = () => {
  const navigate = useNavigate();
  const initVal = {
    nic: "",
    password: "",
  };

  //LoginView check
  const handleSave = async (val, { setSubmit }) => {
    let data = {
      Nic: val.nic,
      Password: val.password,
    };

    axios
      .post("http://localhost:5019/LoginView", data)
      .then((res) => {
        localStorage.setItem("nic", res.data.nic);
        localStorage.setItem("role", res.data.role);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "LoginView successful.",
        });
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "LoginView failed.",
        });
      });
    setSubmit(false);
  };

  //validae data
  const validations = Yup.object().shape({
    nic: Yup.string()
      .min(10, "Inavalid NIC")
      .required("NIC is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  
  return (
    <div
      className="d-flex justify-content-center align-items-center background"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <Card className="shadow" style={{ height: "480px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)" }}> 
        <Card.Body>
          <Row>
            <Col className="fixed">
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="topic">SIGN IN</h2>
              </div>
              <Formik
                initialValues={initVal}
                validationSchema={validations}
                onSubmit={handleSave}
              >
                {({ isSubmit, isValid, dirty }) => (
                  <Form className="fm1">
                    <div className="form-group">
                    <label htmlFor="nic" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>NIC No.</label>
                      <Field
                        type="text"
                        name="nic"
                        id="nic"
                        style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                        className={`form-control ${dirty && isValid ? "is-valid" : ""}`}
                      />
                      <ErrorMessage
                        name="nic"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                    <label htmlFor="password" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                        className={`form-control ${dirty && isValid ? "is-valid" : ""}`}
                      />
                      <ErrorMessage
                        name="password"
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
                    <p className="mt-3" style={{ color: "#333", backgroundColor: "rgba(231, 231, 231, 0.9)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "250px" }}>
                      Doesn't Have an Account Yet?{" "}
                      <Link to="/reg" style={{ color: "rgba(255, 0, 0, 1)" }}>
                        Sign Up
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginView;
