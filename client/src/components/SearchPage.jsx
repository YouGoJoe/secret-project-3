import React, { useState, useEffect, useContext } from "react";
import { Row, Container, FormControl } from "react-bootstrap";
import axios from "axios";

import { UserContext } from "../App";
import DrinkCard from "./DrinkCard";

const SearchPage = () => {
  const [drinks, setDrinks] = useState([]);
  const [filterText, setFilterText] = useState("");
  const { user } = useContext(UserContext);
  const reviews = user.reviews.map(({ drink }) => drink);

  useEffect(() => {
    axios.get("/api/drinks").then(({ data }) => setDrinks(data));
  }, []);

  const filterFunc = (event) => {
    setFilterText(event.target.value);
  };

  const invariantMatch = (drink) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    drink.name.toLowerCase().includes(filterText.toLowerCase());

  const reviewedDrinks = drinks.filter((drink) => reviews.includes(drink._id));
  const unreviewedDrinks = drinks.filter(
    (drink) => !reviews.includes(drink._id)
  );

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
        {[...reviewedDrinks, ...unreviewedDrinks]
          .filter(invariantMatch)
          .map((drink) => (
            <DrinkCard
              key={drink._id}
              star={reviews.includes(drink._id)}
              {...drink}
            />
          ))}
      </Row>
    </Container>
  );
};

export default SearchPage;
