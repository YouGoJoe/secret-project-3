import React, { useState, useEffect } from "react";
import { Row, Container, FormControl } from "react-bootstrap";
import axios from "axios";

import DrinkCard from "./DrinkCard";

const SearchPage = () => {
  const [drinks, setDrinks] = useState([]);
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    axios.get("/api/drinks").then(({ data }) => setDrinks(data));
  }, []);

  const filterFunc = (event) => {
    console.log(event.target.value);
    setFilterText(event.target.value);
  };

  const invariantMatch = (drink) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    drink.name.toLowerCase().includes(filterText.toLowerCase());

  return (
    <Container>
      <Row>
        <FormControl
          className="mt-4"
          placeholder="Search by name"
          onKeyUp={filterFunc}
        />
      </Row>
      <Row>
        {drinks.filter(invariantMatch).map((drink) => (
          <DrinkCard key={drink._id} {...drink} />
        ))}
      </Row>
    </Container>
  );
};

export default SearchPage;
