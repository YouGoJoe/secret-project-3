import React, { useRef } from "react";
import axios from "axios";
import { Col, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const DrinkTagForm = ({ onTagSet }) => {
  const ref = useRef();
  const { pathname } = useLocation();
  const [, id] = pathname.split("/drink/");
  const setTag = (event) => {
    event.preventDefault();
    const tag = ref.current.value.toLowerCase().split(" ").join("-");

    // optimistic update
    onTagSet(tag);
    axios.post(`/api/drinks/id/${id}/tag`, { tag });

    // clear the input
    ref.current.value = "";
  };

  return (
    <Form className="mt-2" onSubmit={setTag}>
      <Form.Row className="align-items-center">
        <Col>
          <Form.Control ref={ref} placeholder="fruity" />
        </Col>
        <Col>
          <Button onClick={setTag}>Tag</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default DrinkTagForm;
