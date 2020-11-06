import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";

import { UserContext } from "../App";
import StarRating from "./StarRating";

const DrinkForm = ({ review }) => {
  const [rating, setRating] = useState();
  const ref = useRef();
  const { pathname } = useLocation();
  const history = useHistory();
  const [, id] = pathname.split("/drink/");
  const { setUser, user } = useContext(UserContext);

  const setReview = (event) => {
    event.preventDefault();
    axios
      .post(`/api/reviews/drink/${id}/review`, {
        rating,
        comment: ref.current.value,
      })
      .then(({ data }) => {
        setUser({ ...user, reviews: [...user.reviews, data] });
        history.push("/browse");
      });
  };

  return (
    <Form className="mt-2" onSubmit={setReview}>
      <Form.Row className="mt-2">
        <StarRating rating={review && review.rating} onClick={setRating} />
      </Form.Row>
      <Form.Row className="mt-2">
        <Form.Control
          ref={ref}
          as="textarea"
          rows={4}
          placeholder="Enter your review"
          defaultValue={review && review.comment}
        />
      </Form.Row>
      <Form.Row className="mt-2">
        <Button onClick={setReview}>Submit Review</Button>
      </Form.Row>
    </Form>
  );
};

export default DrinkForm;
