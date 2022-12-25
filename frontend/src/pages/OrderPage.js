import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Messsage from "../components/Message";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { orderDetails } from "../actions/orderAction";

const OrderPage = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const { token } = useSelector((state) => state.userLogin.userInfo);

  useEffect(() => {
    if (!order) {
      dispatch(orderDetails(id, token));
    }
  }, [order, dispatch, id, token]);

  const createOrderHandler = () => {};

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
                {order.isPaid ? (
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
                <ListGroup.Item className="p-3 d-grid">
                  <Button className="btn-block" onClick={createOrderHandler}>
                    PLACE ORDER
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderPage;
