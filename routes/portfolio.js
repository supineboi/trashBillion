const { 
    getPortfolio, 
    addToPortfolio, 
    removePortfolio, 
    getCheckout, 
    successPage,
    createOrder
} = require('../controllers/portfolio');

const router = require('express').Router();

router.get('/', getPortfolio)
router.post('/add', addToPortfolio)
router.post('/remove', removePortfolio)
router.get('/checkout', getCheckout)
router.post('/checkout', createOrder)
router.get('/success', successPage)

module.exports = router;