import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/ProductItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h3>Latest Products</h3>
      {loading ? (
        <Loader dem="200px" />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((item, key) => (
            <Col sm={12} md={6} lg={4} xl={3} key={key}>
              <Product productItem={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Products;
