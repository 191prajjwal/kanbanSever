const express = require("express");
const { registerUser, loginUser,getAllUsers, getUserEmail } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users",getAllUsers)
router.get("/user/:userId",getUserEmail)

module.exports = router;
