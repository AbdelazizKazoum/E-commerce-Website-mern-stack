import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ productItem }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${productItem._id}`}>
        <Card.Img src={productItem.image} />
      </Link>
      <Card.Body>
        <Link to={`/Products/${productItem._id}`}>
          <Card.Title>
            <strong className="">{productItem.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>
          {
            <div className="my-3">
              <Rating
                ratingVal={productItem.rating}
                text={" " + productItem.rating + " Reviews"}
              />
            </div>
          }
        </Card.Text>
        <Card.Text as="h3">{productItem.price}$</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
