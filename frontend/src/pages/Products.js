import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/ProductItem";
import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };
    fetchData();
  });
  return (
    <>
      <h2>Latest Products</h2>
      <Row>
        {products.map((item, key) => (
          <Col sm={12} md={6} lg={4} xl={3} key={key}>
            <Product productItem={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;
