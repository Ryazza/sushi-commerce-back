const Order = require('../models/orderModel');

exports.addOrder = async (form) => {

    try {

        //console.log(typeof form.client_ID);
        if (form.articles.length < 1) {
            return {
                success: false,
                error: "Pas d'article enregistré dans la commande!"
            }
        }

        const order = new Order({createdAt: new Date(), updateAt: new Date()});
        Object.assign(order, form);

        await order.save();
        return {
            success: true
        };
    } catch (e) {
        throw e;
    }

}

exports.getAllOrder = async () => {

    try {
        let orders = await Order.find({})
        return {
            success: true,
            order: orders
        }
    } catch (e) {
        trow (e)
    }

}

exports.getOneOrder = async ({ id }) => {

    try {
        let orders = await Order.findById(id)
        return {
            success: true,
            order: orders
        }
    } catch (e) {
        throw e;
    }

}

exports.updateOrder = async (id, change ) => {

    try {
        order = await Order.findById(id);
        if (!order) {
            return {
                success: false,
                message: "Numero de commande incorrect",
            }
        }
        console.log(change)
        await Order.findOneAndUpdate(
            { _id: id },
            change,
            { new: true }
        )

        return {
            success: true,
            message: "Votre Commande a bien été modifié",
            order: change,
        };
    } catch (e) {
        throw e;
    }
}
