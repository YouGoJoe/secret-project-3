const JWT = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = require("express").Router();
const db = require("../models");

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  return next();
};

router.post(
  "/drink/:id/review",
  [
    check("id", "malformed ID").isLength({ max: 24, min: 24 }),
    check("rating", "missing rating").exists(),
    check("comment", "missing rating").exists(),
  ],
  handleErrors,
  async (req, res) => {
    const { id } = JWT.decode(req.headers["x-auth-token"]);

    const review = await db.Reviews.create({
      rating: req.body.rating,
      comment: req.body.comment,
      drink: req.params.id,
    });

    await db.User.findByIdAndUpdate(id, {
      $push: { reviews: review.id },
    });

    res.json(review);
  }
);

module.exports = router;
