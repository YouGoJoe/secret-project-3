const router = require("express").Router();
const db = require("../models");

const allowList = ["coffee", "tea", "beer", "wine"];

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  if (id.length !== 12) {
    res.status(400).send("malformed ID");
  }
  const drink = await db.Drinks.findById(id);
  res.json(drink);
});

router.get("/:type", async (req, res) => {
  const { type } = req.params;
  if (!allowList.includes(type)) {
    return res.json([]);
  }

  const drinks = await db.Drinks.find({ type });
  res.json(drinks);
});

router.get("/", async (req, res) => {
  const drinks = await db.Drinks.find();
  res.json(drinks);
});

module.exports = router;
