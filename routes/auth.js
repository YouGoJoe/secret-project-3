const { check, validationResult } = require("express-validator");
const keys = require("../config/keys");
const User = require("../models/User");
const router = require("express").Router();
const bycrpt = require("bcrypt");
const JWT = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");

router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Please input a password").isLength({ min: 8 }),
    check("confirmPassword", "Please input a password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, confirmPassword } = req.body;

    // Checking is password === confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({
        errors: [
          {
            msg: "Passwords do not match",
          },
        ],
      });
    }

    // Check if email already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Email is already in use",
          },
        ],
      });
    }

    const hashedPassword = await bycrpt.hash(password, 10);

    const userToAdd = await User.create({
      email,
      password: hashedPassword,
    });

    const id = userToAdd._id;

    const token = await JWT.sign({ id }, keys.JWTSecret, {
      expiresIn: 360000,
    });

    res.json({
      token,
    });
  }
);

router.post(
  "/login",
  [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Please input a password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }

    const isMatch = await bycrpt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }

    const id = user._id;

    const token = await JWT.sign({ id }, keys.JWTSecret, {
      expiresIn: 360000,
    });

    res.json({
      token,
    });
  }
);

router.get("/", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user }).populate("reviews");
    res.json(user);
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: "Bogus JWT",
        },
      ],
    });
  }
});

module.exports = router;
