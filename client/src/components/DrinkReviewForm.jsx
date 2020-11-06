import React, { useRef, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import StarRating from "./StarRating";

const DrinkForm = () => {
  const [rating, setRating] = useState();
  const ref = useRef();
  const { pathname } = useLocation();
  const [, id] = pathname.split("/drink/");

  const setReview = (event) => {
    event.preventDefault();
    axios.post(`/api/reviews/drink/${id}/review`, {
      rating,
      comment: ref.current.value,
    });
  };

  return (
    <Form className="mt-2" onSubmit={setReview}>
      <Form.Row className="mt-2">
        <StarRating onClick={setRating} />
      </Form.Row>
      <Form.Row className="mt-2">
        <Form.Control
          ref={ref}
          as="textarea"
          rows={4}
          placeholder="Enter your review"
        />
      </Form.Row>
      <Form.Row className="mt-2">
        <Button onClick={setReview}>Submit Review</Button>
      </Form.Row>
    </Form>
  );
};

export default DrinkForm;
