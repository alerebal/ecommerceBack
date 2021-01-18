const helpers = {}

const cloudinary = require('cloudinary');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');


helpers.cloud = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


// get amount from product.price instead of localstorage
helpers.getAmount = async function (arr) {
    const products = arr.map(item => item._id);
    let amount = 0;
    for(let i in products) {
      let product = await Product.findById(products[i]);
      amount+= product.price
    }
    const objToSend = { amount, products }
    return objToSend
}

// removing cartItems after generate a user payment
helpers.removeCartItems = async (arr) => {
  arr.map(async item => {
    await CartItem.findByIdAndRemove(item);
  })
}

module.exports = helpers