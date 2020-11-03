import React from "react";

const typesToFA = {
  tea: "mug-hot",
  coffee: "coffee",
  beer: "beer",
  wine: "wine-bottle",
};

const DrinkIcon = ({ type }) => (
  <i className={`fa fa-${typesToFA[type]}`} style={{ fontSize: "48px" }}></i>
);

export default DrinkIcon;
