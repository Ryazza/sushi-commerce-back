const Product = require('../models/productModel.js');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


export async function addProduct(form) {

    const product = new Product({createdAt: new Date()});

    Object.assign(product, form);
    await product.save();
    return {
        success: true
    };

}


exports.addUser = async (form) => {

}

exports.logUser = async (form) => {

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
