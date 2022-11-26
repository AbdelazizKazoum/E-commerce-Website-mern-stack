import React from "react";
import {
  Row,
  Col,
  Image,
  Container,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import productList from "../productsList";

const ProductPage = () => {
  const { id } = useParams();
  const productItem = productList.find((p) => p._id === id);

  console.log(productItem);
  return (
    <>
      <Container>
        <Row>
          <Col md={6} sm={12} lg={5}>
            <Image className="my-3" src={productItem.image} fluid />
          </Col>
          <Col className="mx-auto" md={6} sm={12} lg={5}>
            <h3 className="my-3"> {productItem.name} </h3>
            <h5 className="py-3" style={{ fontWeight: "bold" }}>
              {" "}
              {"$" + productItem.price}{" "}
            </h5>
            <Rating
              ratingVal={productItem.rating}
              text={" " + productItem.numReviews + "Reviews"}
            />
            <p className="py-3">{productItem.description}</p>
            <Card>
              <ListGroup>
                <Row>
                  <Col className="m-3">Status :</Col>
                  <Col className="my-3">
                    {productItem.countInStock > 0 ? "in stock" : "out of stock"}
                  </Col>
                </Row>
              </ListGroup>
            </Card>
            <Button
              disabled={productItem.countInStock <= 0}
              className=" my-4"
              type="button"
            >
              ADD TO CART
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
