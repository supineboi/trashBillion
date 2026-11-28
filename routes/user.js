const express = require('express');
const router = express.Router()
const { loginPage, signupPage, signup, login, orderPage, orderDetails, getProfile } = require('../controllers/user');

router.get('/login', loginPage)

router.get('/signup', signupPage)

router.post("/signup", signup)

router.post("/login", login)

router.get("/orders", orderPage )

router.get("/orders/:id", orderDetails )

router.get("/profile", getProfile )

module.exports = router;