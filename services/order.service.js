const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { checkObjectId } = require('../helper/dbHelper');

exports.addOrder = async (form) => {

    try {
        let verify = verifyEntry(form);

        if(verify.success === true) {

            // calcul function totalAmount and other;
            let formValid = await calculate(form);

            const order = new Order({createdAt: new Date(), updateAt: new Date()});
            Object.assign(order, formValid);

            await order.save();
            return {
                success: true
            };

        } else {
            return {
                success: verify.success,
                message: verify.message,
            }
        }
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
        throw (e)
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

exports.getOrderByUser = async ( client_id ) => {
    let verifId = checkObjectId(client_id);
    if(verifId === false) {
        return {
            success: false,
            message: "Id invalide",
        }
    } else {
        try {
            let orders = await Order.find({ client_ID: client_id }).sort({_id: -1})
            return {
                success: true,
                order: orders
            }
        } catch (e) {
            throw e;
        }
    }
}

exports.updateOrder = async (id, change ) => {

    try {
        let order = await Order.findById(id);
        if (!order) {
            return {
                success: false,
                message: "Numero de commande incorrect",
            }
        }

        let verify = verifyEntry(change);

        if(verify.success === true) {
            // calcul function totalAmount and other;
            let changeValid = await calculate(change);
            //console.log(changeValid);

            await Order.findOneAndUpdate(
                { _id: id },
                changeValid,
                { new: true }
            )

            return {
                success: true,
                message: "Votre Commande a bien été modifié",
                order: changeValid,
            };
        } else {
            return {
                success: verify.success,
                message: verify.message,
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.deleteOrderById = async (id) => {
    try {
        await Order.deleteOne({_id: id})
        return {
            success: true
        }
    } catch (e) {
        throw e;
    }
}

//----------------------- ADMIN ---------------------------//


exports.getAllOrderByStatus = async ( status, order ) => {
    //console.log(order)
    try {
        if ((status === "préparation" || status === "envoyé") && (order === "desc" || order === 'asc')) {
            let inOrder;
            order === "desc" ? inOrder = -1 : inOrder = 1;
            let orders = await Order.find({status: status}).sort({_id: inOrder})
            return {
                success: true,
                order: orders
            }
        } else {
            return {
                success: false,
                message: "Demande incorrecte",
            }
        }
    } catch (e) {
        throw (e)
    }
}

/*----------- function for add updtate order -----------------*/

async function calculate(form) {

    let articles = [];
    let totalAmount = 0;

     for(let i=0; i < form.articles.length; i++) {
        let product = await Product.findById(form.articles[i].id);
        let amount = product.price * form.articles[i].quantity;
        articles.push({ id: form.articles[i].id, quantity: form.articles[i].quantity, amount: amount});
        totalAmount += amount;
    };

    /*----------------------- A lier au systeme fraix de port -------------------------*/
    let shipping_fee = 10;
    /*------------------------------------ End ---------------------------------------*/

    let gift_package;

    if(totalAmount === 200) {
        gift_package = true;
    } else {
        gift_package = false;
    }

    form.gift_package = gift_package;
    form.shipping_fee = shipping_fee;
    form.articles = articles;
    form.totalAmount = totalAmount + shipping_fee;
    return form;
}

/*----------- VERIFY --------------*/
function verifyEntry(order) {
    let verifId = checkObjectId(order.client_ID);

    if(verifId === false) {
        return {
            success: false,
            message: "Id invalide " + verifId.message,
        };
    }

    if(typeof order.articles === "undefined") {
        return {
            success: false,
            message: "Vous devez enregistrez un article pour une commande",
        };
    } else {
        order.articles.forEach(article => {
            let verifId = checkObjectId(article.id);
            if(verifId === false) {
                return {
                    success: false,
                    message: "Vous devez enregistrer un id pour votre article " +verifId.message,
                };
            }
            if(typeof article.quantity === "undefined") {
                return {
                    success: false,
                    message: "Vous devez renseigner une quantité à votre article " + article.id + " !",
                };
            }

            if(typeof article.quantity !== "number") {
                return {
                    success: false,
                    message: "La quantité de votre article doit être un chiffre !",
                };
            }
        })

        if(typeof order.status === "undefined") {
            return {
                success: false,
                message: "vous devez renseigner un status de commande (préparation ou envoyé)",
            };
        }

        if(typeof order.status !== "string") {
            return {
                success: false,
                message: "Le status de votre commande doit être une chaine de caractère",
            };
        }
        return { success: true };
    }
}


/*------------------------ JSON FULL DELETE AFTER -------------------------------*/
// {
//     "client_ID": "60f9287e165b5102c1e8bc50",
//     "articles": [{
//     "id": "60",
//     "quantity": "",
//     "amount": 20
// }, {
//     "id": "60f87058f8856620405eeaa2",
//     "quantity": 3,
//     "amount": 40
// }],
//     "sendTo": {
//     "firstname": "toto",
//         "lastname": "lebreton",
//         "address": "20 rue du sable",
//         "additionnal_adress": "",
//         "postalCode": 35000,
//         "city": "Rennes",
//         "country": "France",
//         "phone": "06-28-52-65-87"
// },
//     "gift_package": "true",
//     "shipping_fee": 10,
//     "totalAmount": 150,
//     "status": "préparation"
// }
