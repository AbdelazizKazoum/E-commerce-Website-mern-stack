import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import Progress from "../components/Progress";
import Messsage from "../components/Message";
import Loader from "../components/Loader";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shipping, cartItems, paymentMethode } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.userLogin.userInfo);

  const { loading, success, error, createdOrder } = useSelector(
    (state) => state.orderItems
  );

  useEffect(() => {
    if (success) {
      navigate("orderDetails");

      return;
    } else {
      if (shipping) {
        if (paymentMethode) {
        } else {
          navigate("/payment");
        }
      } else {
        navigate("/shipping");
      }
    }
  }, [shipping, paymentMethode, navigate, success, createdOrder]);

  const itemsPrice = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.qte * Number(item.price),
      0
    );
  };
  const itemsTax = () => {
    return Number(itemsPrice() * 0.15).toFixed(2);
  };
  const shippingPrice = () => {
    return Number(itemsPrice() > 100 ? 0 : 100);
  };
  const total = () => {
    return Number(itemsPrice() + shippingPrice() + Number(itemsTax())).toFixed(
      2
    );
  };

  const createOrderHandler = () => {
    const order = {
      shippingAddress: shipping,
      orderItems: cartItems,
      paymentMethode,
      shippingPrice: shippingPrice(),
      taxPrice: itemsTax(),
      itemsPrice: itemsPrice(),
      totalPrice: total(),
    };

    dispatch(createOrder(order, token));
  };
  return (
    <div className="shipping">
      <Progress step1 step2 step3 step4></Progress>
      <Row>
        <Col>
          <ListGroup className="" variant="flush">
            <ListGroup.Item className="p-3 d-grid">
              <h3>Shipping</h3>
              {shipping.adress}, {shipping.city}, {shipping.codePostal}
            </ListGroup.Item>
            <ListGroup.Item className="p-3 d-grid">
              <h3>Payment Methode</h3>
              methode : {paymentMethode}
            </ListGroup.Item>
            <ListGroup.Item className="p-3 d-grid">
              <h3>Order Items</h3>
              <ListGroup className="p-3 d-grid">
                {cartItems.map((item, key) => (
                  <ListGroup.Item key={key} className="p-3 d-grid">
                    <Row>
                      <Col xs={3} sm={2} className="p-2">
                        <Image src={item.image} alt={item.name} fluid rounded />
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
                    {itemsPrice()}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col> Shipping</Col>
                  <Col>{"$" + shippingPrice()}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col> Tax</Col>
                  <Col>{"$" + itemsTax()} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col>Total</Col>
                  <Col>{"$" + total()} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3 d-grid">
                {loading && <Loader d="100" />}
                {error && <Messsage variant="danger">{error}</Messsage>}
                <Button className="btn-block" onClick={createOrderHandler}>
                  PLACE ORDER
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
