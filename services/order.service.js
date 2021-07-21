const Order = require('../models/orderModel');

exports.addOrder = async (form) => {

    try {
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


}
