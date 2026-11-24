const { getHomePage } = require('../controllers');

const router = require('express').Router();

router.get('/', getHomePage);

module.exports = router;