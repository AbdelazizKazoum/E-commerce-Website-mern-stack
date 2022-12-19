import React, { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const { updateError, success, /*loadingUpdate*/ } = useSelector(
    (state) => state.userUpdate
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    if (!userInfo) {
      navigate("/register");
    } else {
      if (loading === false && user !== undefined) {
        setName(user.name);
        setEmail(user.email);
      } else {
        dispatch(getUserDetails(userInfo.token));
      }
    }
  }, [userInfo, navigate, dispatch, user, loading, updateError]);

  const updateHandler = (e) => {
    e.preventDefault();

    if (password === newPassword) {
      dispatch(updateUser(userInfo.token, { name, email, password }));
    } else {
      setMessage({
        variant: "danger",
        message: "password doesn't match !",
      });
    }
  };

  return (
    <div className="profile">
      {loading ? (
        <Loader dem="100px" b />
      ) : (
        <Form
          onSubmit={updateHandler}
          className="m-auto d-flex column align-items-center p-4 my-4"
          style={{
            maxWidth: "500px",
            flexDirection: "column",
            //   textAlign: "center",
            backgroundColor: "white",
            boxShadow: "2px 5px 19px #e2dfdf",
          }}
        >
          <Image
            src="https://wac-cdn.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=682"
            alt="user"
            fluid
            roundedCircle
            width="40%"
            className="my-3"
          />
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : message ? (
            <Message variant={message.variant}>{message.message}</Message>
          ) : updateError ? (
            <Message variant="danger">{updateError}</Message>
          ) : (
            ""
          )}
          {success && <Message variant="success">Updated successfuly</Message>}
          <Form.Group
            style={{ width: "100%" }}
            className="mb-3"
            controlId="formBasicName"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            style={{ width: "100%" }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group
                style={{ width: "100%" }}
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                style={{ width: "100%" }}
                controlId="formBasicNewPass"
              >
                <Form.Label>New password</Form.Label>
                <Form.Control
                  name="newPassword"
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group style={{ width: "100%" }} className="d-grid gap-2 mt-3">
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
            <Button variant="danger" type="submit">
              Go back
            </Button>
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default UserDetailsPage;
