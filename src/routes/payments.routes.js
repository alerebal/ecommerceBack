const router = require('express').Router();

const {
    createPayment,
    createPaymentNoUser
} = require('../controllers/payment.controllers')

router.post('/payment', createPayment)
router.post('/paymentNoUser', createPaymentNoUser)

module.exports = router;