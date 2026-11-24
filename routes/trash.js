const router = require('express').Router();
const { getList, trashPage, createTrash, getTrash } = require('../controllers/trash');

router.get('/', getList);

router.get('/sell', trashPage);

router.post('/sell', createTrash);

router.get('/:id', getTrash)

module.exports = router;