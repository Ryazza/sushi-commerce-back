const Product = require('../models/productModel.js');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.addProduct = async (form) => {
    try {
        const product = new Product({createdAt: new Date()});

        Object.assign(product, form);
        await product.save();
        return {
            success: true
        };
    } catch (e) {
        throw e;
    }
}


exports.allProducts = async () => {
    try {
        let products = await Product.find({})
        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}
exports.mostViewedProducts = async () => {
    try {
        let products = await Product.find({}).sort({views : -1})
        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}

exports.searchProductByName = async (keyword) => {
    try {
        let products = await Product.find({name: {$regex: keyword, $options: "i"}})

        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}

exports.searchOneProduct = async (id) => {
    try {
        let product = await Product.findOneAndUpdate({_id: id}, {
            $inc: {
                views: +1
            }
        });

        return {
            success: true,
            products: product
        }
    } catch (e) {
        throw e;
    }
}

