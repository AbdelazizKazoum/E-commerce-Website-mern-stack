import React, { useEffect, useState } from "react";
import { Col, Row, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterPage = () => {
  //setup all the hooks we need
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //email and password state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPass, setMatchPass] = useState("");
  const [message, setMessage] = useState("");

  // get user info from state if exists
  const { loading, error } = useSelector((state) => state.userRegister);
  const { userInfo } = useSelector((state) => state.userLogin);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const registerHandler = (e) => {
    e.preventDefault();

    if (password !== matchPass) {
      setMessage("password does not match !!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Row className="my-4 ">
      <Col className="m-auto d-none d-md-block">
        <Image
          className="m-auto"
          style={{ width: "90%" }}
          src="images/loginPage.png"
          fluid
        />
      </Col>
      <Col className="m-auto">
        {loading && <Loader dem="100px" />}
        <Form
          className="d-grid m-auto"
          style={{ width: "80%" }}
          onSubmit={registerHandler}
        >
          <h2 className="m-auto">Register</h2>

          <Form.Group className="mb-3 mt-5 " controlId="formBasicName">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="matchPassword">
            <Form.Label>Confirm password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={matchPass}
              onChange={(e) => setMatchPass(e.target.value)}
            />
          </Form.Group>

          <Button className="my-3" variant="primary" type="submit">
            Submit
          </Button>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <Form.Text className="">
            You have account !
            <Link style={{ color: "blue !important" }} to="/login">
              Login Now
            </Link>
          </Form.Text>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
