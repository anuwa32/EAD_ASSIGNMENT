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
import "./traveler.css";

//Traveler account update  page
const AccountUpdateView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initVal, setInitVal] = useState();

  //get data need to be updated
  useEffect(() => {
    axios
      .get("http://localhost:5019/api/TravelerProfile/" + id)
      .then((response) => {
        const responseData = response.data;
        const data = {
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          mobile: responseData.phoneNumber,
          id: responseData.id,
          nic: responseData.nic,
          accStatus: responseData.accStatus,
          createdDate: responseData.createdDate,
        };
        setInitVal(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //form validations
  const validations = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    mobile: Yup.string()
                .min(10, "Invalid mobile number")
                .required("Mobile number is required"),
  });

  //send updated data to bckend
  const handleSubmit = async (values, { setSubmit }) => {
    let data = {
      id: values.id,
      nic: values.nic,
      firstName: values.firstName,
      lastName: values.lastName,
      PhoneNumber: values.mobile,
      accStatus: values.accStatus,
      createdDate: values.createdDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:5019/api/TravelerProfile/",
        data
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account Updated.",
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
      <Card className="container" style={{ height: "480px", width: "800px", backgroundColor: "rgba(231, 231, 231, 0.7)", borderRadius: "15px", boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7)" }}> 
        <Card.Body>
          <Row>
            <Col className="fixed ">
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="topic">Traveler Account Update</h2>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={initVal}
                validationSchema={validations}
                onSubmit={handleSubmit}
              >
                {({ isSubmit, isValid, dirty }) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <Form>
                      <div className="form-group">
                      <label htmlFor="firstName" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>First Name</label>
                        <Field
                          type="text"
                          name="firstName"
                          id="firstName"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                      <label htmlFor="lastName" style={{ fontWeight: "bold", color: "#333", backgroundColor: "rgba(231, 231, 231, 0.7)", paddingLeft: "5px", paddingRight: "5px", borderRadius: "10px", width: "100px" }}>Last Name</label>
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          style={{ width: "600px", borderColor: "#ccc", backgroundColor: "#f0eded" }}
                          className={`form-control ${
                            dirty && isValid ? "is-valid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="lastName"
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

export default AccountUpdateView;
