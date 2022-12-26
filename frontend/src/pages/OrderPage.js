import React, { useEffect, useState } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Messsage from "../components/Message";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { orderDetails, orderPayAction } from "../actions/orderAction";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstant";

const OrderPage = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { token } = useSelector((state) => state.userLogin.userInfo);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = useSelector((state) => state.orderPay);

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(orderDetails(id, token));
    } else if (!window.paypal) {
      addPaypalScript();
      console.log("script added ");
    } else {
      setSdkReady(true);
    }
  }, [order, dispatch, id, token, successPay]);

  const paymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(orderPayAction(id, token, paymentResult));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <ListGroup className="" variant="flush">
              <ListGroup.Item className="p-3 d-grid">
                <h3>Shipping</h3>
                {order.shippingAddress.adress}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.codePostal}
                {order.isDelivered ? (
                  <Message variant="success">Delivered Succefuly</Message>
                ) : (
                  <Message variant="danger">Not delivered yet</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="p-3 d-grid">
                <h3>Payment Methode</h3>
                methode : {order.paymentMethod}
                {order.isPaid ? (
                  <Message variant="success">Paid Succefuly</Message>
                ) : (
                  <Message variant="danger">Not paid yet</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="p-3 d-grid">
                <h3>Order Items</h3>
                <ListGroup className="p-3 d-grid">
                  {order.orderItems.map((item, key) => (
                    <ListGroup.Item key={key} className="p-3 d-grid">
                      <Row>
                        <Col xs={3} sm={2} className="p-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col sm={4} className="p-2">
                          {item.name}
                        </Col>
                        <Col className="p-2">
                          {item.qte} X {Number(item.price)} ={" $"}
                          {item.qte * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item className="p-3">
                  <h2>Order summary</h2>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col> Items</Col>
                    <Col>
                      {" $"}
                      {order.itemsPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col> Shipping</Col>
                    <Col>{"$" + order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col> Tax</Col>
                    <Col>{"$" + order.taxPrice} </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>Total</Col>
                    <Col>{"$" + order.totalPrice} </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item className="p-3 d-grid">
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={paymentHandler}
                      ></PayPalButton>
                    )}
                    {errorPay && <Message variant="danger">{errorPay}</Message>}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderPage;
