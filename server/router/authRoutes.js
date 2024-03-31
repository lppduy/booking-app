const express = require("express");

const router = express.Router();
const authentication = require("../controller/authController");

// router signup
router.post("/signup", authentication.postSignup);

//router
router.post("/login", authentication.postLogin);

// router.post('/signup', )
module.exports = router;
