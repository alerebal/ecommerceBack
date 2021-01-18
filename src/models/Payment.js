const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
    userId: String,
    paymentId: String,
    products: [Schema.Types.ObjectId],
    amount: Number,
    currency: {type: String, default: 'eur'},
    receiptUrl: String,
    isUser: Boolean,
    email: String
}, {
    timestamps: true
})

module.exports = model('Payment', paymentSchema);