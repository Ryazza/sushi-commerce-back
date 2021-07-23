const OrderService = require('../services/order.service')
const Order = require("../models/orderModel");
const checkTokenMiddleware = require('../controllers/jwt.controller');

exports.addOrder = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);

        let newOrder = await OrderService.addOrder(req.body, token)

        if (newOrder.success === true) {
            res.status(201)
            res.send(newOrder)
        } else {
            res.status(400)
            res.send(newOrder)
        }

    } catch (e) {
        console.log("rentré catch"+ e);
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.getAllOrder = async (req, res) => {

    try {
        let allOrder = await OrderService.getAllOrder();
        res.status(200);
        res.send(allOrder);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.getOneOrder = async (req, res) => {
    try {
        let oneOrder = await OrderService.getOneOrder(req.params);
        res.status(200);
        res.send(oneOrder);
    } catch (e) {

        console.log("catch" + e);
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.getOrderByUser = async (req, res) => {
    try {
        let oneOrder = await OrderService.getOrderByUser(req.params.id);
        res.status(200);
        res.send(oneOrder);
    } catch (e) {

        console.log("catch" + e);
        res.status(400)
        res.send({
            success: false,
            errors: "Id Invalide"
        })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        let orderServiceRes = await OrderService.updateOrder(req.params.id , req.body, token);

        if (orderServiceRes.success) {
            res.status(200);
            res.send(orderServiceRes);
        } else {
            res.status(400);
            res.send(orderServiceRes);
        }
    } catch (e) {
        console.log("catch " + e)
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}

exports.deleteOrder = async ( req, res ) => {
    try {
        let order = await Order.findByIdAndDelete(req.params.id);
        if (order) {
            res.status(200);
            res.send({
                success: true,
                errors: "Commande supprimé avec succes!"
            })

        } else {
            res.status(400)
            res.send({
                success: false,
                errors: "Commande non valide!"
            })
        }
    } catch (e) {
        throw e;
    }
}

/*-------------------------- ADMIN -------------------------*/

exports.getAllOrderByStatus = async (req, res) => {
    console.log(req.params)

    try {
        let allOrder = await OrderService.getAllOrderByStatus(req.params.status, req.params.order);
        res.status(200);
        res.send(allOrder);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}
