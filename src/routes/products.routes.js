const router = require('express').Router();

const {
    getProduct,
    getProducts,
    createProduct
} = require('../controllers/product.controllers');

router.get('/products/:id', getProduct)
router.get('/products', getProducts)

router.post('/product', createProduct)


module.exports = router;