const { check, validationResult } = require("express-validator");
const router = require("express").Router();
const db = require("../models");

const allowList = ["coffee", "tea", "beer", "wine"];

router.get(
  "/id/:id",
  [check("id", "malformed ID").isLength({ max: 24, min: 24 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const drink = await db.Drinks.findById(req.params.id);
    res.json(drink);
  }
);

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
