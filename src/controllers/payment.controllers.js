const paymentCtrl = {};

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

const { getAmount, removeCartItems } = require('../helpers/helpers')

const Payment = require('../models/Payment');


paymentCtrl.createPayment = async (req, res) => {
    const { userId, cartItems, products, amount, stripeToken } = req.body.payment;

    amountToEur = Math.round(amount * 100);
    const chargeObject = await stripe.charges.create({
      amount: amountToEur,
      currency: 'eur',
      source: stripeToken,
      capture: false
    });

    try {
      await stripe.charges.capture(chargeObject.id)
      const payment = new Payment({userId, products, paymentId: chargeObject.id , amount, receiptUrl: chargeObject.receipt_url, isUser: true})
      await payment.save();
      await removeCartItems(cartItems);
      res.json(chargeObject)
    } catch {
      await stripe.refounds.create({charge: chargeObject.id});
      res.json(chargeObject)
    }
};


paymentCtrl.createPaymentNoUser = async (req, res) => {
  const { email, _id } = req.body.payment.noUser;
  const { id } = req.body.payment.token;
  const products = req.body.payment.products
  // get amount from product.price instead of localstorage, and get products ids
  const productsFromServer = await getAmount(products);
  const productsId = productsFromServer.products;
  const amountFromServer = productsFromServer.amount
  const amountToEur = Math.round(amountFromServer * 100) 
  const chargeObject = await stripe.charges.create({
    amount: amountToEur,
    currency: 'eur',
    source: id,
    capture: false
  });

    try {
    await stripe.charges.capture(chargeObject.id);
    const payment = new Payment({userId: _id, paymentId: chargeObject.id, products: productsId, amount: amountFromServer, receiptUrl: chargeObject.receipt_url, isUser: false, email: email});
    await payment.save()
    res.json(chargeObject)
  } catch {
    await stripe.refounds.create({charge: chargeObject.id});
    res.json(chargeObject)
  }

}


module.exports = paymentCtrl;
