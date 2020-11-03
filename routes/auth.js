const { check, validationResult } = require("express-validator");
const keys = require("../config/keys");
const User = require("../models/User");
const router = require("express").Router();
const bycrpt = require("bcrypt");
const JWT = require("jsonwebtoken");

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
      console.log(errors);
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

    await User.create({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign({ email }, keys.JWTSecret, {
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

    const token = await JWT.sign({ email }, keys.JWTSecret, {
      expiresIn: 360000,
    });

    res.json({
      token,
    });
  }
);

module.exports = router;
