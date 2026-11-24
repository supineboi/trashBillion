const express = require('express');
const router = express.Router()
const { loginPage, signupPage, signup, login } = require('../controllers/user');

router.get('/login', loginPage)

router.get('/signup', signupPage)

router.post("/signup", signup)

router.post("/login", login)

module.exports = router;