const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const { checkObjectId } = require('../helper/dbHelper');
const jwt = require('jsonwebtoken');
const dayjs = require("dayjs");
let isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

exports.addOrder = async (form, token) => {

    try {
        let verify = await verifyEntry(form, token);

        if(verify.success === true) {

            // calcul function totalAmount and other;
            let formValid = await calculate(form, token, "save");

            const decoded = jwt.decode(token, {complete: false});
            formValid.form.client_ID = decoded.id;

            const order = new Order({createdAt: new Date(), updateAt: new Date()});
            Object.assign(order, formValid.form);
            let canSave = true;
            let insufficientStock = '';

            formValid.changeStock.forEach( product => {
                if(product.canChangeStock === false) {
                    insufficientStock += product.id + ' ';
                    canSave = false;
                }
            });

            if(canSave) {
                await order.save();

                for(let i=0; i < formValid.changeStock.length; i++) {
                    let product = await Product.findOne({_id: formValid.changeStock[i].id});
                    product.stock.quantity = formValid.changeStock[i].stock.quantity;
                    product.stock.available = formValid.changeStock[i].stock.available;

                    await Product.updateOne({_id: formValid.changeStock[i].id}, product);
                }

                return {
                    success: true
                };

            } else {
                return {
                    success: false,
                    message: "Les produits suivants n'ont pas le stock suffisant " + insufficientStock + "!"
                };
            }

        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.error
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.calculateOrder = async (form, token) => {

    try {
        let verify = await verifyEntry(form , token);

        if(verify.success === true) {

            // calcul function totalAmount and other;
            let formValid = await calculate(form, token, "noSave");

            return {
                success: true,
                response: formValid,
            };
        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.error
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

exports.updateOrder = async (id, change, token ) => {

    try {
        let order = await Order.findById(id);

        if (!order) {
            return {
                success: false,
                message: "Numero de commande incorrect",
            }
        }

        let verify = await verifyEntry(change, token);

        if(verify.success === true) {
            // calcul function totalAmount and other;

            let changeValid = await calculate(change, token, "saveUpdate");

            changeValid.client_ID = order.client_ID;

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
                errors: verify.errors,
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

async function calculate(form, token, save) {

    let articles = [];
    let changeStock = [];
    let available;
    let canChangeStock;
    let totalAmount = 0;

     for(let i=0; i < form.articles.length; i++) {
         let product = await Product.findById(form.articles[i].id);
         let oldQuantity = product.stock.quantity;
         let newQuantity = oldQuantity - form.articles[i].quantity;

         if(newQuantity < 0) {
             canChangeStock = false;
             available = false;
         } else if (newQuantity === 0) {
             canChangeStock = true;
             available = false;
         } else {
             canChangeStock = true;
             available = true;
         }
         changeStock.push({ id: form.articles[i].id, stock: { quantity: newQuantity, available: available}, canChangeStock: canChangeStock })

         let amount = product.price * form.articles[i].quantity;
         articles.push({ id: form.articles[i].id, quantity: form.articles[i].quantity, amount: amount});
         totalAmount += amount;
    };

    /*----------------------- A lier au systeme fraix de port -------------------------*/
    let shipping_fee = 10;
    /*------------------------------------ End ---------------------------------------*/

    let gift_package;

    if(totalAmount > 200) {
        gift_package = true;
    } else {
        gift_package = false;
    }

    let today = new Date();

    if(today.getMonth() === 11 && today.getDate() > 5) {
        gift_package = true;
    } else if (dayjs(dayjs().year()+ "-" + dayjs().get('month')+ "-" +dayjs().get('date')).isBetween(dayjs().year() +'6-15', dayjs().year() +'7-15')) {
        gift_package = true;
    }

    form.gift_package = gift_package;
    form.shipping_fee = shipping_fee;
    form.articles = articles;
    form.totalAmount = totalAmount + shipping_fee;
    return {form: form, changeStock: changeStock};
}

/*----------- VERIFY --------------*/
async function verifyEntry(order, token) {

    const decoded = jwt.decode(token, {complete: false});

    let verifId = checkObjectId(decoded.id);
    let idExist;

    order.client_ID = decoded.id;

    if(verifId.success === true) {
        idExist = await User.findById(decoded.id);
    } else {
        return {
            success: false,
            message: "Id invalide" + verifId.message,
            errors: "client_ID"
        };
    }

    if (!idExist) {
        return {
            success: false,
            message: "Id invalide Client" + order.client_ID,
            errors: "client_ID"
        };
    }

    if(typeof order.articles === "undefined") {
        return {
            success: false,
            message: "Vous devez enregistrez un article pour une commande",
            errors: "articles"
        };
    } else {

        for(let i=0; i < order.articles.length; i++) {
            let verifId = checkObjectId(order.articles[i].id);
            let verifProduct;
            let actualNbr = i+1;
            if(verifId.success === true) {
                verifProduct = await Product.findById(order.articles[i].id);
            } else {
                return {
                    success: false,
                    message: "Vous devez enregistrer un id correct pour votre article " +actualNbr+ ": " + verifId.message,
                    errors: "article.id"
                };
            }

            if(!verifProduct) {
                return {
                    success: false,
                    message: "Votre article " +actualNbr+ " n'est pas reconnu " + order.articles[i].id,
                    errors: "article.id"
                };
            }

            if(typeof order.articles[i].quantity === "undefined") {
                return {
                    success: false,
                    message: "Vous devez renseigner une quantité à votre article " + order.articles[i].id + " !",
                    errors: "article.quantity"
                };
            }

            if(typeof order.articles[i].quantity !== "number") {
                return {
                    success: false,
                    message: "La quantité de votre article doit être un chiffre !",
                    errors: "article.quantity"
                };
            }
        }

        if(typeof order.status === "undefined" || order.status.length < 1) {
            return {
                success: false,
                message: "vous devez renseigner un status de commande (préparation ou envoyé)",
                errors: "status"
            };
        }

        if(typeof order.status !== "string") {
            return {
                success: false,
                message: "Le status de votre commande doit être une chaine de caractère",
                errors: "status"
            };
        }

        if(order.status !== "préparation" && order.status !== "envoyé") {
            return {
                success: false,
                message: "Le status doit être préparation ou envoyé",
                errors: "status"
            };
        }

        return { success: true };
    }
}
