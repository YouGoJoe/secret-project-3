import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import axios from "axios";

import DrinkCard from "./DrinkCard";

const SearchPage = () => {
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    axios.get("/api/drinks").then(({ data }) => setDrinks(data));
  }, []);

  return (
    <Container>
      <Row>
        {drinks.map((drink) => (
          <DrinkCard key={drink._id} {...drink} />
        ))}
      </Row>
    </Container>
  );
};

export default SearchPage;
