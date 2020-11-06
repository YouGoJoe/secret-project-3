import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Alert, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import DrinkIcon from "./DrinkIcon";
import DrinkTagForm from "./DrinkTagForm";
import DrinkReviewForm from "./DrinkReviewForm";

const DrinkPage = () => {
  const [drink, setDrink] = useState();
  const [error, setError] = useState();
  const { pathname } = useLocation();
  const [, id] = pathname.split("/drink/");

  useEffect(() => {
    axios
      .get(`/api/drinks/id/${id}`)
      .then(({ data }) => setDrink(data))
      .catch(() => setError("An error has occurred :("));
  }, []);

  const onTagSet = (tag) => setDrink({ ...drink, tags: [...drink.tags, tag] });

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
              <DrinkTagForm onTagSet={onTagSet} />
              <DrinkReviewForm />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DrinkPage;
