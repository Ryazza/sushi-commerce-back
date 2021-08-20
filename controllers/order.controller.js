const OrderService = require('../services/order.service')

exports.addOrder = async (req, res) => {
    try {
        let newOrder = await OrderService.addOrder(req.body, req.user)
        if (newOrder.success === true) {
            res.status(201)
            res.send(newOrder)
        } else {
            res.status(400)
            res.send(newOrder)
        }

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.calculateOrder = async (req, res) => {
    try {
        let newOrder = await OrderService.calculateOrder(req.body)
        if (newOrder.success === true) {
            res.status(201)
            res.send(newOrder)
        } else {
            res.status(400)
            res.send(newOrder)
        }
    } catch (e) {
        console.log("calculOrder catch", e);
        res.status(400)
        res.send({
            success: false,
            errors: e
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
            errors: e
        })
    }
}



exports.getOneOrder = async (req, res) => {
    try {
        let oneOrder = await OrderService.getOneOrder(req.params);
        if(oneOrder.success) {
            res.status(200);
            res.send(oneOrder);
        } else {
            res.status(400);
            res.send({
                success: false,
                errors: 'id invalide!'
            });
        }

    } catch (e) {

        console.log("getOneOrder catch", e);
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}


exports.getOrderByIdAdmin = async (req, res) => {
    try {
        let oneOrder = await OrderService.getOrderByIdAdmin(req.params.id);
        if(oneOrder.success) {
            res.status(200);
            res.send(oneOrder);
        } else {
            res.status(400);
            res.send({
                success: false,
                errors: 'id invalide!'
            });
        }

    } catch (e) {

        console.log("getOneOrder catch", e);
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}


exports.getOrderByUser = async (req, res) => {
    try {

        let oneOrder = await OrderService.getOrderByUser(req.user.id);
        console.log(oneOrder)
        if(oneOrder.success === true) {
            res.status(200);
            res.send(oneOrder);
        } else {
            res.status(400);
            res.send({
                success:false,
                errors: "Id Invalide ou pas de commande"
            });
        }
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
        let orderServiceRes = await OrderService.updateOrder(req.params.id , req.body, req.user);

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
            errors: e
        });
    }
}

exports.deleteOrder = async ( req, res ) => {
    try {

        let order = await OrderService.deleteOrderById(req.params.id);
        if (order.success) {
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

    try {
        if(req.user.admin === true) {
            let allOrder = await OrderService.getAllOrderByStatus(req.params.status, req.params.order);
            res.status(200);
            res.send(allOrder);
        } else {
            res.status(403);
            res.send({
                success: false,
                errors: "Vous n'avez pas les droits nécessaires !"
            });
        }

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.updateStatus = async (req, res) => {
    try {
        let updateStatus = await OrderService.updateStatus(req.params.id, "payée");
        if (updateStatus.success === true) {
            res.status(200);
            res.send(updateStatus);
        } else {
            res.status(403);
            res.send({
                success: false,
                errors: "Un problème est survenu, merci de réessayer plus tard."
            });
        }

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}