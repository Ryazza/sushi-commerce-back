const OrderService = require('../services/order.service')

exports.addOrder = async (req, res) => {
    try {
        let newOrder = await OrderService.addOrder(req.body)

        if (newOrder.success === true) {
            res.status(201)
            res.send(newOrder)
        } else {
            console.log("rentré else");
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
    console.log(req.params)
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

exports.updateOrder = async (req, res) => {
    try {
        let orderServiceRes = await OrderService.updateOrder(req.params.id , req.body);

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
