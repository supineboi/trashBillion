const { cartPage } = require('../controllers/cart');

const router = require('express').Router();

router.get('/', cartPage)

module.exports = router;