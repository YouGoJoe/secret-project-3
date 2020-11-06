import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col } from "react-bootstrap";

import DrinkIcon from "./DrinkIcon";

const DrinkCard = ({ _id, name, type, star }) => (
  <Col className="mt-4" sm="4" md="3" lg="2">
    <Card>
      {star && (
        <i
          className="fas fa-star"
          style={{
            position: "absolute",
            right: 0,
            marginRight: "4px",
            marginTop: "4px",
            color: "fuchsia",
          }}
        ></i>
      )}
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
