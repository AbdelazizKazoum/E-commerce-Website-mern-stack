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
import { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProducts();
  }, [id]);

  console.log(product);
  return (
    <>
      <Container>
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
                    {product.countInStock > 0 ? "in stock" : "out of stock"}
                  </Col>
                </Row>
              </ListGroup>
            </Card>
            <Button
              disabled={product.countInStock <= 0}
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
