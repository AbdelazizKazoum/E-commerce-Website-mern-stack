import React from "react";

const Rating = ({ ratingVal, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            ratingVal >= 1
              ? "fa-sharp fa-solid fa-star"
              : ratingVal >= 0.5
              ? "fa-regular fa-star-half-stroke"
              : "fa-regular fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingVal >= 2
              ? "fa-sharp fa-solid fa-star"
              : ratingVal >= 1.5
              ? "fa-regular fa-star-half-stroke"
              : "fa-regular fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingVal >= 3
              ? "fa-sharp fa-solid fa-star"
              : ratingVal >= 2.5
              ? "fa-regular fa-star-half-stroke"
              : "fa-regular fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingVal >= 4
              ? "fa-sharp fa-solid fa-star"
              : ratingVal >= 3.5
              ? "fa-regular fa-star-half-stroke"
              : "fa-regular fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingVal >= 5
              ? "fa-sharp fa-solid fa-star"
              : ratingVal >= 4.5
              ? "fa-regular fa-star-half-stroke"
              : "fa-regular fa-star"
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "red",
};

export default Rating;
