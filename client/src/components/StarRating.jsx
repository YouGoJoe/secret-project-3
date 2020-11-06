import React, { useState } from "react";
import { Button } from "react-bootstrap";

const StarRating = ({ onClick }) => {
  const [ratingHover, setHoverRating] = useState(0);
  const [rating, setRating] = useState();

  const onButtonClick = (index) => {
    const rateValue = index + 1;
    if (rateValue === rating) {
      setRating(null);
    } else {
      setRating(rateValue);
    }
    onClick(rateValue);
  };

  return (
    <>
      {Array(5)
        .fill()
        .map((_, index) => (
          <Button
            key={index}
            variant="light"
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onButtonClick(index)}
          >
            <i
              className={`${
                (rating || ratingHover) > index ? "fas" : "far"
              } fa-star`}
            ></i>
          </Button>
        ))}
    </>
  );
};

export default StarRating;
