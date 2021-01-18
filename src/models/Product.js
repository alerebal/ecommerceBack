const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    brand: String,
    price: Number,
    category: String,
    filePathArray: [String],
}, {    
    timestamps: true
}
);

module.exports = model('Product', productSchema);

