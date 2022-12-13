import {
  Row,
  Col,
  Image,
  Container,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductDetails = () => {
  const { id } = useParams();
  const [qte, setQte] = useState(1);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qte}`);
  };

  return (
    <>
      <Container>
        {loading ? (
          <Loader dem="200px" />
        ) : error ? (
          <Message variant="danger">{Message}</Message>
        ) : (
          <Row>
            <Col md={6} sm={12} lg={5}>
              <Image className="my-3" src={product.image} fluid />
            </Col>
            <Col className="mx-auto" md={6} sm={12} lg={5}>
              <h3 className="my-3"> {product.name} </h3>
              <h5 className="py-3" style={{ fontWeight: "bold" }}>
                {" "}
                {"$" + product.price}{" "}
              </h5>
              <Rating
                ratingVal={product.rating}
                text={" " + product.numReviews + "Reviews"}
              />
              <p className="py-3">{product.description}</p>
              <Card>
                <ListGroup>
                  <Row>
                    <Col className="m-3">Status :</Col>
                    <Col className="my-3">
                      {product.countInsStock > 0 ? "in stock" : "out of stock"}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="m-3"> Qte : </Col>
                    <Col className="m-3">
                      {" "}
                      <Form.Control
                        type="number"
                        className="m-auto"
                        max={product.countInsStock}
                        min="0"
                        onChange={(e) =>
                          e.target.value > product.countInsStock
                            ? setQte(product.countInsStock)
                            : setQte(e.target.value)
                        }
                        value={qte}
                      />
                    </Col>
                  </Row>
                </ListGroup>
              </Card>
              <Button
                disabled={product.countInStock <= 0}
                className=" my-4"
                type="button"
                onClick={addToCartHandler}
              >
                ADD TO CART
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductDetails;
