import React from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const qte = location.search ? location.search.split("=")[1] : 1;

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qte, useStore));
    }
  }, [dispatch, id, qte]);

  const onDeleteHandler = (id, useStore) => {
    console.log("hello iam ecceted");
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Shoping cart : </h2>
        {cartItems.length === 0 ? (
          <Message variant="danger">Cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2} className="p-1">
                    <Image
                      src={item.image}
                      alt={item.product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={4} className="p-1">
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2} className="p-1">
                    {" "}
                    <Form.Control
                      type="number"
                      className="m-auto"
                      max={item.countInsStock}
                      min="0"
                      value={item.qte}
                      onChange={(e) => {
                        dispatch(addToCart(item.product, e.target.value));
                        item.qte = e.target.value;
                      }}
                    />
                  </Col>
                  <Col md={2} className="p-1">
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => onDeleteHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal{" "}
                {cartItems.reduce((acc, item) => acc + Number(item.qte), 0)}{" "}
                items
              </h3>
              $
              {cartItems
                .reduce(
                  (acc, item) => acc + Number(item.qte) * Number(item.price),
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="d-grid">
              <Button
                type="button"
                variant="primary"
                className="block p-2 "
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Procced to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartPage;
