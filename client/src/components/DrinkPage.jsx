import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Card,
  Col,
  Container,
  Row,
  Alert,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";

import DrinkIcon from "./DrinkIcon";

const DrinkPage = () => {
  const [drink, setDrink] = useState();
  const [error, setError] = useState();
  const { pathname } = useLocation();
  const ref = useRef();
  const [, id] = pathname.split("/drink/");

  useEffect(() => {
    axios
      .get(`/api/drinks/id/${id}`)
      .then(({ data }) => setDrink(data))
      .catch(() => setError("An error has occurred :("));
  }, []);

  const setTag = (event) => {
    event.preventDefault();
    const tag = ref.current.value.toLowerCase().split(" ").join("-");

    // optimistic update
    setDrink({ ...drink, tags: [...drink.tags, tag] });
    axios.post(`/api/drinks/id/${id}/tag`, { tag });

    // clear the input
    ref.current.value = "";
  };

  return (
    <Container>
      <Row>
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          {drink && (
            <div>
              <Card>
                <Card.Header style={{ textAlign: "center" }}>
                  <DrinkIcon type={drink.type} />
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle>{drink.name}</Card.Subtitle>
                  {drink.tags.map((tag, index) => (
                    <Badge className="mr-2" pill variant="info" key={index}>
                      #{tag}
                    </Badge>
                  ))}
                </Card.Body>
              </Card>
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
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DrinkPage;
