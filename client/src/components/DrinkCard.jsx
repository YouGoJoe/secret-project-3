import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col, Badge } from "react-bootstrap";

import DrinkIcon from "./DrinkIcon";

const DrinkCard = ({ _id, name, type, star, tags }) => (
  <Col className="mt-4" sm="4" md="3" lg="3">
    <Card style={{ height: "100%" }}>
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
        {tags.map((tag, index) => (
          <Badge className="mr-2" pill variant="info" key={index}>
            #{tag}
          </Badge>
        ))}
      </Card.Body>
      <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="primary">
          <Link style={{ color: "white" }} to={`/drink/${_id}`}>
            Rate
          </Link>
        </Button>
      </Card.Footer>
    </Card>
  </Col>
);

export default DrinkCard;
