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
import "./traveler.css";

//Traveler account cration  page
const AccountCreateView = () => {
  const navigate = useNavigate();
  const initVal = {
    fName: "",
    lName: "",
    nic: "",
    mobile: "",
    password: "",
  };

  //Form validations
  const validations = Yup.object().shape({
    fName: Yup.string().required("First name is required"),
    lName: Yup.string().required("Last name is required"),
    nic: Yup.string()
      .min(10,"Invalid NIC")
      .required("NIC is required"),
    mobile: Yup.string()
      .min(10,"Invalid mobile number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  //Send data to backend
  const handleSubmit = async (values, { setSubmit }) => {
    let data = {
      Nic: values.nic,
      FirstName: values.fName,
      LastName: values.lName,
      PhoneNumber: values.mobile,
      AccStatus: true,
      UserInfo: {
        Password: values.password,
        Role: "traveler",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5019/api/TravelerProfile",
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account created.",
        }).then(() => {
          navigate("/userhome");
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
      className="d-flex justify-content-center align-items-center background2"
      style={{ minHeight: "100vh", backgroundColor: "#474545" }}
    >
      <Card className="container" style={{ height: "600px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)", marginTop: "100px" }}> 
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="topic">Travel Account</h2>
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
                      <label htmlFor="fName" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>First Name</label>
                        <Field
                          type="text"
                          name="fName"
                          id="fName"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="fName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="lName" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Last Name</label>
                        <Field
                          type="text"
                          name="lName"
                          id="lName"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="lName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="nic" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>NIC</label>
                        <Field
                          type="text"
                          name="nic"
                          id="nic"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="nic"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="mobile" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Mobile No.</label>
                        <Field
                          type="mobile"
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
                      <label htmlFor="password" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Password</label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
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

export default AccountCreateView;
