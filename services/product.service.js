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

exports.searchProductByName = async (keyword) => {
    try {
        let products = await Product.find({name: {$regex: keyword, $options: "i"}})
        console.log("keyword", keyword)

        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}

exports.unsetUser = async (id) => {

}

exports.allUser = async () => {

}

exports.updateLogin = async (id, change) => {

}

exports.updateMail = async (id, change) => {

}
exports.updateUserPass = async (id, change) => {

}

exports.getMe = async (id) => {

}

exports.deleteUserById = async (id) => {

}

exports.updateRole = async (id, role) => {

}
