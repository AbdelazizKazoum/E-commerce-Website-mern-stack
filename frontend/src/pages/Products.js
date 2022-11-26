import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/ProductItem";
import productsList from "../productsList";

const Products = () => {
  return (
    <>
      <h2>Latest Products</h2>
      <Row>
        {productsList.map((item, key) => (
          <Col sm={12} md={6} lg={4} xl={3} key={key}>
            <Product productItem={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;
