const router = require('express').Router();

const {
    getCartItems,
    createCartItem,
    addCartItem,
    deleteCartItem
} = require('../controllers/cartIems.controllers');

router.get('/cartItems/:id', getCartItems)

router.post('/cartItems/:id', createCartItem)
router.post('/cartItems/addProduct/:id', addCartItem)

router.delete('/cartItems/:id', deleteCartItem)

module.exports = router;