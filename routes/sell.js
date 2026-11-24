const router = require('express').Router();
const { getList, sellPage, createSell } = require('../controllers/sell');

router.get('/list', getList);

router.get('/', sellPage);

router.post('/', createSell);

module.exports = router;