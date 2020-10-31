import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col } from "react-bootstrap";

import DrinkIcon from "./DrinkIcon";

const DrinkCard = ({ _id, name, type }) => (
  <Col className="mt-4" sm="4" md="3" lg="2">
    <Card>
      <Card.Header style={{ textAlign: "center" }}>
        <DrinkIcon type={type} />
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>{name}</Card.Subtitle>
        <Button variant="primary">
          <Link style={{ color: "white" }} to={`/drink/${_id}`}>
            Rate
          </Link>
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

export default DrinkCard;
