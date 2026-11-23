const express = require('express');
const router = express.Router()
const path = require('path')

router.get('/login', (req,res) => {
    res.render('login', {
        path: "/user/login"
    })
})

router.get('/signup', (req, res) => {
    res.render('signup', {
        path: "/user/signup"
    })
})

module.exports = router;