const mongoose = require("mongoose");
const db = require("../models");
const teas = require("./teas.json");
const coffees = require("./coffees.json");
const keys = require("../config/keys");

mongoose.connect(keys.MongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const allDrinks = [
  ...teas.map((tea) => ({ name: tea, type: "tea", tags: [] })),
  ...coffees.map((coffee) => ({ name: coffee, type: "coffee", tags: [] })),
];

db.Drinks.deleteMany({})
  .then(() => db.Drinks.collection.insertMany(allDrinks))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
