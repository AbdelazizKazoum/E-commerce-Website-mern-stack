import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Progress = ({ step1, step2, step3, step4 }) => {
  useEffect(() => {
    console.log(step3);
  }, []);
  return (
    <div className="shipping">
      <Nav
        className="justify-content-center mb-4"
        activeKey="link-4"
        variant="tabs"
      >
        <Nav.Item>
          {step1 ? (
            <Nav.Link style={{ width: "100px" }} disabled>
              Signin
            </Nav.Link>
          ) : (
            <Nav.Link style={{ width: "100px" }} eventKey="disabled" disabled>
              Signin
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer
              style={{ width: "100px" }}
              eventKey="link-2"
              to="/shipping"
            >
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link style={{ width: "100px" }} eventKey="disabled" disabled>
              Shipping
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer
              style={{ width: "100px" }}
              eventKey="link-3"
              to="/payment"
            >
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link style={{ width: "100px" }} eventKey="disabled" disabled>
              Paymenet
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer
              style={{ width: "150px" }}
              eventKey="link-4"
              to="/placeorder"
            >
              <Nav.Link>Place order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link style={{ width: "150px" }} eventKey="disabled" disabled>
              Place order
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Progress;
