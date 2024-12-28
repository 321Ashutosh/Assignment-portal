const express = require("express");
const { signup, login } = require("../controller/login");

const router = express.Router();

// Routes for user authentication
router.post("/register", signup); // Signup endpoint
router.post("/login", login);     // Login endpoint

module.exports = router;



// // controller/login.js
// exports.signup = (req, res) => {
//   // Your logic for user signup
//   res.status(201).send({ message: "User registered successfully!" });
// };

// exports.login = (req, res) => {
//   // Your logic for user login
//   res.status(200).send({ message: "User logged in successfully!" });
// };
