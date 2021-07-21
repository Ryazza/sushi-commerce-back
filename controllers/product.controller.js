const ProductService = require('../services/product.service')
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../controllers/jwt.controller');

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

