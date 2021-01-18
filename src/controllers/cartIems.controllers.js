const itemCtrl = {};

const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

itemCtrl.getCartItems = async (req, res) => {
    const { id } = req.params;
    const items = await CartItem.find({userId: id});
    res.json(items);
}

itemCtrl.createCartItem = async (req, res) => {
    const { _id, name, price } = req.body;
    const { id } = req.params;
    const newItem = new CartItem({userId: id, productId: _id, name: name, price});
    await newItem.save();
    res.json(newItem); 
}

itemCtrl.addCartItem = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const product = await Product.findById(id);
    const newItem = new CartItem({userId: userId, productId: id, name: product.name, price: product.price})
    await newItem.save();
    res.json(newItem)
}

itemCtrl.deleteCartItem = async (req, res) => {
    const { id } = req.params;
    const itemToDelete = await CartItem.findByIdAndRemove(id);
    res.json({message: `The item ${itemToDelete} has been deleted`})
}

module.exports = itemCtrl;