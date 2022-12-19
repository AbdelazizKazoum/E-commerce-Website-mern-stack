import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShipping } from "../actions/cartActions";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [country, setCountry] = useState("");

  const { shipping } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shipping) {
      console.log("hereeeeeeeeeeee");
      setAdress(shipping.adress);
      setCity(shipping.city);
      setCodePostal(shipping.codePostal);
      setCountry(shipping.country);
    } else {
      console.log(shipping);
    }
  }, [shipping]);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const shipping = {
        adress,
        city,
        codePostal,
        country,
      };
      navigate("/payment");

      dispatch(saveShipping(shipping));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shipping">
      <Form
        className="m-4 m-auto"
        style={{ maxWidth: "500px" }}
        onSubmit={submitHandler}
      >
        <h3 className="mb-4">SHIPPING</h3>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="adress">Adress</Form.Label>
          <Form.Control
            name="adress"
            placeholder="enter adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="city">City</Form.Label>
          <Form.Control
            name="city"
            placeholder="enter city  "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="postal">Postal code</Form.Label>
          <Form.Control
            name="codePostal"
            placeholder="enter postal code  "
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="country">Country</Form.Label>
          <Form.Control
            name="country"
            placeholder="enter country "
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
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

export default ShippingPage;
