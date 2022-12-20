import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { savePayment } from "../actions/cartActions";
import Progress from "../components/Progress";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("PayPal");

  const { paymentMethode } = useSelector((state) => state.cart);
  const { shipping } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shipping) {
      if (paymentMethode) {
      } else {
        console.log("no payment methode");
      }
    } else {
      navigate("/shipping");
    }
  }, [shipping, paymentMethode, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(savePayment(payment));
      navigate("/placeorder");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shipping">
      <Progress step1 step2 step3 step4></Progress>
      <h2 className="text-center m-3 mb-4">Payment methode</h2>
      <Form
        className="m-4 m-auto"
        style={{ maxWidth: "500px" }}
        onSubmit={submitHandler}
      >
        <Form.Group>
          <Form.Label as="legend">Select methode</Form.Label>
          <Form.Check
            name="paymentMethode"
            value="PayPal"
            id="paypal"
            label="Paypal or credit card"
            type="radio"
            checked
            onChange={(e) => setPayment(e.target.value)}
          ></Form.Check>

          <Form.Check
            name="paymentMethode"
            value="Strip"
            id="strip"
            label="Strip"
            type="radio"
            onChange={(e) => setPayment(e.target.value)}
          ></Form.Check>
        </Form.Group>
        <Button
          type="submit"
          className="my-3"
          style={{ float: "right", width: "200px", height: "45px" }}
        >
          CONTINUE
        </Button>
      </Form>
    </div>
  );
};

export default PlaceOrderPage;
