const ProductService = require('../services/product.service')
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../controllers/jwt.controller');


exports.createProduct = async (req, res) => {
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
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        })
    }

}
exports.getProducts = async (req, res) => {
    try {
        console.log("controller")

        let allUser = await ProductService.allProducts();
        res.status(200);
        res.send(allUser);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        })
    }

}
exports.searchProductByName = async (req, res) => {
    try {
        let keyword = req.params.keyword;

        let products = await ProductService.searchProductByName(keyword);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        })
    }

}

exports.searchOneProduct = async (req, res) => {
    try {
        let id = req.params.id;

        let products = await ProductService.searchOneProduct(id);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        })
    }

}
