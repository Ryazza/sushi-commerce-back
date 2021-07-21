const ProductService = require('../services/product.service')
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../controllers/jwt.controller');


exports.createProduct = async (req, res) => {
    try {

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        })
    }

}

exports.addUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}
exports.connectUser = async (req, res) => {
    try {
        let newProduct = await ProductService.addProduct(req.body)
        if (newProduct.success === true) {
            res.status(201)
            res.send(newProduct)
        } else {
            res.status(400)
            res.send(newProduct)
        }

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}
exports.deleteUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}
exports.allUser = async (req, res) => {
    try {

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.updateLogin = async (req, res) => {
    try {

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}
exports.updateMail = async (req, res) => {
    try {

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}
exports.updateUserPass = async (req, res) => {
    try {

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}
exports.getMe = async (req, res) => {
    try {

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}

