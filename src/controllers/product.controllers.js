const productCtrl = {};

const Product = require('../models/Product');
const { cloud } = require('../helpers/helpers');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');


cloudinary.cloud

productCtrl.getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.json(product);
}

productCtrl.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}


productCtrl.createProduct = async (req, res) => {
    const {name, description, brand, price, category} = req.body;
    const photoList = [];
    const files = req.files;

    for(let i of files) {
        let result = await cloudinary.v2.uploader.upload(i.path, {folder: 'ecommerce'});
        const filePath = result.url;
        photoList.push(filePath);
        await fs.unlink(i.path);
    }


    const product = new Product({name, description, brand, price, category, filePathArray: photoList});
    await product.save();

    res.json(product)
}



module.exports = productCtrl;