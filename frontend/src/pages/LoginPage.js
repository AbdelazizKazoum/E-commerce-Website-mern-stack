import React, { useEffect, useState } from "react";
import { Col, Row, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginPage = () => {
  //setup all the hooks we need
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //email and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // get user info from state if exists
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const loginHandler = (e) => {
    e.preventDefault();

    // console.log(error);
    dispatch(login(email, password));
  };

  return (
    <Row className="my-4 ">
      <Col className="m-auto">
        {loading && <Loader dem="100px" />}
        <Form
          className="d-grid m-auto"
          style={{ width: "80%" }}
          onSubmit={loginHandler}
        >
          <h2 className="m-auto">Login</h2>

          <Form.Group className="mb-3 mt-5 " controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="my-3" variant="primary" type="submit">
            Submit
          </Button>
          {error && <Message variant="danger">{error}</Message>}
          <Form.Text className="">
            you dont't have account !
            <Link style={{ color: "blue !important" }} to="/register">
              Register now
            </Link>
          </Form.Text>
        </Form>
      </Col>
      <Col className="m-auto d-none d-md-block">
        <Image
          className="m-auto"
          style={{ width: "90%" }}
          src="images/loginPage.png"
          fluid
        />
      </Col>
    </Row>
  );
};

export default LoginPage;
