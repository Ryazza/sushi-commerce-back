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
    } catch {
        return {
            success: false,
            error: "La requete n'a pas aboutie"
        }
    }

}

exports.getAllOrder = async () => {
    let orders = await Order.find({})
    return {
        success: true,
        order: orders
    }
}

exports.getOneOrder = async ({ id }) => {
    let orders = await Order.findById(id)
    return {
        success: true,
        order: orders
    }
}
