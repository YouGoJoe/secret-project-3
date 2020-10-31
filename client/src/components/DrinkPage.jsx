import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import DrinkIcon from "./DrinkIcon";

const DrinkPage = () => {
  const [drink, setDrink] = useState();
  const [error, setError] = useState();
  const { pathname } = useLocation();

  useEffect(() => {
    const [, id] = pathname.split("/drink/");

    axios
      .get(`/api/drinks/id/${id}`)
      .then(({ data }) => setDrink(data))
      .catch(() => setError("An error has occurred :("));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          {drink && (
            <Card>
              <Card.Header style={{ textAlign: "center" }}>
                <DrinkIcon type={drink.type} />
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>{drink.name}</Card.Subtitle>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DrinkPage;
