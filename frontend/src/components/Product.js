import React from "react";
import { Card, CardImg } from "react-bootstrap";

const Product = ({ productItem }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${productItem.id}`}>
        <Card.Img src={productItem.image} />
      </a>
      <Card.Body>
        <a>
          <Card.Title>
            <strong className="">{productItem.name}</strong>
          </Card.Title>
        </a>
        <Card.Text>
          {
            <div className="my-3">
              {productItem.rating} frmo {productItem.numReviews}
            </div>
          }
        </Card.Text>
        <Card.Text as="h3">{productItem.price}$</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
