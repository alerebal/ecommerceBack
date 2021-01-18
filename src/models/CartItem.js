const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
    userId: String,
    productId: String,
    name: String,
    price: Number
}, {
    timestamps: true
});

module.exports = model('CartItem', cartItemSchema)